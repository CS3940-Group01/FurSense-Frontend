import { Stack } from "expo-router";
import { GlobalProvider } from "../lib/global-provider";
import "./globals.css";
import "nativewind";
import { NotificationProvider } from "@/context/NotificationContext";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const AppLayout = () => {
  return (
    <NotificationProvider>
      <GlobalProvider>
        <Stack
          screenOptions={{ headerShown: false, animation: "slide_from_right" }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(pages)" />
        </Stack>
      </GlobalProvider>
    </NotificationProvider>
  );
};

export default AppLayout;
