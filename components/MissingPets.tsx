import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { View, Image, FlatList, Modal, TouchableOpacity, Dimensions, ImageSourcePropType } from 'react-native';
import { missingPetImages } from '@/assets/constants/MissingPets';
import MissingModal from './MissingModal';

const { width } = Dimensions.get('window');
const STORY_WIDTH = 90;
const STORY_HEIGHT = 160;

interface MissingPet {
    id: string;
    uri: any; 
}

const MissingPets: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<ImageSourcePropType | null>(null);
    const [missingList, setMissingList] = useState<MissingPet[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    useEffect(() => {
        console.log("MissingPetImages:", missingPetImages);
        
        setMissingList(missingPetImages);
    },[])

    const handleImageSelect = (uri: any, index: number) => {
        setSelectedImage(uri);
        setSelectedIndex(index);  // Store the index of the selected image
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

    return (
        <View>
            <FlatList
                data={missingList}
                renderItem={({ item, index }: { item: MissingPet, index: number }) => (
                    <TouchableOpacity onPress={() => handleImageSelect(item.uri, index)}>
                        <Image 
                            source={item.uri} 
                            style={{ width: STORY_WIDTH, height: STORY_HEIGHT, marginHorizontal: 5, borderRadius: 10 }} 
                        />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
            />

            {/* Full-Screen Modal */}
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
