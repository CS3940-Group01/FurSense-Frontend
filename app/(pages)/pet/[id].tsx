import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

const PetProfile: React.FC = () => {
  const { pet } = useLocalSearchParams();

  let petData = null;
  try {
    petData = pet ? JSON.parse(decodeURIComponent(pet as string)) : null;
  } catch (err) {
    console.error("Invalid pet param", err);
  }

  if (!petData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Invalid or missing pet data.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>{petData.name}</Text>
    </View>
  );
};

export default PetProfile;
