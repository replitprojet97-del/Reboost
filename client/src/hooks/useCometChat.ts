import axios from "axios";
import { CometChatUIKit } from "@cometchat/chat-uikit-react";

export const useCometChatLogin = () => {
  const login = async () => {
    try {
      const { data } = await axios.get("/api/cometchat/auth-token");

      const { uid, authToken } = data;

      await CometChatUIKit.login(authToken);

      console.log("✔️ CometChat login success for", uid);
    } catch (err) {
      console.error("❌ CometChat login error", err);
    }
  };

  return { login };
};
