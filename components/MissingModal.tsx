import React from 'react';
import { Modal, Image, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

interface MissingModalProps {
    selectedImage: any;
    setSelectedImage: React.Dispatch<React.SetStateAction<any>>;
    onSwipe: (direction: 'left' | 'right') => void;
    missingList: { uri: any, id: string }[];
    selectedIndex: number | null;
}

const MissingModal: React.FC<MissingModalProps> = ({ selectedImage, setSelectedImage, onSwipe, missingList, selectedIndex }) => {
    return (
        <Modal
            visible={selectedImage !== null}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setSelectedImage(null)}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                <View style={{ width: '90%', height: '80%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={selectedImage}
                        style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                    />
                    <View style={{ position: 'absolute', top: '50%', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <TouchableOpacity onPress={() => onSwipe('left')} style={{ padding: 10 }}>
                        <FontAwesomeIcon icon={faChevronCircleLeft} size={16} color="#af8d66" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onSwipe('right')} style={{ padding: 10 }}>
                        <FontAwesomeIcon icon={faChevronCircleRight} size={16} color="#af8d66" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default MissingModal;
