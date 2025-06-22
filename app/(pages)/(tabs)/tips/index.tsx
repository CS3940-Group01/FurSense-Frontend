import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

// Add your images
const PET_IMAGES: Record<string, any> = {
  Dog: require("../../../../assets/images/petTips/dog.jpeg"),
  Cat: require("../../../../assets/images/petTips/cat.jpeg"),
  Parrot: require("../../../../assets/images/petTips/parrot.jpg"),
  Rabbit: require("../../../../assets/images/petTips/rabbit.jpg"),
  Goldfish: require("../../../../assets/images/petTips/goldfish.jpeg"),
  Pigeon: require("../../../../assets/images/petTips/pigeon.jpg"),
  // Hamster: require("../../../../assets/images/petTips/hamster.jpeg"),
  // Tortoise: require("../../../../assets/images/petTips/tortoise.jpeg"),
  // Pig: require("../../../../assets/images/petTips/pig.jpeg"),
};

const petTips = [
  {
    type: "Dog",
    name: "Happy & Healthy Dogs: Care Essentials",
  },
  {
    type: "Cat",
    name: "How to Keep Your Cat Happy?",
  },
  {
    type: "Parrot",
    name: "Parrot Health & Enrichment Essentials",
  },
  {
    type: "Rabbit",
    name: "Rabbits: Diet, Space & Safety",
  },
  {
    type: "Goldfish",
    name: "Goldfish Tank Maintenance & Well-being",
  },
  {
    type: "Pigeon",
    name: "Caring for Your Feathered Friend",
  },
  // {
  //   type: "Hamster",
  //   tips: [
  //     /* tips here */
  //   ],
  // },
  // {
  //   type: "Tortoise",
  //   tips: [
  //     /* tips here */
  //   ],
  // },
  // {
  //   type: "Pig",
  //   tips: [
  //     /* tips here */
  //   ],
  // },
];

const funFacts: Record<string, string[]> = {
  Dog: [
    "Dogs can learn over 1000 words!",
    "A dog’s sense of smell is 40x stronger than ours.",
  ],
  Cat: [
    "Cats sleep nearly 70% of their lives.",
    "A group of cats is called a clowder.",
  ],
  Parrot: [
    "Some parrots can mimic human speech.",
    "Parrots are highly intelligent and can solve puzzles and use tools.",
  ],
  Rabbit: [
    "Rabbits purr when they’re happy!",
    "Their teeth never stop growing.",
  ],
  Goldfish: [
    "Goldfish have 3-month memories!",
    "Some fish can recognize their owners.",
  ],
  Pigeon: [
    "Pigeons can recognize themselves in mirrors—just like dolphins and apes!",
    "They were used as message carriers in World War I and II.",
  ],
  // Hamster: [
  //   "Hamsters run up to 5 miles at night.",
  //   "They hoard food in their cheek pouches.",
  // ],
  // Tortoise: [
  //   "Tortoises can live over 100 years!",
  //   "They can survive without food for weeks.",
  // ],
  // Pig: [
  //   "Guinea pigs need vitamin C daily!",
  //   "They communicate using over 10 sounds.",
  // ],
};

type PetType = keyof typeof funFacts;

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 48;

const FlipCard = ({ pet, image }) => {
  const [flipped, setFlipped] = useState(false);
  const animatedValue = useState(new Animated.Value(0))[0];
  const router = useRouter();

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const flipCard = () => {
    if (flipped) {
      Animated.spring(animatedValue, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 10,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        useNativeDriver: true,
        friction: 8,
        tension: 10,
      }).start();
    }
    setFlipped(!flipped);
  };

  const cardHeight = 220;

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() => router.push(`/tips/${pet.type.toLowerCase()}`)} // Navigate to tips/dog etc.
      onLongPress={flipCard} // Flip on long press
      className="mb-9"
    >
      <View
        style={{ height: cardHeight, width: CARD_WIDTH, alignSelf: "center" }}
      >
        {/* Front Side */}
        <Animated.View
          style={{
            transform: [{ rotateY: frontInterpolate }],
            position: "absolute",
            width: "100%",
            height: cardHeight,
            backfaceVisibility: "hidden",
            overflow: "hidden",
            borderWidth: 4,
            borderColor: "#8d6e63",
            borderRadius: 40,
            backgroundColor: "#fff",
            shadowColor: "#6e4c30",
            shadowOpacity: 0.18,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 8 },
            elevation: 7,
          }}
        >
          <Image
            source={image}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 32,
              opacity: 0.93,
              position: "absolute",
              top: 0,
              left: 0,
            }}
            resizeMode="cover"
          />
          <View
            className="flex-1 w-full h-full justify-end items-center px-2 pb-8"
            style={{
              backgroundColor: "rgba(60,40,20,0.18)",
              borderRadius: 32,
            }}
          >
            <Text
              className="text-white text-2xl font-extrabold text-center mb-2"
              style={{
                textShadowColor: "#000",
                textShadowOffset: { width: 1, height: 2 },
                textShadowRadius: 12,
                letterSpacing: 2,
                backgroundColor: "rgba(60,40,20,0.38)",
                borderRadius: 16,
                paddingHorizontal: 16,
                paddingVertical: 6,
              }}
            >
              {pet.name}
            </Text>
            <Text className="text-white text-base mt-2 opacity-90 text-center italic">
              Tap to open tips page
            </Text>
            <Text className="text-white text-base mt-2 opacity-90 text-center italic">
              Hold to see funfacts
            </Text>
          </View>
        </Animated.View>

        {/* Back Side */}
        <Animated.View
          style={{
            transform: [{ rotateY: backInterpolate }],
            position: "absolute",
            width: "100%",
            height: cardHeight,
            backfaceVisibility: "hidden",
            overflow: "hidden",
            borderWidth: 4,
            borderColor: "#8d6e63",
            borderRadius: 40,
            backgroundColor: "#e9c9a2",
            shadowColor: "#6e4c30",
            shadowOpacity: 0.18,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 8 },
            elevation: 7,
          }}
        >
          <View className="flex-1 p-7 justify-center w-full h-full">
            <Text
              className="text-2xl font-extrabold text-[#6e4c30] mb-4 text-center tracking-wide"
              style={{
                letterSpacing: 1.5,
                backgroundColor: "#f5e6d6",
                borderRadius: 12,
                paddingVertical: 6,
                marginBottom: 18,
              }}
            >
              Did you know?
            </Text>
            {funFacts[pet.type as PetType].map((fact, idx) => (
              <View key={idx} className="flex-row items-start mb-2">
                <Text className="text-[#3e2723] mr-2 text-lg">•</Text>
                <Text className="text-base text-[#3e2723] leading-6 font-medium flex-1">
                  {fact}
                </Text>
              </View>
            ))}

            <Text className="text-[#8d6e63] text-base mt-2 opacity-80 text-center italic">
              Tap to see full tips
            </Text>
          </View>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const Tips = () => {
  return (
    <ScrollView
      className="flex-1 bg-[#f5deda] px-2 pt-8"
      contentContainerStyle={{ paddingBottom: 64 }}
    >
      <Text
        className="text-4xl font-extrabold text-[#ffffff] mb-8 text-center tracking-widest"
        style={{
          letterSpacing: 4,
          backgroundColor: "#6e4c30",
          borderRadius: 18,
          paddingVertical: 10,
          marginHorizontal: 12,
          marginBottom: 32,
        }}
      >
        Pet Care Tips
      </Text>
      {petTips.map((pet) => (
        <FlipCard key={pet.type} pet={pet} image={PET_IMAGES[pet.type]} />
      ))}
    </ScrollView>
  );
};

export default Tips;
