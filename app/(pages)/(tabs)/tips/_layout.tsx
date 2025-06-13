import { Stack } from "expo-router";
import "../../../globals.css";
import "nativewind";

const TipsLayout = () => {
  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="dog" />
      <Stack.Screen name="cat" />
      <Stack.Screen name="fish" />
      <Stack.Screen name="bird" />
      <Stack.Screen name="rabbit" />
      <Stack.Screen name="hamster" />
      <Stack.Screen name="tortoise" />
      <Stack.Screen name="pig" />
    </Stack>
  );
};

export default TipsLayout;
