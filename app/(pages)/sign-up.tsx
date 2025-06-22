import React, { useState, useEffect, useContext } from "react";
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
  KeyboardTypeOptions,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { GlobalContext } from "@/lib/global-provider";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const router = useRouter();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const translateY = useState(new Animated.Value(0))[0];
  const globalContext = useContext(GlobalContext);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
      Animated.timing(translateY, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, [translateY]);

  const handleSignUp = () => {
    if (
      email === "" ||
      username === "" ||
      password === "" ||
      address === "" ||
      phoneNumber === ""
    ) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    axios
      .post("http://54.172.216.211:8080/auth/register", {
        username,
        password,
        email,
        address,
        phoneNumber,
      })
      .then((response) => {
        if (response.status === 200) {
          axios
            .post("http://54.172.216.211:8080/auth/login", {
              username,
              password,
            })
            .then((loginResponse) => {
              console.log("login response", loginResponse);
              if (loginResponse.status === 200) {
                if (globalContext) {
                  globalContext.login(username, loginResponse.data);
                }
                router.replace("/home");
              }
            });
          Alert.alert(
            "Success",
            `Account Created Successfully! Welcome, ${username}!`
          );
          console.log("Login successful:", response.data);
        } else {
          Alert.alert("Error", "Register Failed.");
        }
      });
  };

  const SignUpLayout = (
    <LinearGradient
      colors={["#6D4C41", "#5D4037", "#3E2723"]}
      style={{ flex: 1 }}
    >
      <Animated.View
        style={{
          transform: [{ translateY }],
          flex: 1,
          alignItems: "center",
        }}
      >
        <View className="items-center mb-4">
          <View className="items-center">
            <Image
              source={require("../../assets/images/sign-in-logo.png")}
              style={{ width: 300, height: 300 }}
              resizeMode="contain"
            />
          </View>
          <Image
            source={require("../../assets/images/sign-up.png")}
            style={{ width: 200, height: 200, marginTop: -40 }}
            resizeMode="contain"
          />
        </View>

        <View className="w-full items-center -mt-12">
          <View className="w-11/12 p-1 rounded-2xl">
            <View className="bg-[#EFEBE9] w-full p-5 rounded-2xl items-center shadow-lg">
              <Text className="text-2xl font-bold text-[#3E2723] mb-5">
                Create an Account
              </Text>

              {[
                {
                  placeholder: "Username",
                  icon: "person-outline",
                  value: username,
                  setValue: setUsername,
                },
                {
                  placeholder: "Password",
                  icon: "lock-closed-outline",
                  value: password,
                  setValue: setPassword,
                  secureTextEntry: true,
                },
                {
                  placeholder: "Email",
                  icon: "mail-outline",
                  value: email,
                  setValue: setEmail,
                  keyboardType: "email-address" as KeyboardTypeOptions,
                },
                {
                  placeholder: "Address",
                  icon: "home-outline",
                  value: address,
                  setValue: setAddress,
                },
                {
                  placeholder: "Phone Number",
                  icon: "call-outline",
                  value: phoneNumber,
                  setValue: setphoneNumber,
                  keyboardType: "phone-pad" as KeyboardTypeOptions,
                },
              ].map((field, index) => (
                <View
                  key={index}
                  className="flex-row items-center bg-[#D7CCC8] rounded-lg px-3 mb-4 w-full"
                >
                  <Ionicons
                    name={field.icon as keyof typeof Ionicons.glyphMap}
                    size={20}
                    color="gray"
                    className="mr-2"
                  />
                  <TextInput
                    className="flex-1 py-2 text-base"
                    placeholder={field.placeholder}
                    value={field.value}
                    onChangeText={field.setValue}
                    autoCapitalize="none"
                    placeholderTextColor="gray"
                    secureTextEntry={field.secureTextEntry || false}
                    keyboardType={field.keyboardType || "default"}
                  />
                </View>
              ))}

              <TouchableOpacity
                className="bg-[#8D6E63] py-3 rounded-lg items-center w-full mt-2"
                onPress={handleSignUp}
              >
                <Text className="text-white text-lg font-bold">Sign Up</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.replace("/")}>
                <Text className="mt-4 text-[#6D4C41] text-sm">
                  Already have an account?{" "}
                  <Text className="font-bold">Sign In</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    </LinearGradient>
  );

  return Platform.OS === "web" ? (
    SignUpLayout
  ) : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {SignUpLayout}
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;
