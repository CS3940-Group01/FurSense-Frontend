import React, { useState } from "react";
import { View, Text, TextInput, Button, Platform, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAxiosSecure } from "@/lib/axiosSecure";

const PetRegister: React.FC = () => {
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("Dog");
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const axiosSecure = useAxiosSecure();

  const onDateChange = (event: any, selectedDate?: Date) => {
    // On Android, dismiss the picker after selection
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setBirthDate(selectedDate);
    }
  };

  const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  return today.getFullYear() - birthDate.getFullYear();
};

  const handleSubmit = async () => {
    if (!petName.trim()) {
      Alert.alert("Validation", "Please enter your pet's name.");
      return;
    }

    const payload = {
      name: petName,
      type: petType,
      age:calculateAge(birthDate),
      birthDate: birthDate.toISOString(),
      ownerId: 8
    };

    console.log("Payload to send:", payload);

    
    
    try {
       const response = await axiosSecure.post("/pet/addPet", payload);
      

      
      console.log("Server response:", response.data);
      Alert.alert("Success", "Pet registered successfully!");

      setPetName("");
      setPetType("Dog");
      setBirthDate(new Date());
    } catch (error) {
      console.error("Error submitting pet data:", error);
      Alert.alert("Error", "Failed to submit pet data.");
    }
    
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Register Your Pet</Text>

      <Text>Pet Name</Text>
      <TextInput
        value={petName}
        onChangeText={setPetName}
        placeholder="Enter pet name"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          marginBottom: 12,
          padding: 8,
          borderRadius: 8,
        }}
      />

      <Text>Pet Type</Text>
      <Picker
        selectedValue={petType}
        onValueChange={(itemValue) => setPetType(itemValue)}
        style={{ height: 50, marginBottom: 12 }}
      >
        <Picker.Item label="Dog" value="Dog" />
        <Picker.Item label="Cat" value="Cat" />
      </Picker>

      <Text>Birthdate</Text>
      <Button title={birthDate.toDateString()} onPress={() => setShowDatePicker(true)} />

      {showDatePicker && (
        <DateTimePicker
          value={birthDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "calendar"}
          onChange={onDateChange}
          maximumDate={new Date()}
        />
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Submit Pet" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default PetRegister;
