import {
  Image,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import logo from "../../../assets/images/sign-in-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import MissingPets from "@/components/MissingPets";
import MyPetList from "@/components/MyPetList";
import { GlobalContext } from "@/lib/global-provider";
import { useContext } from "react";
import { router } from "expo-router";
import { useAxiosSecure } from "@/lib/axiosSecure";
import { useNotification } from "@/context/NotificationContext";

export default function Home() {
  const globalContext = useContext(GlobalContext);
  const axiosSecure = useAxiosSecure();
  const NotificationContext = useNotification();
  console.log("GlobalContext in home:", globalContext);
  return (
    <SafeAreaView className="h-full w-full bg-[#f5deda] relative">
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        <View
          className="px-1 py-1 mb-4 flex-row items-center justify-between  shadow-md"
          style={{ backgroundColor: "#6e4c30" }}
        >
          {/* Logo */}
          <Image source={logo} className="w-12 h-12 rounded-full" />

          {/* Welcome Text */}
          <Text className="text-lg font-semibold text-[#ffffff] flex-1 text-center ml-2">
            Welcome {globalContext?.username ? globalContext.username : "User"}!
          </Text>

          {/* Icons */}
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity className="mr-3">
              <FontAwesomeIcon icon={faCircleUser} size={20} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity className="ml-3 mr-3">
              <FontAwesomeIcon icon={faBars} size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        <MissingPets />
        <TouchableOpacity
          onPress={() => {
            router.push("/(pages)/petregister/PetRegister");
          }}
          className="px-6 mb-4 pt-5 "
        >
          <View className="bg-[#6e4c30] rounded-xl py-3 items-center">
            <Text className="text-white font-bold text-base">
              Register new pet
            </Text>
          </View>
        </TouchableOpacity>
        <MyPetList />
      </ScrollView>

      {/* Fixed Tab Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white p-4 flex-row justify-center items-center">
        {/* Your Tab Bar Content */}
        <Text className="text-[#af8d66]">Tab Bar</Text>
      </View>
    </SafeAreaView>
  );
}
