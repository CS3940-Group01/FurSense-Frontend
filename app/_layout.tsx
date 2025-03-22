import { Stack } from "expo-router";
import { GlobalProvider } from "../lib/global-provider";

const AppLayout = () => {
    return (
        <GlobalProvider>
            <Stack screenOptions={{ headerShown: false, animation: "slide_from_right",}}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="(pages)" />
            </Stack>
        </GlobalProvider>
    );
};

export default AppLayout;