import { useEffect, useState, useCallback, useRef } from "react";
import { io, Socket } from "socket.io-client";
import type { Message } from "@shared/schema";

interface ChatMessage extends Omit<Message, 'createdAt'> {
  createdAt: Date | string;
}

interface UseChatOptions {
  room: string;
  userId: string;
}

export function useChat({ room, userId }: UseChatOptions) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socketUrl = import.meta.env.PROD
      ? `${window.location.protocol}//${window.location.hostname}`
      : 'http://localhost:5000';

    const socket = io(socketUrl, {
      transports: ['websocket', 'polling'],
      withCredentials: true
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('[CHAT] Connected to Socket.IO');
      setIsConnected(true);
      socket.emit('join_room', room);
      socket.emit('join_room', `user_${userId}`);
    });

    socket.on('disconnect', () => {
      console.log('[CHAT] Disconnected from Socket.IO');
      setIsConnected(false);
    });

    socket.on('receive_message', (data: ChatMessage) => {
      setMessages((prev: ChatMessage[]) => [...prev, data]);
    });

    socket.on('user_typing', ({ userId: typingUserId, isTyping: typing }: { userId: string; isTyping: boolean }) => {
      if (typingUserId !== userId) {
        setIsTyping(typing);
      }
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [room, userId]);

  const sendMessage = useCallback((content: string, receiverId: string) => {
    if (!socketRef.current || !content.trim()) return;

    const messageData = {
      room,
      senderId: userId,
      receiverId,
      content: content.trim(),
      timestamp: new Date()
    };

    socketRef.current.emit('send_message', messageData);
  }, [room, userId]);

  const sendTypingStatus = useCallback((typing: boolean) => {
    if (!socketRef.current) return;

    socketRef.current.emit('typing', {
      room,
      userId,
      isTyping: typing
    });
  }, [room, userId]);

  const markAsRead = useCallback((messageId: string) => {
    if (!socketRef.current) return;
    socketRef.current.emit('mark_as_read', messageId);
  }, []);

  return {
    messages,
    isConnected,
    isTyping,
    sendMessage,
    sendTypingStatus,
    markAsRead
  };
}
