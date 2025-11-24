import { useEffect, useState, useCallback, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSocket } from "./useSocket";
import { useUser } from "./use-user";
import type { ChatMessage } from "@shared/schema";

interface UseChatMessagesOptions {
  conversationId: string;
  onNewMessage?: (message: ChatMessage) => void;
  onTyping?: (data: { userId: string; username: string }) => void;
  onStoppedTyping?: (data: { userId: string }) => void;
}

interface UseChatMessagesReturn {
  sendMessage: (content: string, fileUrl?: string, fileName?: string) => void;
  startTyping: () => void;
  stopTyping: () => void;
  isTyping: boolean;
  typingUsers: Array<{ userId: string; username: string }>;
}

export function useChatMessages({
  conversationId,
  onNewMessage,
  onTyping,
  onStoppedTyping,
}: UseChatMessagesOptions): UseChatMessagesReturn {
  const { socket, connected } = useSocket();
  const queryClient = useQueryClient();
  const { data: currentUser } = useUser();
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<Array<{ userId: string; username: string }>>([]);
  const typingTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (!socket || !connected || !conversationId) return;

    socket.emit("join_conversation", conversationId);

    const handleNewMessage = (message: ChatMessage) => {
      queryClient.invalidateQueries({
        queryKey: ['chat', 'messages', conversationId],
      });
      if (currentUser?.id) {
        queryClient.invalidateQueries({
          queryKey: ['chat', 'conversations', 'user', currentUser.id],
        });
        queryClient.invalidateQueries({
          queryKey: ['chat', 'unread', 'user', currentUser.id],
        });
      }
      queryClient.invalidateQueries({
        queryKey: ['chat', 'unread', 'conversation', conversationId],
      });

      if (onNewMessage) {
        onNewMessage(message);
      }
    };

    const handleUserTyping = (data: { userId: string; username: string; conversationId: string }) => {
      if (data.conversationId === conversationId) {
        setTypingUsers((prev) => {
          const exists = prev.some((u) => u.userId === data.userId);
          if (!exists) {
            return [...prev, { userId: data.userId, username: data.username }];
          }
          return prev;
        });

        if (onTyping) {
          onTyping({ userId: data.userId, username: data.username });
        }
      }
    };

    const handleUserStoppedTyping = (data: { userId: string; conversationId: string }) => {
      if (data.conversationId === conversationId) {
        setTypingUsers((prev) => prev.filter((u) => u.userId !== data.userId));

        if (onStoppedTyping) {
          onStoppedTyping({ userId: data.userId });
        }
      }
    };

    const handleMessageRead = (data: { conversationId: string; messageIds: string[] }) => {
      if (data.conversationId === conversationId) {
        queryClient.invalidateQueries({
          queryKey: ['chat', 'messages', conversationId],
        });
        queryClient.invalidateQueries({
          queryKey: ['chat', 'unread', 'conversation', conversationId],
        });
        if (currentUser?.id) {
          queryClient.invalidateQueries({
            queryKey: ['chat', 'conversations', 'user', currentUser.id],
          });
          queryClient.invalidateQueries({
            queryKey: ['chat', 'unread', 'user', currentUser.id],
          });
        }
      }
    };

    socket.on("new_message", handleNewMessage);
    socket.on("user_typing", handleUserTyping);
    socket.on("user_stopped_typing", handleUserStoppedTyping);
    socket.on("message_read", handleMessageRead);

    return () => {
      socket.emit("leave_conversation", conversationId);
      socket.off("new_message", handleNewMessage);
      socket.off("user_typing", handleUserTyping);
      socket.off("user_stopped_typing", handleUserStoppedTyping);
      socket.off("message_read", handleMessageRead);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [socket, connected, conversationId, queryClient, currentUser, onNewMessage, onTyping, onStoppedTyping]);

  const sendMessage = useCallback(
    (content: string, fileUrl?: string, fileName?: string) => {
      if (!socket || !connected) {
        console.error("Socket not connected");
        return;
      }

      socket.emit("send_message", {
        conversationId,
        content,
        fileUrl,
        fileName,
      });
    },
    [socket, connected, conversationId]
  );

  const startTyping = useCallback(() => {
    if (!socket || !connected) return;

    setIsTyping(true);
    socket.emit("typing_start", { conversationId });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      stopTyping();
    }, 3000);
  }, [socket, connected, conversationId]);

  const stopTyping = useCallback(() => {
    if (!socket || !connected) return;

    setIsTyping(false);
    socket.emit("typing_stop", { conversationId });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  }, [socket, connected, conversationId]);

  return {
    sendMessage,
    startTyping,
    stopTyping,
    isTyping,
    typingUsers,
  };
}
