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
        toValue: -280,
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

    console.log("Attempting login with:");
    console.log("Username:", username);
    console.log("Password:", password);

    axios
      // .post("http://10.10.23.106:8080/auth/login", { username, password })
      .post("http://54.172.216.211:8080/auth/login", { username, password })

      .then((response) => {
        console.log("Login response:", response);

        if (response.status === 200) {
          Alert.alert("Success", `Login successful! Welcome, ${username}!`);
          if (globalContext) {
            globalContext.login(username, response.data);
          }
          router.replace("/home");
        } else {
          console.log("Unexpected status code:", response.status);
          Alert.alert("Error", "Invalid credentials.");
        }
      })
      .catch((error) => {
        // console.error("Login error:", error.message);

        if (error.response) {
          // Server responded with a status code outside 2xx
          // console.error("Server responded with:");
          // console.error("Status:", error.response.status);
          // console.error("Data:", error.response.data);
          Alert.alert("Login Failed", `Server error: ${error.response.status}`);
        } else if (error.request) {
          // Request was made but no response received
          // console.error("No response received. Request was:");
          // console.error(error.request);
          Alert.alert("Network Error", "No response from server.");
        } else {
          // Something else caused the error
          // console.error("Unexpected error:", error.message);
          Alert.alert("Error", `Something went wrong: ${error.message}`);
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
          paddingTop: 10,
        }}
      >
        <View className="items-center">
          <View className="items-center">
            <Image
              source={require("../assets/images/sign-in-logo.png")}
              style={{
                width: 300,
                height: 300,
                marginTop: 10,
                marginBottom: 10,
              }}
              resizeMode="contain"
            />
          </View>
          <Image
            source={require("../assets/images/sign-in.png")}
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
          />
        </View>

        <View className="w-full items-center">
          <View className="w-11/12 rounded-2xl p-[3px]">
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
