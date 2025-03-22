import { Text, View } from "react-native";

export default function home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-6xl  text-red-700">Pet app</Text>
    </View>
  );
}
