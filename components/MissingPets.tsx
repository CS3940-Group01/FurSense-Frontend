import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ImageSourcePropType,
  Alert,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

import { missingPetImages } from '@/assets/constants/MissingPets';
import MissingModal from './MissingModal';

const { width } = Dimensions.get('window');
const STORY_WIDTH = 90;
const STORY_HEIGHT = 160;

interface MissingPet {
  id: string;
  uri: ImageSourcePropType;
}

const MissingPets: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageSourcePropType | null>(null);
  const [missingList, setMissingList] = useState<MissingPet[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    // Add a fake 'Add' card at the beginning
    const addButton: MissingPet = { id: 'add', uri: require('../assets/images/app-icon.png') };
    setMissingList([addButton, ...missingPetImages]);
  }, []);

  const handleImageSelect = (uri: any, index: number) => {
    setSelectedImage(uri);
    setSelectedIndex(index);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (selectedIndex !== null) {
      let newIndex = direction === 'left' ? selectedIndex - 1 : selectedIndex + 1;
      if (newIndex >= 0 && newIndex < missingList.length) {
        setSelectedImage(missingList[newIndex].uri);
        setSelectedIndex(newIndex);
      }
    }
  };

  const pickAndUploadImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3,4],
      quality: 1,
    });

    if (result.canceled) return;

    const localUri = result.assets[0].uri;

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: localUri,
        type: 'image/jpeg',
        name: 'missing_pet.jpg',
      } as any);
      formData.append('upload_preset', 'unsigned_pets');
      formData.append('folder', 'missingPets');

      const cloudinaryRes = await axios.post(
        'https://api.cloudinary.com/v1_1/dwtwqhvdv/image/upload',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      const newPet: MissingPet = {
        id: (missingList.length + 1).toString(),
        uri: { uri: cloudinaryRes.data.secure_url },
      };

      setMissingList((prev) => [...prev, newPet]);
    } catch (error) {
      console.error('Upload failed:', error);
      Alert.alert('Error', 'Failed to upload image.');
    }
  };

  return (
    <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', flex: 1 }}>Missing Pets</Text>
      </View>

      <FlatList
        data={missingList}
        renderItem={({ item, index }) => {
          if (item.id === 'add') {
            return (
              <TouchableOpacity onPress={pickAndUploadImage}>
                <View
                  style={{
                    width: STORY_WIDTH,
                    height: STORY_HEIGHT,
                    marginHorizontal: 5,
                    borderRadius: 10,
                    backgroundColor: '#f5deda',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: '#af8d66',
                  }}
                >
                  <Ionicons name="add" size={36} color="#af8d66" />
                  <Text style={{ fontSize: 12, color: '#af8d66', marginTop: 4 }}>Add</Text>
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity onPress={() => handleImageSelect(item.uri, index)}>
              <Image
                source={item.uri as ImageSourcePropType}
                style={{
                  width: STORY_WIDTH,
                  height: STORY_HEIGHT,
                  marginHorizontal: 5,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <MissingModal
        setSelectedImage={setSelectedImage}
        selectedImage={selectedImage}
        onSwipe={handleSwipe}
        missingList={missingList}
        selectedIndex={selectedIndex}
      />
    </View>
  );
};

export default MissingPets;
