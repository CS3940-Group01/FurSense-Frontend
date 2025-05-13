import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const Pet = () => {
  const { id } = useLocalSearchParams(); // Get the id from the route

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-lg font-bold">Pet ID: {id}</Text>
    </View>
  );
};

export default Pet;
