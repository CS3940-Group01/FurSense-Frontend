import React, { useEffect, useState } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; // Import FontAwesome
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons'; // Import icons
import { MyPets } from '@/assets/constants/MyPets'; // Pet data import

// Define types for Pet and MedicalHistory
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
  image: any; // Assuming image is a local source (e.g., require or imported image)
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
  const [clicked, setClicked] = useState<number | null>(null); // Handle individual toggle state for each pet
  const [petList, setPetList] = useState<Pet[]>([]); // Define the type of petList as an array of Pet

  useEffect(() => {
    setPetList(MyPets); // Setting pet data to the state
    console.log("Pet List:", petList);
    
  }, []);

  const handleToggle = (id: number) => {
    setClicked(clicked === id ? null : id); // Toggle the clicked pet's vaccines section
  };

  return (
    <View className="mt-5 h-full gap-4">
      {petList.map((pet) => (
        
        
        <View key={pet.id} className="bg-[#af8d66] w-[90%] self-center rounded-xl p-4 shadow-lg">
          <View className="flex-row items-center">
            <Image
              source={pet.image}
              className="w-20 h-20 rounded-full border-2 border-white"
            />
            <View className="ml-4">
              <Text className="text-[#6e4c30]  text-[20px] font-bold text-center">{pet.name}</Text>
              <Text className="text-white text-md font-semibold">Age: {pet.age} years</Text>

              <View className="flex flex-row justify-between mt-2 gap-5">
                <View>
                  <Text className="text-white text-md font-bold">Weight: {pet.weight} kg</Text>
                  <Text className="text-white text-sm">4 months ago</Text>
                </View>
                <View>
                  <Text className="text-white text-md font-bold">Height: {pet.height} cm</Text>
                  <Text className="text-white text-sm">4 months ago</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Vaccines Tile */}
          <TouchableOpacity onPress={() => handleToggle(pet.id)} className="mt-4">
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
                      <Text className="text-white text-sm">{item.date}: {item.description}</Text>
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
