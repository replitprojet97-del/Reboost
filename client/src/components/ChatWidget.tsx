import { useState, useEffect, useCallback } from "react";
import { useUser } from "@/hooks/use-user";
import { CometChatConversations } from "@cometchat/chat-uikit-react";
import { CometChatUIKit, UIKitSettingsBuilder } from "@cometchat/chat-uikit-react";
import { getApiUrl } from "@/lib/queryClient";

let isInitialized = false;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [isCometChatReady, setIsCometChatReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: user } = useUser();

  const initializeCometChat = useCallback(async () => {
    try {
      const res = await fetch(getApiUrl("/api/cometchat/auth-token"), {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch auth token: ${res.status}`);
      }
      const data = await res.json();
      const { uid, authToken, appId, region } = data;

      if (!authToken || !appId || !region) {
        throw new Error("Configuration CometChat incomplète");
      }

      if (!isInitialized) {
        const UIKitSettings = new UIKitSettingsBuilder()
          .setAppId(appId)
          .setRegion(region)
          .subscribePresenceForAllUsers()
          .build();

        await CometChatUIKit.init(UIKitSettings);
        isInitialized = true;
        console.log("✔️ CometChat initialized");
      }

      await CometChatUIKit.loginWithAuthToken(authToken);
      console.log("✔️ CometChat login success for", uid);
      
      setIsCometChatReady(true);
      setError(null);
    } catch (err) {
      console.error("❌ CometChat error:", err);
      setError("Impossible de se connecter au chat. Veuillez réessayer.");
    }
  }, []);

  useEffect(() => {
    if (open && !isCometChatReady && user) {
      initializeCometChat();
    }
  }, [open, isCometChatReady, user, initializeCometChat]);

  if (!user) {
    return null;
  }

  return (
    <>
      <button
        data-testid="button-chat-widget"
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#6c5ce7",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          color: "#fff",
          fontSize: "26px",
          border: "none",
          cursor: "pointer",
          zIndex: 9999,
        }}
      >
        💬
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "400px",
            height: "600px",
            background: "#fff",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            zIndex: 9999,
          }}
        >
          {error ? (
            <div style={{ padding: "20px", textAlign: "center" }}>
              <p style={{ color: "#e74c3c" }}>{error}</p>
            </div>
          ) : !isCometChatReady ? (
            <div style={{ padding: "20px", textAlign: "center" }}>
              <p>Chargement du chat...</p>
            </div>
          ) : (
            <CometChatConversations />
          )}
        </div>
      )}
    </>
  );
}
