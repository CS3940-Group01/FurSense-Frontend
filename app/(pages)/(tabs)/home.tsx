import { Image, SafeAreaView, Text, View, ScrollView } from "react-native";
import logo from "../../../assets/images/logo.webp";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import MissingPets from "@/components/MissingPets";
import MyPetList from "@/components/MyPetList";
import { GlobalContext } from "@/lib/global-provider";
import { useContext } from "react";

export default function Home() {

  const globalContext = useContext(GlobalContext);
  console.log("GlobalContext in home:", globalContext);
  return (
    <SafeAreaView className="h-full w-full bg-[#f5deda] relative">
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        <View className="flex-row items-center justify-between px-6 pt-4 pb-6">
          {/* Logo */}
          <Image source={logo} className="w-12 h-12 rounded-full" />

          {/* Title */}
          <Text className="text-2xl font-bold text-[#af8d66]">Welcome {globalContext?.username ? globalContext.username: "User"}!</Text>

          {/* Icons */}
          <View className="flex-row items-center gap-3">
            <FontAwesomeIcon icon={faCircleUser} size={16} color="#af8d66" />
            <FontAwesomeIcon icon={faBars} size={16} color="#af8d66" />
          </View>
        </View>

        <MissingPets />
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
