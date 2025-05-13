import React, { useEffect, useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { MyPets } from "@/assets/constants/MyPets";
import { useRouter } from "expo-router"; // For navigation

interface MedicalHistory {
  date: string;
  description: string;
}

interface Pet {
  id: number;
  name: string;
  age: number;
  weight: number;
  height: number;
  image: any;
  latestVaccine: string;
  lastBath: string;
  lastWalk: string;
  breed: string;
  medicalHistory: MedicalHistory[];
  owner: {
    name: string;
    contact: string;
  };
}

const MyPetList: React.FC = () => {
  const [clicked, setClicked] = useState<number | null>(null);
  const [petList, setPetList] = useState<Pet[]>([]);
  const router = useRouter(); // Navigation hook

  useEffect(() => {
    setPetList(MyPets);
  }, []);

  const handleToggle = (id: number) => {
    setClicked(clicked === id ? null : id);
  };

  const handleNavigate = (id: number) => {
    router.push({ pathname: "/pet/[id]", params: { id: String(id) } }); // Navigate to dynamic page
  };

  return (
    <View className="mt-5 h-full gap-4">
      {petList.map((pet) => (
        <View
          key={pet.id}
          className="bg-[#af8d66] w-[90%] self-center rounded-xl p-4 shadow-lg relative"
        >
          {/* Top-right chevron icon for navigation */}
          <TouchableOpacity
            onPress={() => handleNavigate(pet.id)}
            className="absolute top-3 right-3 z-10 bg-[#6e4c30] px-3 py-1 rounded-full flex-row items-center space-x-1 shadow-md"
          >
            <Text className="text-white text-sm font-semibold">Details</Text>
            <FontAwesomeIcon icon={faChevronRight} size={14} color="#fff" />
          </TouchableOpacity>

          <View className="flex-row items-center">
            <Image
              source={pet.image}
              className="w-20 h-20 rounded-full border-2 border-white"
            />
            <View className="ml-4">
              <Text className="text-[#6e4c30] text-[20px] font-bold text-center">
                {pet.name}
              </Text>
              <Text className="text-white text-md font-semibold">
                Age: {pet.age} years
              </Text>

              <View className="flex flex-row justify-between mt-2 gap-5">
                <View>
                  <Text className="text-white text-md font-bold">
                    Weight: {pet.weight} kg
                  </Text>
                  <Text className="text-white text-sm">4 months ago</Text>
                </View>
                <View>
                  <Text className="text-white text-md font-bold">
                    Height: {pet.height} cm
                  </Text>
                  <Text className="text-white text-sm">4 months ago</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Vaccines Tile */}
          <TouchableOpacity
            onPress={() => handleToggle(pet.id)}
            className="mt-4"
          >
            <View className="bg-[#6e4c30] p-3 rounded-lg">
              <View className="flex flex-row justify-between">
                <Text className="text-white text-lg font-bold">Vaccines</Text>
                <FontAwesomeIcon
                  icon={clicked === pet.id ? faChevronDown : faChevronRight}
                  size={20}
                  color="white"
                />
              </View>

              {clicked === pet.id && (
                <View>
                  {pet.medicalHistory.map((item, index) => (
                    <View key={index} className="mb-2 pl-4">
                      <Text className="text-white text-sm">
                        {item.date}: {item.description}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default MyPetList;
