import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  Switch,
  TextInput,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function FindVet() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [places, setPlaces] = useState<
    { id: string; lat: number; lon: number; tags?: { name?: string; amenity?: string } }[]
  >([]);
  const [loading, setLoading] = useState(false);

  
  const [includePharmacies, setIncludePharmacies] = useState(false);
  const [includeVeterinary, setIncludeVeterinary] = useState(false);

  
  const [radius, setRadius] = useState("1000"); 

  const fetchPlaces = async () => {
    if (!includePharmacies && !includeVeterinary) {
      Alert.alert("Error", "Please select at least one option (Pharmacies or Veterinary).");
      return;
    }

    if (!radius.trim() || isNaN(Number(radius)) || Number(radius) <= 0) {
      Alert.alert("Error", "Please enter a valid radius.");
      return;
    }

    setLoading(true);

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permission is required");
        setLoading(false);
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      // Construct dynamic query based on selected options
      let query = `[out:json];(`;
      if (includePharmacies) {
        query += `node["amenity"="pharmacy"](around:${radius},${loc.coords.latitude},${loc.coords.longitude});`;
      }
      if (includeVeterinary) {
        query += `node["amenity"="veterinary"](around:${radius},${loc.coords.latitude},${loc.coords.longitude});`;
      }
      query += `);out body;`;

      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
      });
      const data = await response.json();
      setPlaces(data.elements);
    } catch (error) {
      Alert.alert("Error", "Failed to load nearby places");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      {/* Toggle Options */}
      <View className="p-4 bg-gray-100">
        <View className="flex-row justify-between items-center ">
          <Text className="text-lg font-bold">Pharmacies</Text>
            <Switch
              value={includePharmacies}
              onValueChange={setIncludePharmacies}
              trackColor={{ false: "#ccc", true: "#f5deda" }} 
              thumbColor={includePharmacies ? "#6e4c30" : "#f4f3f4"} 
            />
        </View>
        <View className="flex-row justify-between items-center ">
          <Text className="text-lg font-bold">Veterinary</Text>
          <Switch
            value={includeVeterinary}
            onValueChange={setIncludeVeterinary}
            trackColor={{ false: "#ccc", true: "#f5deda" }} 
            thumbColor={includeVeterinary ? "#6e4c30" : "#f4f3f4"} 
          />
        </View>

        {/* Radius Input */}
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-bold">Radius (meters):</Text>
          <TextInput
            className="h-10 border border-gray-300 rounded px-2 bg-white w-24"
            value={radius}
            onChangeText={setRadius}
            placeholder="Enter radius"
            keyboardType="numeric"
            style={{
              textAlignVertical: "center", 
              paddingVertical: 0,        
            }}
          />
        </View>

        <TouchableOpacity className="bg-[#6e4c30] p-3 rounded items-center mt-8" onPress={fetchPlaces}>
          <Text className="text-white font-bold text-lg">Search</Text>
        </TouchableOpacity>
      </View>

      {/* Map */}
      {location && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location?.latitude || 37.7749,
            longitude: location?.longitude || -122.4194,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation
        >
          {places.map((place) => (
            <Marker
              key={place.id}
              coordinate={{ latitude: place.lat, longitude: place.lon }}
              title={place.tags?.name || "Unnamed"}
              description={place.tags?.amenity}
            />
          ))}
        </MapView>
      )}
    </View>
  );
}