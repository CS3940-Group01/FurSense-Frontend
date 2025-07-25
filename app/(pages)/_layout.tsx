import { Stack } from "expo-router";


const PagesLayout = () => {
        return (
            <Stack screenOptions={{ headerShown: false , animation: "slide_from_right" }}>
               <Stack.Screen name="(tabs)" />
               <Stack.Screen name="sign-up" />
               <Stack.Screen name="pet/[id]" options={{ headerShown: true, title: 'Pet Details' }} />
               <Stack.Screen name="petregister/PetRegister" options={{ headerShown: true, title: 'Register Pet' }}/>
         </Stack>
        );
    }

export default PagesLayout;