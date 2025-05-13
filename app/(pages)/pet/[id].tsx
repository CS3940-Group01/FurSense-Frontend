import React from "react";
import { useLocalSearchParams } from "expo-router";
import { MyPets } from "@/assets/constants/MyPets";
import { View, Text, Image, ScrollView } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSyringe,
  faShower,
  faPaw,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const PetProfile = () => {
  const { id } = useLocalSearchParams();
  const pet = MyPets.find((p) => p.id === parseInt(id as string));

  if (!pet) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-xl font-bold">Pet not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white px-5 pt-10 pb-20">
      {/* Header Section */}
      <View className="items-center mb-6">
        <Image
          source={pet.image}
          className="w-36 h-36 rounded-full border-4 border-[#6e4c30]"
        />
        <Text className="text-3xl font-bold text-[#6e4c30] mt-4">{pet.name}</Text>
        <Text className="text-md text-[#af8d66] font-semibold">{pet.breed}</Text>
      </View>

      {/* Info Section */}
      <View className="bg-[#af8d66] rounded-xl p-5 shadow-lg">
        <Text className="text-lg text-white font-bold mb-3">Pet Details</Text>
        <Text className="text-white font-semibold">Age: {pet.age} years</Text>
        <Text className="text-white font-semibold">Weight: {pet.weight} kg</Text>
        <Text className="text-white font-semibold">Height: {pet.height} cm</Text>
        <View className="mt-3">
          <Text className="text-white font-semibold">
            <FontAwesomeIcon icon={faSyringe} color="white" size={14} /> Latest Vaccine:{" "}
            {pet.latestVaccine}
          </Text>
          <Text className="text-white font-semibold mt-1">
            <FontAwesomeIcon icon={faShower} color="white" size={14} /> Last Bath:{" "}
            {pet.lastBath}
          </Text>
          <Text className="text-white font-semibold mt-1">
            <FontAwesomeIcon icon={faPaw} color="white" size={14} /> Last Walk:{" "}
            {pet.lastWalk}
          </Text>
        </View>
      </View>

      {/* Medical History */}
      <View className="bg-[#6e4c30] rounded-xl mt-6 p-5 shadow-lg">
        <Text className="text-lg text-white font-bold mb-3">Medical History</Text>
        {pet.medicalHistory.map((record, index) => (
          <Text key={index} className="text-white mb-1">
            • {record.date}: {record.description}
          </Text>
        ))}
      </View>

      {/* Owner Info */}
      <View className="bg-[#af8d66] rounded-xl mt-6 p-5 shadow-lg mb-10">
        <Text className="text-lg text-white font-bold mb-3">Owner Info</Text>
        <Text className="text-white font-semibold">
          <FontAwesomeIcon icon={faUser} color="white" size={14} /> {pet.owner.name}
        </Text>
        <Text className="text-white font-semibold mt-1">
          <FontAwesomeIcon icon={faPhone} color="white" size={14} /> {pet.owner.contact}
        </Text>
      </View>
    </ScrollView>
  );
};

export default PetProfile;
