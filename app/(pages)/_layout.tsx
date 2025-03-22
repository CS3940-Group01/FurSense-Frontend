import { Stack } from "expo-router";
import { useContext } from "react";
import { GlobalContext } from "../../lib/global-provider";

const PagesLayout = () => {
        return (
            <Stack screenOptions={{ headerShown: false , animation: "slide_from_right" }}>
               <Stack.Screen name="(tabs)" />
               <Stack.Screen name="sign-up" />
         </Stack>
        );
    }

export default PagesLayout;