import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAxiosSecure } from "@/lib/axiosSecure";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const PetRegister: React.FC = () => {
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("Dog");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const axiosSecure = useAxiosSecure();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadToCloudinary = async (uri: string): Promise<string | null> => {
    try {
      setImageUploading(true);
      const formData = new FormData();
      formData.append("file", {
        uri,
        type: "image/jpeg",
        name: "pet.jpg",
      } as any);
      formData.append("upload_preset", "unsigned_pets");
      formData.append("folder", "pets");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dwtwqhvdv/image/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setImageUploading(false);
      return response.data.secure_url;
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      setImageUploading(false);
      return null;
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") setShowDatePicker(false);
    if (selectedDate) setBirthDate(selectedDate);
  };

  const calculateAge = (birthDate: Date): number =>
    new Date().getFullYear() - birthDate.getFullYear();

  const handleSubmit = async () => {
    if (!petName.trim()) return Alert.alert("Validation", "Please enter your pet's name.");
    if (!imageUri) return Alert.alert("Validation", "Please pick an image.");
    const imageUrl = await uploadToCloudinary(imageUri);
    if (!imageUrl) return Alert.alert("Error", "Image upload failed.");

    const payload = {
      name: petName,
      type: petType,
      age: calculateAge(birthDate),
      image: imageUrl,
      birthDate: birthDate.toISOString(),
      ownerId: 8,
    };

    try {
      await axiosSecure.post("/pet/addPet", payload);
      Alert.alert("Success", "Pet registered successfully!");
      setPetName("");
      setPetType("Dog");
      setBirthDate(new Date());
      setImageUri(null);
    } catch (error) {
      console.error("Submit error:", error);
      Alert.alert("Error", "Failed to submit pet data.");
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "#f5deda", flex: 1 }}>
      <View
        style={{
          margin: 16,
          backgroundColor: "#fff",
          borderRadius: 16,
          padding: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 6,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16, color: "#af8d66" }}>
          🐾 Register Your Pet
        </Text>

        <Text style={{ marginBottom: 4 }}>Pet Name</Text>
        <TextInput
          value={petName}
          onChangeText={setPetName}
          placeholder="Enter pet name"
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            marginBottom: 16,
            padding: 10,
            borderRadius: 10,
            backgroundColor: "#fff",
          }}
        />

        <Text style={{ marginBottom: 4 }}>Pet Type</Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 10,
            marginBottom: 16,
            overflow: "hidden",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Picker selectedValue={petType} onValueChange={setPetType}>
            <Picker.Item label="Dog" value="Dog" />
            <Picker.Item label="Cat" value="Cat" />
          </Picker>
        </View>

        <Text style={{ marginBottom: 4 }}>Birthdate</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={{
            padding: 12,
            backgroundColor: "#4f46e5",
            borderRadius: 10,
            marginBottom: 16,
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>
            {birthDate.toDateString()}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="default"
            onChange={onDateChange}
            maximumDate={new Date()}
            accentColor="#af8d66"
            themeVariant="light"
          />
        )}

        <Text style={{ marginBottom: 8 }}>Pet Image</Text>

        {!imageUri ? (
          <TouchableOpacity
            onPress={pickImage}
            style={{
              borderWidth: 2,
              borderStyle: "dashed",
              borderColor: "#af8d66",
              padding: 30,
              alignItems: "center",
              borderRadius: 12,
              marginBottom: 16,
              backgroundColor: "#fff9f6",
            }}
          >
            <Ionicons name="image-outline" size={32} color="#af8d66" />
            <Text style={{ marginTop: 8, color: "#af8d66", fontWeight: "600" }}>
              Tap to add image
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={pickImage}
            style={{
              position: "relative",
              marginBottom: 16,
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <Image
              source={{ uri: imageUri }}
              style={{ width: "100%", height: 200 }}
              resizeMode="cover"
            />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
                padding: 10,
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>Change Image</Text>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: "#16a34a",
            padding: 14,
            borderRadius: 10,
            marginTop: 8,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16, textAlign: "center" }}>
            Submit Pet
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PetRegister;
