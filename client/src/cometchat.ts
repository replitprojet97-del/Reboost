import { CometChatUIKit, UIKitSettingsBuilder } from "@cometchat/chat-uikit-react";

const appID = import.meta.env.VITE_COMETCHAT_APP_ID || "";
const region = import.meta.env.VITE_COMETCHAT_REGION || "eu";
const authKey = import.meta.env.VITE_COMETCHAT_AUTH_KEY || "";

export const initCometChat = async () => {
  if (!appID) {
    console.warn("⚠️ CometChat APP_ID not configured");
    return Promise.resolve();
  }

  const UIKitSettings = new UIKitSettingsBuilder()
    .setAppId(appID)
    .setRegion(region)
    .setAuthKey(authKey)
    .subscribePresenceForAllUsers()
    .build();

  return CometChatUIKit.init(UIKitSettings)
    .then(() => console.log("✔️ CometChat initialized"))
    .catch((error) => console.error("❌ CometChat init failed:", error));
};
