import React, { useEffect, useState } from "react";
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

interface Vaccine {
  id: string;
  name: string;
  // add other fields as needed
}

interface VaccineWithDates extends Vaccine {
  lastGivenDate: Date | null;
  nextDueDate: Date | null;
}

const PetRegister: React.FC = () => {
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("Dog");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDatePickerIndex, setShowDatePickerIndex] = useState<number | null>(null);

  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [vaccinesWithDates, setVaccinesWithDates] = useState<VaccineWithDates[]>([]);

  const axiosSecure = useAxiosSecure();

  // Sync vaccinesWithDates whenever vaccines change
  useEffect(() => {
    const initVaccinesWithDates = vaccines.map((v) => ({
      ...v,
      lastGivenDate: null,
      nextDueDate: null,
    }));
    setVaccinesWithDates(initVaccinesWithDates);
  }, [vaccines]);

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const response = await axiosSecure.get(`/vaccine/getVaccinesBySpecies`, {
          params: { species: petType },
        });
        setVaccines(response.data);
      } catch (error) {
        console.error("Error fetching vaccines:", error);
      }
    };

    fetchVaccines();
  }, [petType]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
    if (!petName.trim()) {
      return Alert.alert("Validation", "Please enter your pet's name.");
    }
    if (!imageUri) {
      return Alert.alert("Validation", "Please pick an image.");
    }

    const imageUrl = await uploadToCloudinary(imageUri);
    if (!imageUrl) {
      return Alert.alert("Error", "Image upload failed.");
    }

    // Prepare pet payload
    const petPayload = {
      name: petName,
      type: petType,
      age: calculateAge(birthDate),
      image: imageUrl,
      birthDate: birthDate.toISOString(),
      ownerId: 8,
    };

    try {
      // 1. Add pet and get petId from response
      const petResponse = await axiosSecure.post("/pet/addPet", petPayload);
      const petId = petResponse.data.id; // Adjust if backend returns differently

      // 2. Prepare vaccine schedule payload
      const today = new Date();
      const petVaccineSchedulePayload = vaccinesWithDates.map((v) => {
        let nextDueDate: Date;

        if (v.lastGivenDate) {
          nextDueDate = new Date(v.lastGivenDate);
          nextDueDate.setFullYear(nextDueDate.getFullYear() + 1);
        } else {
          nextDueDate = new Date(today);
          nextDueDate.setDate(today.getDate() + 14); // +2 weeks from today
        }

        return {
          petId: petId,
          vaccineId: v.id,
          nextDueDate: nextDueDate.toISOString().split("T")[0], // "YYYY-MM-DD"
        };
      });

      // 3. Add vaccine schedules

      console.log("petVaccineSchedulePayload", petVaccineSchedulePayload);
      
      await axiosSecure.post("/vaccine/addSchedules", petVaccineSchedulePayload);

      Alert.alert("Success", "Pet and vaccine schedules registered successfully!");

      // Reset form
      setPetName("");
      setPetType("Dog");
      setBirthDate(new Date());
      setImageUri(null);
      setVaccinesWithDates((prev) =>
        prev.map((v) => ({ ...v, lastGivenDate: null, nextDueDate: null }))
      );
    } catch (error) {
      console.error("Submit error:", error);
      Alert.alert("Error", "Failed to submit pet data or vaccine schedule.");
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

        {vaccinesWithDates.map((vaccine, index) => (
          <View key={vaccine.id} style={{ marginBottom: 16 }}>
            <Text style={{ fontWeight: "600", marginBottom: 6 }}>{vaccine.name}</Text>

            <TouchableOpacity
              onPress={() => setShowDatePickerIndex(index)}
              style={{ padding: 10, backgroundColor: "#6366f1", borderRadius: 8 }}
            >
              <Text style={{ color: "#fff" }}>
                {vaccine.lastGivenDate
                  ? `Last Given: ${vaccine.lastGivenDate.toDateString()}`
                  : "Pick Last Given Date"}
              </Text>
            </TouchableOpacity>

            <Text style={{ marginTop: 6 }}>
              Next Due:{" "}
              {vaccine.nextDueDate
                ? vaccine.nextDueDate.toDateString()
                : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toDateString()}
            </Text>

            {showDatePickerIndex === index && (
              <DateTimePicker
                value={vaccine.lastGivenDate || new Date()}
                mode="date"
                display="default"
                maximumDate={new Date()}
                onChange={(event, selectedDate) => {
                  if (Platform.OS === "android") setShowDatePickerIndex(null);
                  if (!selectedDate) return;

                  const updatedVaccines = [...vaccinesWithDates];
                  updatedVaccines[index].lastGivenDate = selectedDate;

                  // Automatically calculate nextDueDate +1 year from lastGivenDate
                  const nextDue = new Date(selectedDate);
                  nextDue.setFullYear(nextDue.getFullYear() + 1);
                  updatedVaccines[index].nextDueDate = nextDue;

                  setVaccinesWithDates(updatedVaccines);
                }}
                accentColor="#af8d66"
                themeVariant="light"
              />
            )}
          </View>
        ))}

        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: "#af8d66",
            padding: 16,
            borderRadius: 12,
            alignItems: "center",
            marginTop: 16,
          }}
          disabled={imageUploading}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            {imageUploading ? "Uploading Image..." : "Register Pet"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PetRegister;
