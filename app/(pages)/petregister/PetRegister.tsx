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
  const [showDatePickerIndex, setShowDatePickerIndex] = useState<number | null>(
    null
  );
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [vaccinesWithDates, setVaccinesWithDates] = useState<
    VaccineWithDates[]
  >([]);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const response = await axiosSecure.get(
          `/vaccine/getVaccinesBySpecies`,
          {
            params: { species: petType },
          }
        );
        setVaccines(response.data);
      } catch (error) {
        console.error("Error fetching vaccines:", error);
      }
    };
    fetchVaccines();
  }, [petType]);

  useEffect(() => {
    const init = vaccines.map((v) => ({
      ...v,
      lastGivenDate: null,
      nextDueDate: null,
    }));
    setVaccinesWithDates(init);
  }, [vaccines]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) setImageUri(result.assets[0].uri);
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

  const calculateAge = (birthDate: Date): number =>
    new Date().getFullYear() - birthDate.getFullYear();

  const handleSubmit = async () => {
    if (!petName.trim())
      return Alert.alert("Validation", "Please enter your pet's name.");
    if (!imageUri) return Alert.alert("Validation", "Please pick an image.");

    const imageUrl = await uploadToCloudinary(imageUri);
    if (!imageUrl) return Alert.alert("Error", "Image upload failed.");

    const petPayload = {
      name: petName,
      type: petType,
      age: calculateAge(birthDate),
      image: imageUrl,
      birthDate: birthDate.toISOString(),
      // ownerId: 8,
    };

    try {
      const petResponse = await axiosSecure.post("/pet/addPet", petPayload);
      const petId = petResponse.data.id;

      const today = new Date();
      const schedulePayload = vaccinesWithDates.map((v) => {
        const nextDue = v.lastGivenDate
          ? new Date(
              v.lastGivenDate.getFullYear() + 1,
              v.lastGivenDate.getMonth(),
              v.lastGivenDate.getDate()
            )
          : new Date(today.setDate(today.getDate() + 14));

        return {
          petId,
          vaccineId: v.id,
          nextDueDate: nextDue.toISOString().split("T")[0],
        };
      });

      await axiosSecure.post("/vaccine/addSchedules", schedulePayload);

      Alert.alert("Success", "Pet and vaccines registered!");

      setPetName("");
      setPetType("Dog");
      setBirthDate(new Date());
      setImageUri(null);
      setVaccinesWithDates(
        vaccines.map((v) => ({ ...v, lastGivenDate: null, nextDueDate: null }))
      );
    } catch (error) {
      console.error("Submit error:", error);
      Alert.alert("Error", "Failed to save data.");
    }
  };

  return (
    <ScrollView className="bg-[#f5deda] flex-1">
      <View className="m-4 p-5 bg-white rounded-2xl shadow-lg">
        <Text className="text-2xl font-bold text-[#af8d66] mb-5">
          🐾 Register Your Pet
        </Text>

        {/* Pet Name */}
        <Text className="mb-1 text-gray-700">Pet Name</Text>
        <TextInput
          value={petName}
          onChangeText={setPetName}
          placeholder="Enter pet name"
          className="border border-gray-300 p-3 rounded-xl bg-white mb-4"
        />

        {/* Pet Type */}
        <Text className="mb-1 text-gray-700">Pet Type</Text>
        <View className="border border-gray-300 rounded-xl mb-4 bg-gray-100 overflow-hidden">
          <Picker selectedValue={petType} onValueChange={setPetType}>
            <Picker.Item label="Dog" value="Dog" />
            <Picker.Item label="Cat" value="Cat" />
          </Picker>
        </View>

        {/* Birthdate */}
        <Text className="mb-1 text-gray-700">Birthdate</Text>

        <View className="flex-row items-center justify-between bg-[#fff7f4] border border-[#f0e0da] p-3 rounded-xl mb-4">
          <View className="flex-row items-center space-x-2">
            <Ionicons name="calendar-outline" size={20} color="#af8d66" />
            <Text className="text-[#af8d66] ml-2 font-medium">
              {birthDate.toDateString()}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="bg-[#af8d66] px-10 py-2 rounded-lg"
          >
            <Text className="text-white font-semibold">Change</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              if (Platform.OS === "android") setShowDatePicker(false);
              if (selectedDate) setBirthDate(selectedDate);
            }}
            maximumDate={new Date()}
          />
        )}

        {/* Image Upload */}
        <Text className="mb-2 text-gray-700">Pet Image</Text>
        {!imageUri ? (
          <TouchableOpacity
            onPress={pickImage}
            className="border-2 border-dashed border-[#af8d66] p-8 items-center rounded-xl mb-4 bg-[#fff9f6]"
          >
            <Ionicons name="image-outline" size={32} color="#af8d66" />
            <Text className="mt-2 text-[#af8d66] font-semibold">
              Tap to add image
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={pickImage}
            className="relative mb-4 rounded-xl overflow-hidden"
          >
            <Image
              source={{ uri: imageUri }}
              className="w-full h-52"
              resizeMode="cover"
            />
            <View className="absolute bottom-0 w-full bg-black/50 p-2">
              <Text className="text-white text-center">Change Image</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Vaccine Schedules */}
        {vaccinesWithDates.map((vaccine, index) => (
          <View
            key={vaccine.id}
            className="bg-white p-4 rounded-2xl shadow-sm mb-5 border border-[#f5deda]"
          >
            <View className="flex-row items-center mb-3">
              <Ionicons name="medkit-outline" size={20} color="#af8d66" />
              <Text className="ml-2 text-lg font-semibold text-[#af8d66]">
                {vaccine.name}
              </Text>
            </View>

            <View className="flex-row justify-between space-x-3">
              <View className="flex-1">
                <Text className="text-sm text-gray-600 mb-1">Last Given</Text>
                <TouchableOpacity
                  onPress={() => setShowDatePickerIndex(index)}
                  className="bg-[#af8d66] py-2 mr-2 rounded-xl items-center"
                >
                  <Ionicons name="calendar-outline" size={18} color="white" />
                  <Text className="text-white ml-2 font-medium text-sm">
                    {vaccine.lastGivenDate
                      ? vaccine.lastGivenDate.toDateString()
                      : "Select Date"}
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex-1">
                <Text className="text-sm text-gray-600 mb-1">Next Due</Text>
                <View className="bg-gray-200 py-2 rounded-xl items-center">
                  <Ionicons name="alarm-outline" size={18} color="#6b7280" />
                  <Text className="text-gray-700 ml-2 font-medium text-sm">
                    {vaccine.nextDueDate
                      ? vaccine.nextDueDate.toDateString()
                      : new Date(Date.now() + 14 * 86400000).toDateString()}
                  </Text>
                </View>
              </View>
            </View>

            {showDatePickerIndex === index && (
              <View className="mt-3">
                <DateTimePicker
                  value={vaccine.lastGivenDate || new Date()}
                  mode="date"
                  display="default"
                  maximumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    if (Platform.OS === "android") setShowDatePickerIndex(null);
                    if (!selectedDate) return;

                    const updated = [...vaccinesWithDates];
                    updated[index].lastGivenDate = selectedDate;

                    const due = new Date(selectedDate);
                    due.setFullYear(due.getFullYear() + 1);
                    updated[index].nextDueDate = due;

                    setVaccinesWithDates(updated);
                  }}
                />
              </View>
            )}
          </View>
        ))}

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-[#af8d66] p-4 rounded-xl items-center mt-4"
          disabled={imageUploading}
        >
          <Text className="text-white font-bold text-lg">
            {imageUploading ? "Uploading Image..." : "Register Pet"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PetRegister;
