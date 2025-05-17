import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MyPets } from "@/assets/constants/MyPets";
import { MaterialIcons, FontAwesome5, Entypo } from "@expo/vector-icons";

const PetProfile: React.FC = () => {
  const { id } = useLocalSearchParams();
  const pet = MyPets.find(p => String(p.id) === id);

  if (!pet) {
    return (
      <View className="flex-1 justify-center items-center p-6">
        <Text className="text-lg font-semibold text-gray-600">Pet not found.</Text>
      </View>
    );
  }

  // Helper: Format date nicely
  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString();

  return (
    <ScrollView className="flex-1 bg-[#f5deda] p-4">
      {/* Pet Image with Rounded & Shadow */}
      <View className="w-full h-72 rounded-2xl overflow-hidden shadow-xl mb-6">
        <Image source={pet.image} resizeMode="cover" className="w-full h-full" />
        {/* Overlay with pet name & breed */}
        <View className="absolute bottom-4 left-4 bg-black bg-opacity-50 rounded-3xl px-5 py-2">
          <Text className="text-3xl font-extrabold text-white">{pet.name}</Text>
          <Text className="text-sm text-gray-300">{pet.breed}</Text>
        </View>
      </View>

      {/* Quick Stats: Age, Weight, Height with icons */}
      <View className="flex-row justify-around bg-gray-100 rounded-2xl p-5 shadow-md mb-8">
        <View className="items-center">
          <FontAwesome5 name="birthday-cake" size={28} color="#4f46e5" />
          <Text className="mt-2 font-semibold text-gray-800">{pet.age} years</Text>
          <Text className="text-sm text-gray-500">Age</Text>
        </View>
        <View className="items-center">
          <MaterialIcons name="fitness-center" size={28} color="#16a34a" />
          <Text className="mt-2 font-semibold text-gray-800">{pet.weight} kg</Text>
          <Text className="text-sm text-gray-500">Weight</Text>
        </View>
        <View className="items-center">
          <Entypo name="ruler" size={28} color="#ef4444" />
          <Text className="mt-2 font-semibold text-gray-800">{pet.height} cm</Text>
          <Text className="text-sm text-gray-500">Height</Text>
        </View>
      </View>

      {/* Medical History with icons */}
      <View className="mb-8">
        <Text className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2 text-gray-700">
          🩺 Medical History
        </Text>
        {pet.medicalHistory.length === 0 ? (
          <Text className="text-gray-500 italic">No medical history available.</Text>
        ) : (
          pet.medicalHistory.map(({ date, description }, idx) => (
            <View
              key={idx}
              className="flex-row justify-between items-center mb-3 rounded-xl bg-indigo-50 p-3 shadow-sm"
            >
              <MaterialIcons name="medical-services" size={24} color="#6366f1" />
              <Text className="flex-1 px-4 text-gray-800 font-medium">{description}</Text>
              <Text className="text-gray-500 text-sm">{formatDate(date)}</Text>
            </View>
          ))
        )}
      </View>

      {/* Upcoming Vaccines as colorful pills */}
      <View className="mb-8">
        <Text className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2 text-gray-700">
          💉 Upcoming Vaccines
        </Text>
        {pet.upcomingVaccines?.length === 0 ? (
          <Text className="text-gray-500 italic">No upcoming vaccines scheduled.</Text>
        ) : (
          <View className="flex-row flex-wrap gap-3">
            {pet.upcomingVaccines.map(({ description, date }, idx) => (
              <View
                key={idx}
                className="bg-green-100 px-4 py-2 rounded-full shadow-md flex-row items-center"
              >
                <FontAwesome5 name="syringe" size={18} color="#16a34a" />
                <Text className="ml-2 font-semibold text-green-700">{description}</Text>
                <Text className="ml-2 text-gray-600 text-xs">{formatDate(date)}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Owner Info with subtle styling */}
      <View className="bg-gray-50 rounded-2xl p-5 shadow-inner border border-gray-200">
        <Text className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2 text-gray-700">
          👤 Owner Information
        </Text>
        <Text className="text-lg font-semibold text-gray-800">
          {pet.owner.name}
        </Text>
        <Text className="text-gray-600 mt-1">{pet.owner.contact}</Text>
      </View>
    </ScrollView>
  );
};

export default PetProfile;
