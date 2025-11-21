import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChatBox } from "@/components/ChatBox";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Users } from "lucide-react";
import { useUser } from "@/hooks/use-user";

interface Conversation {
  userId: string;
  fullName: string;
  unreadCount: number;
  lastMessage: {
    content: string;
    createdAt: string;
  } | null;
}

export default function Messages() {
  const { user } = useUser();
  const [selectedPartner, setSelectedPartner] = useState<{id: string; name: string} | null>(null);

  const { data: conversations = [] } = useQuery<Conversation[]>({
    queryKey: ["/api/chat/conversations"],
  });

  const isAdmin = user?.role === "admin";

  const activeConversation = conversations.find(c => c.userId === selectedPartner?.id);

  return (
    <div className="h-full flex flex-col">
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Messages</h1>
          <Badge variant="secondary" data-testid="badge-conversation-count">
            {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
          </Badge>
        </div>
        <p className="text-muted-foreground">
          {isAdmin ? "Gérez les conversations avec vos utilisateurs" : "Communiquez avec l'équipe Altus"}
        </p>
      </div>

      <Separator />

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 overflow-hidden">
        <div className="md:col-span-1 border-r overflow-y-auto">
          <div className="p-4">
            <h2 className="font-semibold text-sm text-muted-foreground mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Conversations
            </h2>

            <div className="space-y-2">
              {conversations.length === 0 ? (
                <Card>
                  <CardHeader>
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <MessageCircle className="w-12 h-12 text-muted-foreground mb-3" />
                      <CardTitle className="text-lg">Aucune conversation</CardTitle>
                      <CardDescription>
                        {isAdmin 
                          ? "Les conversations avec les utilisateurs apparaîtront ici"
                          : "Commencez une conversation avec l'équipe"}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              ) : (
                conversations.map((conv) => (
                  <button
                    key={conv.userId}
                    onClick={() => setSelectedPartner({ id: conv.userId, name: conv.fullName })}
                    className={`w-full text-left p-3 rounded-md hover-elevate active-elevate-2 transition-colors ${
                      selectedPartner?.id === conv.userId
                        ? "bg-accent"
                        : "bg-card"
                    }`}
                    data-testid={`button-conversation-${conv.userId}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate" data-testid={`text-partner-${conv.userId}`}>
                          {conv.fullName}
                        </p>
                        {conv.lastMessage && (
                          <p className="text-sm text-muted-foreground truncate">
                            {conv.lastMessage.content}
                          </p>
                        )}
                      </div>
                      {conv.unreadCount > 0 && (
                        <Badge variant="destructive" className="shrink-0" data-testid={`badge-unread-${conv.userId}`}>
                          {conv.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col">
          {selectedPartner ? (
            <ChatBox
              userId={user!.id}
              partnerId={selectedPartner.id}
              partnerName={selectedPartner.name}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground">
                  Sélectionnez une conversation
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Choisissez un contact pour commencer à discuter
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
