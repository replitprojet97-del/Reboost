import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, X, AlertCircle, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useState } from "react";
import { format } from "date-fns";
import { useLanguage } from "@/lib/i18n";
import { getDateLocale } from "@/lib/date-locale";

interface AdminMessage {
  id: string;
  subject: string;
  content: string;
  severity: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  deliveredAt: string;
  readAt: string | null;
}

export default function AdminMessagesBox() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { language } = useLanguage();

  const { data: messagesResponse, isLoading } = useQuery({
    queryKey: ["/api/messages"],
  });
  
  const messages = Array.isArray(messagesResponse) ? messagesResponse : [];

  const markAsReadMutation = useMutation({
    mutationFn: async (messageId: string) => {
      return await apiRequest("POST", `/api/messages/${messageId}/read`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
    },
  });

  if (isLoading || !messages || messages.length === 0) {
    return null;
  }

  const unreadMessages = messages.filter(m => !m.isRead);

  if (unreadMessages.length === 0) {
    return null;
  }

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

  const handleToggleExpand = (messageId: string) => {
    if (expandedId === messageId) {
      setExpandedId(null);
    } else {
      setExpandedId(messageId);
      markAsReadMutation.mutate(messageId);
    }
  };

  return (
    <div className="space-y-3" data-testid="admin-messages-box">
      {unreadMessages.map((message) => (
        <Card 
          key={message.id}
          className={`${getSeverityStyles(message.severity)} border-2 transition-all`}
          data-testid={`message-${message.id}`}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`flex-shrink-0 ${
                  message.severity === 'error' ? 'text-destructive' :
                  message.severity === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                  message.severity === 'success' ? 'text-green-600 dark:text-green-400' :
                  'text-blue-600 dark:text-blue-400'
                }`}>
                  {getSeverityIcon(message.severity)}
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base font-semibold truncate" data-testid={`message-subject-${message.id}`}>
                    {message.subject}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(new Date(message.deliveredAt), "PPp", { locale: getDateLocale(language) })}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleToggleExpand(message.id)}
                data-testid={`button-toggle-message-${message.id}`}
                className="flex-shrink-0"
              >
                {expandedId === message.id ? <X className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
              </Button>
            </div>
          </CardHeader>
          {expandedId === message.id && (
            <CardContent className="pt-0">
              <div className="bg-background/50 rounded-lg p-4 text-sm whitespace-pre-wrap" data-testid={`message-content-${message.id}`}>
                {message.content}
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
