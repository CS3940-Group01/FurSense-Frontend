import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import axios from "axios";
import { GlobalContext } from "@/lib/global-provider";

export default function SignInScreen() {
  const [fontsLoaded] = useFonts({
    Boldonse: require("../assets/fonts/Boldonse-Regular.ttf"),
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const globalContext = useContext(GlobalContext);

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const translateY = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
      Animated.timing(translateY, {
        toValue: -230,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [translateY]);

  const handleSignIn = () => {
    if (username === "" || password === "") {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    axios
      .post("http://192.168.1.9:8080/auth/login", { username, password })
      .then((response) => {
        if (response.status === 200) {
          Alert.alert("Success", `Login successful! Welcome, ${username}!`);
          if (globalContext) {
            globalContext.login(username, response.data);
          }
          router.replace("/home");
        } else {
          Alert.alert("Error", "Invalid credentials.");
        }
      });
  };

  const SignInLayout = (
    <LinearGradient
      colors={["#6D4C41", "#5D4037", "#3E2723"]}
      style={{ flex: 1 }}
    >
      <Animated.View
        style={{
          transform: [{ translateY }],
          flex: 1,
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <View className="items-center">
          <Text className="text-[72px] font-bold text-white mt-20 mb-20 ">
            FurSense
          </Text>
          <Image
            source={require("../assets/images/sign-in.png")}
            className="mt-10"
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
          />
        </View>

        <View className="w-full items-center">
          <View
            className="w-11/12 rounded-2xl p-[3px]"
          >
            <View className="w-full p-5 bg-[#EFEBE9] rounded-lg items-center shadow-lg">
              <Text className="text-2xl font-bold text-[#3E2723] mb-5">
                Welcome Back
              </Text>

              <View className="flex-row items-center bg-[#D7CCC8] rounded-lg px-3 mb-4 w-full">
                <Ionicons
                  name="person-outline"
                  size={20}
                  color="gray"
                  className="mr-2"
                />
                <TextInput
                  className="flex-1 py-3 text-lg"
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  placeholderTextColor="gray"
                />
              </View>

              <View className="flex-row items-center bg-[#D7CCC8] rounded-lg px-3 mb-4 w-full">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="gray"
                  className="mr-2"
                />
                <TextInput
                  className="flex-1 py-3 text-lg"
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholderTextColor="gray"
                />
              </View>

              <TouchableOpacity
                className="bg-[#8D6E63] py-3 rounded-lg items-center w-full mt-2"
                onPress={handleSignIn}
              >
                <Text className="text-white text-lg font-bold">Sign In</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.replace("/sign-up")}>
                <Text className="mt-4 text-[#6D4C41] text-sm">
                  Don't have an account?{" "}
                  <Text className="font-bold">Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    </LinearGradient>
  );

  return Platform.OS === "web" ? (
    SignInLayout
  ) : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {SignInLayout}
    </TouchableWithoutFeedback>
  );
}
