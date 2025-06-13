import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useAxiosSecure } from "@/lib/axiosSecure";

const PetProfile: React.FC = () => {
  const axiosSecure = useAxiosSecure();
  const { pet } = useLocalSearchParams();

  const [petData, setPetData] = useState<any>(null);
  const [vaccineSchedule, setVaccineSchedule] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVaccine, setSelectedVaccine] = useState<any>(null);
  const [vetNameInput, setVetNameInput] = useState("");

  useEffect(() => {
    try {
      const parsed = pet ? JSON.parse(decodeURIComponent(pet as string)) : null;
      setPetData(parsed);
    } catch (err) {
      console.error("Invalid pet param", err);
      setError("Invalid pet data.");
      setLoading(false);
    }
  }, [pet]);

  const fetchVaccineSchedule = async () => {
    if (!petData?.id) return;
    setLoading(true);
    try {
      const response = await axiosSecure.get(`/vaccine/schedule/${petData.id}`);
      setVaccineSchedule(response.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch vaccine schedule", err);
      setError("Failed to load vaccine schedule.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVaccineSchedule();
  }, [petData]);

  const openModal = (vaccine: any) => {
    setSelectedVaccine(vaccine);
    setVetNameInput("");
    setModalVisible(true);
  };

  const submitVaccineLog = async () => {
    if (!vetNameInput.trim()) {
      Alert.alert("Validation", "Please enter the veterinarian's name.");
      return;
    }

    try {
      await axiosSecure.post("/vaccine/updateVaccineLog", {
        petId: petData.id,
        vaccineId: selectedVaccine.vaccineId,
        vetName: vetNameInput,
        administeredOn: new Date().toISOString(),
      });

      Alert.alert("Success", "Vaccine log added successfully!");
      setModalVisible(false);
      fetchVaccineSchedule(); // Refresh the schedule after logging vaccine
    } catch (err) {
      console.error("Failed to add vaccine log", err);
      Alert.alert("Error", "Failed to log vaccine. Please try again.");
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#f5deda]">
        <ActivityIndicator size="large" />
        <Text className="mt-4 text-base text-gray-700">Loading...</Text>
      </View>
    );
  }

  if (error || !petData) {
    return (
      <View className="flex-1 justify-center items-center bg-[#f5deda]">
        <Text className="text-red-500 text-lg">{error || "Invalid or missing pet data."}</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView className="flex-1 bg-[#f5deda]">
        <View className="items-center p-6">
          <Image
            source={{ uri: petData.image }}
            className="w-48 h-48 rounded-full border-4 border-[#af8d66] mb-4"
          />
          <Text className="text-3xl font-bold text-[#4f46e5]">{petData.name}</Text>
          <Text className="text-lg text-gray-700 mt-1">Species: {petData.type}</Text>
          <Text className="text-lg text-gray-700">Age: {petData.age} years</Text>
          <Text className="text-lg text-gray-700">
            Birth Date: {new Date(petData.birthDate).toLocaleDateString()}
          </Text>

          <Text className="text-2xl font-semibold text-[#16a34a] mt-8 mb-4">Vaccine Schedule</Text>

          {vaccineSchedule.length === 0 ? (
            <Text className="text-base text-gray-500">No vaccine schedule found.</Text>
          ) : (
            vaccineSchedule.map((vaccine, index) => (
              <TouchableOpacity
                key={index}
                className="w-full bg-white p-4 rounded-2xl shadow mb-4"
                onPress={() => openModal(vaccine)}
              >
                <Text className="text-lg font-bold text-[#6366f1]">{vaccine.vaccineId}</Text>
                <Text className="text-sm text-gray-700 mt-1">
                  {(() => {
                    const dueDate = new Date(vaccine.nextDueDate);
                    const today = new Date();
                    const diffInMs = dueDate.getTime() - today.getTime();
                    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
                    const formatted = dueDate.toLocaleDateString();

                    if (diffInDays > 7) {
                      const weeks = Math.floor(diffInDays / 7);
                      return `Due on ${formatted} (${weeks} week${weeks > 1 ? "s" : ""} left)`;
                    } else if (diffInDays >= 0) {
                      return `Due on ${formatted} (${diffInDays} day${diffInDays > 1 ? "s" : ""} left)`;
                    } else {
                      return `Was due on ${formatted} (overdue by ${Math.abs(diffInDays)} day${Math.abs(diffInDays) > 1 ? "s" : ""})`;
                    }
                  })()}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      {/* Modal for vetName input and confirm */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white rounded-2xl p-6 w-80">
            <Text className="text-xl font-semibold mb-4">Record Vaccine Injection</Text>
            <Text className="mb-2">Vaccine: {selectedVaccine?.vaccineId}</Text>

            <TextInput
              placeholder="Enter veterinarian's name"
              value={vetNameInput}
              onChangeText={setVetNameInput}
              className="border border-gray-300 rounded-md px-4 py-2 mb-4"
              autoFocus
            />

            <View className="flex-row justify-between">
              <Pressable
                className="bg-gray-300 px-4 py-2 rounded-md"
                onPress={() => setModalVisible(false)}
              >
                <Text>Cancel</Text>
              </Pressable>

              <Pressable
                className="bg-[#16a34a] px-4 py-2 rounded-md"
                onPress={submitVaccineLog}
              >
                <Text className="text-white font-semibold">Confirm Injection</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default PetProfile;
