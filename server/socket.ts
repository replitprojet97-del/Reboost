import { Server as HTTPServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { storage } from "./storage";

export function setupSocketIO(httpServer: HTTPServer): SocketIOServer {
  const allowedOrigins = process.env.NODE_ENV === 'production'
    ? [
        'https://altusfinancesgroup.com',
        'https://www.altusfinancesgroup.com',
        process.env.FRONTEND_URL
      ].filter((origin): origin is string => typeof origin === 'string')
    : ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://localhost:5000'];

  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: allowedOrigins,
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  io.on("connection", (socket: Socket) => {
    console.log(`[SOCKET.IO] Client connecté: ${socket.id}`);

    socket.on("join_room", (roomId: string) => {
      socket.join(roomId);
      console.log(`[SOCKET.IO] Client ${socket.id} a rejoint le salon: ${roomId}`);
    });

    socket.on("send_message", async (data: {
      room: string;
      senderId: string;
      receiverId: string;
      content: string;
      timestamp: Date;
    }) => {
      try {
        const message = await storage.createChatMessage({
          senderId: data.senderId,
          receiverId: data.receiverId,
          content: data.content,
          isRead: false,
          readAt: null
        });

        io.to(data.room).emit("receive_message", {
          ...data,
          id: message.id,
          createdAt: message.createdAt
        });

        const receiverRoom = `user_${data.receiverId}`;
        io.to(receiverRoom).emit("new_message_notification", {
          from: data.senderId,
          messageId: message.id
        });

        console.log(`[SOCKET.IO] Message envoyé dans le salon ${data.room}`);
      } catch (error) {
        console.error('[SOCKET.IO] Erreur lors de l\'envoi du message:', error);
        socket.emit("error", { message: "Erreur lors de l'envoi du message" });
      }
    });

    socket.on("mark_as_read", async (messageId: string) => {
      try {
        await storage.markChatMessageAsRead(messageId);
        console.log(`[SOCKET.IO] Message ${messageId} marqué comme lu`);
      } catch (error) {
        console.error('[SOCKET.IO] Erreur lors du marquage comme lu:', error);
      }
    });

    socket.on("typing", (data: { room: string; userId: string; isTyping: boolean }) => {
      socket.to(data.room).emit("user_typing", {
        userId: data.userId,
        isTyping: data.isTyping
      });
    });

    socket.on("disconnect", () => {
      console.log(`[SOCKET.IO] Client déconnecté: ${socket.id}`);
    });
  });

  console.log('[SOCKET.IO] ✅ Socket.IO configuré avec succès');
  return io;
}
