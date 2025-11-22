import { useState } from 'react';
import { useTranslations, useLanguage } from '@/lib/i18n';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, AlertTriangle, CheckCircle, Info, Mail, MailOpen, X } from 'lucide-react';
import { format } from 'date-fns';
import { getDateLocale } from '@/lib/date-locale';

interface AdminMessage {
  id: string;
  type?: string;
  subject: string;
  content: string;
  severity: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  metadata?: Record<string, any>;
  deliveredAt: string;
  readAt: string | null;
}

function MessagesSkeletonLoader() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <Skeleton className="h-6 w-16" />
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

function replaceMessagePlaceholders(text: string, metadata?: Record<string, any>): string {
  if (!metadata) return text;
  
  let result = text;
  Object.entries(metadata).forEach(([key, value]) => {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
  });
  return result;
}

function getTranslatedMessage(message: AdminMessage, t: any): { subject: string; content: string } {
  if (message.type && t.notifications[message.type as keyof typeof t.notifications]) {
    const notification = t.notifications[message.type as keyof typeof t.notifications];
    if (notification && typeof notification === 'object' && 'title' in notification && 'message' in notification) {
      return {
        subject: replaceMessagePlaceholders(notification.title, message.metadata),
        content: replaceMessagePlaceholders(notification.message, message.metadata),
      };
    }
  }
  
  return {
    subject: message.subject,
    content: message.content,
  };
}

export default function Messages() {
  const t = useTranslations();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'unread' | 'all'>('unread');

  const { data: messagesResponse, isLoading } = useQuery<AdminMessage[]>({
    queryKey: ['/api/messages'],
  });

  const messages = Array.isArray(messagesResponse) ? messagesResponse : [];

  const markAsReadMutation = useMutation({
    mutationFn: async (messageId: string) => {
      return await apiRequest('POST', `/api/messages/${messageId}/read`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/messages'] });
    },
  });

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'error':
        return 'bg-destructive/10 border-destructive/30 text-destructive';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100';
      case 'success':
        return 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100';
      default:
        return 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100';
    }
  };

  const getSeverityBadgeText = (severity: string) => {
    return t.userMessages.severity[severity as keyof typeof t.userMessages.severity] || severity;
  };

  const handleToggleExpand = (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (!message) return;

    if (expandedId === messageId) {
      setExpandedId(null);
    } else {
      setExpandedId(messageId);
      if (!message.isRead) {
        markAsReadMutation.mutate(messageId);
      }
    }
  };

  const { language } = useLanguage();
  
  const formatDate = (dateString: string) => {
    const locale = getDateLocale(language);
    return format(new Date(dateString), 'PPp', { locale });
  };

  const unreadMessages = messages.filter(m => !m.isRead);
  const displayMessages = activeTab === 'unread' ? unreadMessages : messages;

  if (isLoading) {
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <MessagesSkeletonLoader />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-foreground" data-testid="text-page-title">
            {t.userMessages.title}
          </h1>
          {unreadMessages.length > 0 && (
            <Badge variant="default" data-testid="badge-unread-count">
              {unreadMessages.length} {unreadMessages.length === 1 ? t.userMessages.newSingular : t.userMessages.newPlural}
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground" data-testid="text-page-description">
          {t.userMessages.description}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'unread' | 'all')} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="unread" data-testid="tab-unread">
            <MailOpen className="w-4 h-4 mr-2" />
            {t.userMessages.tabUnread}
            {unreadMessages.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadMessages.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="all" data-testid="tab-all">
            <Mail className="w-4 h-4 mr-2" />
            {t.userMessages.tabAll}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="unread" className="space-y-4" data-testid="content-unread">
          {unreadMessages.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <Mail className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-1" data-testid="text-no-unread-messages">
                  {t.userMessages.noMessages}
                </h3>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  {t.userMessages.noMessagesDescription}
                </p>
              </CardContent>
            </Card>
          ) : (
            unreadMessages.map((message) => {
              const translated = getTranslatedMessage(message, t);
              return (
                <Card
                  key={message.id}
                  className={`cursor-pointer transition-all duration-200 hover-elevate ${
                    getSeverityStyles(message.severity)
                  }`}
                  onClick={() => handleToggleExpand(message.id)}
                  data-testid={`message-card-${message.id}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">
                          {getSeverityIcon(message.severity)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <CardTitle className="text-base font-semibold" data-testid={`message-subject-${message.id}`}>
                            {translated.subject}
                          </CardTitle>
                          <CardDescription className="text-xs" data-testid={`message-date-${message.id}`}>
                            {t.userMessages.receivedAt} {formatDate(message.deliveredAt)}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary" className="shrink-0">
                        {getSeverityBadgeText(message.severity)}
                      </Badge>
                    </div>
                  </CardHeader>
                  {expandedId === message.id && (
                    <CardContent className="pt-0">
                      <div className="bg-background/50 rounded-lg p-4 text-sm whitespace-pre-wrap" data-testid={`message-content-${message.id}`}>
                        {translated.content}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4" data-testid="content-all">
          {messages.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <Mail className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-1" data-testid="text-no-messages">
                  {t.userMessages.noMessages}
                </h3>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  {t.userMessages.noMessagesDescription}
                </p>
              </CardContent>
            </Card>
          ) : (
            messages.map((message) => {
              const translated = getTranslatedMessage(message, t);
              return (
                <Card
                  key={message.id}
                  className={`cursor-pointer transition-all duration-200 hover-elevate ${
                    !message.isRead ? getSeverityStyles(message.severity) : 'opacity-70'
                  }`}
                  onClick={() => handleToggleExpand(message.id)}
                  data-testid={`message-card-${message.id}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1">
                          {getSeverityIcon(message.severity)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-base font-semibold" data-testid={`message-subject-${message.id}`}>
                              {translated.subject}
                            </CardTitle>
                            {!message.isRead && (
                              <Badge variant="default" className="text-xs capitalize">
                                {t.userMessages.newSingular}
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-xs" data-testid={`message-date-${message.id}`}>
                            {t.userMessages.receivedAt} {formatDate(message.deliveredAt)}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="secondary" className="shrink-0">
                        {getSeverityBadgeText(message.severity)}
                      </Badge>
                    </div>
                  </CardHeader>
                  {expandedId === message.id && (
                    <CardContent className="pt-0">
                      <div className="bg-background/50 rounded-lg p-4 text-sm whitespace-pre-wrap" data-testid={`message-content-${message.id}`}>
                        {translated.content}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
