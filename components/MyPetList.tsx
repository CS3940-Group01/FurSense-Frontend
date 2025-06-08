import React, { useEffect, useState } from "react";
import { ImageBackground, Text, View, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { useAxiosSecure } from "@/lib/axiosSecure";

interface Pet {
  id: number;
  name: string;
  image: string;
  age: number;
  type: string;
  birthDate: Date;
}

const screenHeight = Dimensions.get("window").height;

const MyPetList: React.FC = () => {
  const axiosSecure = useAxiosSecure();
  const [petList, setPetList] = useState<Pet[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getPetList = async () => {
      try {
        const response = await axiosSecure.get("/pet/getPetsByOwnerId?ownerId=8");
        console.log("response in petlist", response.data);
        setPetList(response.data);
      } catch (error) {
        console.error("Error fetching pet list:", error);
      }
    };
    getPetList();
  }, []);

const handleNavigate = (pet: Pet) => {
  const petParam = encodeURIComponent(JSON.stringify(pet));
  router.push({
    pathname: "/pet/[id]",
    params: { id: String(pet.id), pet: petParam },
  });
};


  return (
    <ScrollView className="mt-4">
      <View className="flex flex-col gap-6 px-5 pb-8">
        {petList.map((pet) => (
          <View
            key={pet.id}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.15,
              shadowRadius: 10,
              elevation: 8,
              borderRadius: 20,
              overflow: "hidden",
              height: screenHeight / 3,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => handleNavigate(pet)}
              className="flex-1"
            >
              <ImageBackground
                source={{ uri: pet.image }}
                resizeMode="cover"
                className="flex-1"
                imageStyle={{ borderRadius: 20 }}
              >
                <View
                  style={{
                    flex: 1,
                    borderRadius: 20,
                    backgroundColor: "rgba(0,0,0,0.3)",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 24,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      borderRadius: 16,
                      paddingVertical: 18,
                      paddingHorizontal: 28,
                      borderColor: "rgba(255, 255, 255, 0.3)",
                      borderWidth: 1,
                      shadowColor: "#fff",
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.8,
                      shadowRadius: 8,
                    }}
                  >
                    <Text
                      className="text-white text-4xl font-semibold tracking-wider text-center"
                      style={{
                        textShadowColor: "rgba(0,0,0,0.7)",
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 4,
                      }}
                    >
                      {pet.name}
                    </Text>
                  </View>
                </View>

                {pet.type && (
                  <View
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      backgroundColor: "rgba(255,255,255,0.8)",
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 12,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                    }}
                  >
                    <Text style={{ color: "#444", fontWeight: "600", fontSize: 14 }}>
                      {pet.type}
                    </Text>
                  </View>
                )}
              </ImageBackground>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default MyPetList;
