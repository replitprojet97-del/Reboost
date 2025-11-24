import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChatWindow } from "./ChatWindow";
import { useConversations, useCreateConversation } from "@/lib/chatQueries";
import { useChatNotifications } from "@/hooks/useChatNotifications";
import { cn } from "@/lib/utils";

interface ChatWidgetProps {
  userId: string;
  userName?: string;
  userAvatar?: string;
  position?: "bottom-right" | "bottom-left";
  playNotificationSound?: boolean;
}

export function ChatWidget({
  userId,
  userName,
  userAvatar,
  position = "bottom-right",
  playNotificationSound = false,
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const { data: conversations = [] } = useConversations(userId);
  const createConversationMutation = useCreateConversation();
  const { totalUnreadCount } = useChatNotifications(userId);

  useEffect(() => {
    if (conversations.length > 0) {
      const activeConv = conversations.find((c) => c.status === "open") || conversations[0];
      setConversationId(activeConv.id);
    }
  }, [conversations]);

  const handleToggle = async () => {
    if (!isOpen && !conversationId) {
      try {
        const newConv = await createConversationMutation.mutateAsync({
          userId,
          status: "open",
        });
        setConversationId(newConv.id);
      } catch (error) {
        console.error("Failed to create conversation:", error);
      }
    }

    setIsOpen(!isOpen);
  };

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
  };

  return (
    <>
      <div
        className={cn("fixed z-50", positionClasses[position])}
        data-testid="chat-widget-container"
      >
        <AnimatePresence>
          {isOpen && conversationId && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-20 right-0 w-[400px] h-[600px] max-h-[80vh] shadow-2xl rounded-lg overflow-hidden"
              data-testid="chat-widget-popup"
            >
              <ChatWindow
                conversationId={conversationId}
                currentUserId={userId}
                title="Support ALTUS"
                subtitle="Nous sommes là pour vous aider"
                onClose={() => setIsOpen(false)}
                getUserName={(id) => (id === userId ? userName || "Vous" : "Support")}
                getUserAvatar={(id) => (id === userId ? userAvatar || "" : "")}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          size="icon"
          onClick={handleToggle}
          className={cn(
            "h-14 w-14 rounded-full shadow-lg transition-all",
            isOpen && "rotate-0"
          )}
          data-testid="button-toggle-chat"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <>
              <MessageCircle className="h-6 w-6" />
              {totalUnreadCount > 0 && !isOpen && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs"
                  data-testid="badge-unread-count"
                >
                  {totalUnreadCount > 99 ? "99+" : totalUnreadCount}
                </Badge>
              )}
            </>
          )}
        </Button>
      </div>
    </>
  );
}
