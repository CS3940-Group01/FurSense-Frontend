import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font"; 

const SignUpScreen = () => {

  const [fontsLoaded] = useFonts({
    'Boldonse': require('../../assets/fonts/Boldonse-Regular.ttf'),
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = () => {
    if (name === "" || email === "" || username === "" || password === "") {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    Alert.alert("Success", "Account created successfully!");
    router.replace("/home"); 
  };

  return (
    <LinearGradient colors={["#6D4C41", "#5D4037", "#3E2723"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>FurSense</Text>
        <Image source={require("../../assets/images/sign-up.png")} style={styles.logo} />
      </View>

      {/* Sign-Up Card */}
      <View style={styles.cardContainer}>
        <LinearGradient colors={["#8D6E63", "#6D4C41"]} style={styles.cardWrapper}>
          <View style={styles.card}>
            <Text style={styles.title}>Create an Account</Text>

            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="gray" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                placeholderTextColor="gray"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="gray" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="gray"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="person-circle-outline" size={20} color="gray" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                placeholderTextColor="gray"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="gray" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="gray"
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.replace("/")}>
              <Text style={styles.signUpText}>
                Already have an account? <Text style={{ fontWeight: "bold" }}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: "center",
      paddingTop: 80, 
  },
  headerContainer: {
      alignItems: "center",
      marginBottom: 20, 
  },
  header: {
      fontSize: 50,
      fontFamily: "Boldonse",
      fontWeight: "bold",
      color: "white", 
      textAlign: "center",
  },
  logo: {
      width: 300,
      height: 300,
      marginTop: 0, 
      resizeMode: "contain",
  },
  cardContainer: {
      marginTop: -50, 
      width: "100%",
      alignItems: "center",
  },
  cardWrapper: {
      width: "88%",
      borderRadius: 22,
      padding: 3, 
  },
  card: {
      width: "100%",
      padding: 20,
      backgroundColor: "#EFEBE9",
      borderRadius: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 8,
  },
  title: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#3E2723",
      marginBottom: 20,
  },
  inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#D7CCC8",
      borderRadius: 10,
      paddingHorizontal: 10,
      marginBottom: 15,
      width: "100%",
  },
  icon: {
      marginRight: 10,
  },
  input: {
      flex: 1,
      paddingVertical: 10,
      fontSize: 16,
  },
  button: {
      backgroundColor: "#8D6E63",
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: "center",
      width: "100%",
      marginTop: 10,
  },
  buttonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
  },
  signUpText: {
      marginTop: 15,
      color: "#6D4C41",
      fontSize: 14,
  },
});

export default SignUpScreen;
