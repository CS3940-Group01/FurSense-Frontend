import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Animated, Dimensions } from "react-native";

// Add your images to assets/images/ and update the paths below
const PET_IMAGES: Record<string, any> = {
  Dog: require("../../../assets/images/petTips/dog.jpeg"),
  Cat: require("../../../assets/images/petTips/cat.jpeg"),
  Bird: require("../../../assets/images/petTips/bird.jpeg"),
  Rabbit: require("../../../assets/images/petTips/rabbit.jpg"),
  Fish: require("../../../assets/images/petTips/fish.jpeg"),
  Hamster: require("../../../assets/images/petTips/hamster.jpeg"),
  Tortoise: require("../../../assets/images/petTips/tortoise.jpeg"),
  Pig: require("../../../assets/images/petTips/pig.jpeg"),
};

const petTips = [
  {
    type: "Dog",
    tips: [
      "Exercise and play with your dog every day.",
      "Feed balanced meals and fresh water daily.",
      "Groom your dog and check for fleas often.",
      "Visit the vet once a year for a checkup.",
    ]
  },
  {
    type: "Cat",
    tips: [
      "Scoop the litter box and keep it clean daily.",
      "Provide scratching posts and fun toys to play.",
      "Feed high-quality food and fresh water always.",
      "Take your cat for regular vet checkups yearly.",
    ]
  },
  {
    type: "Bird",
    tips: [
      "Clean the cage and change water every day.",
      "Offer seeds, pellets, and some fresh fruits.",
      "Let your bird out of the cage for exercise.",
      "Keep the cage away from cold drafts always.",
    ]
  },
  {
    type: "Rabbit",
    tips: [
      "Give a spacious, clean hutch for your rabbit.",
      "Feed hay, veggies, and rabbit pellets daily.",
      "Brush your rabbit often to prevent matting.",
      "Keep wires and dangerous things out of reach.",
    ]
  },
  {
    type: "Fish",
    tips: [
      "Keep aquarium water clean and filtered daily.",
      "Feed small amounts of fish food, not too much.",
      "Don’t overcrowd the tank with too many fish.",
      "Check water quality and temperature often.",
    ]
  },
  {
    type: "Hamster",
    tips: [
      "Provide a large cage with tunnels and wheels.",
      "Change bedding and clean the cage every week.",
      "Feed hamster pellets, seeds, and fresh treats.",
      "Handle your hamster gently and supervise play.",
    ]
  },
  {
    type: "Tortoise",
    tips: [
      "Give UVB light and a basking spot for your turtle.",
      "Keep water clean and at the right temperature.",
      "Feed pellets, leafy greens, and some protein.",
      "Let your turtle exercise outside the tank too.",
    ]
  },
  {
    type: "Pig",
    tips: [
      "Give fresh hay, veggies, and vitamin C foods.",
      "Clean the cage and change bedding regularly.",
      "Handle your pig gently and give daily attention.",
      "Trim nails and check teeth growth as needed.",
    ]
  },
];

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 48; // padding from ScrollView

const FlipCard = ({ pet, image }) => {
  const [flipped, setFlipped] = useState(false);
  const animatedValue = useState(new Animated.Value(0))[0];

  // Interpolate rotation for front and back
  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });
  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  // Handle flip
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

  const cardHeight = 220 + Math.max(0, (pet.tips.length - 3) * 28);

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={flipCard}
      className="mb-9"
    >
      <View style={{ height: cardHeight, width: CARD_WIDTH, alignSelf: "center" }}>
        {/* Front Side */}
        <Animated.View
          style={[
            {
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
            },
          ]}
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
          <View className="flex-1 w-full h-full justify-end items-center px-2 pb-8"
            style={{
              backgroundColor: "rgba(60,40,20,0.18)",
              borderRadius: 32,
            }}>
            <View className="w-full items-center">
              <Text
                className="text-white text-4xl font-extrabold text-center mb-2"
                style={{
                  textShadowColor: "#000",
                  textShadowOffset: { width: 1, height: 2 },
                  textShadowRadius: 12,
                  letterSpacing: 2,
                  backgroundColor: "rgba(60,40,20,0.38)",
                  borderRadius: 16,
                  paddingHorizontal: 16,
                  paddingVertical: 6,
                  overflow: "hidden",
                }}
              >
                {pet.type}
              </Text>
              <Text className="text-white text-base mt-2 opacity-90 text-center italic drop-shadow-lg">
                Tap to see tips
              </Text>
            </View>
          </View>
        </Animated.View>
        {/* Back Side */}
        <Animated.View
          style={[
            {
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
            },
          ]}
        >
          <View className="flex-1 p-7 justify-center w-full h-full">
            <Text className="text-2xl font-extrabold text-[#6e4c30] mb-4 text-center tracking-wide drop-shadow-lg"
              style={{
                letterSpacing: 1.5,
                backgroundColor: "#f5e6d6",
                borderRadius: 12,
                paddingVertical: 6,
                marginBottom: 18,
              }}
            >
              Tips for {pet.type}
            </Text>
            {pet.tips.map((tip, idx) => (
              <View key={idx} className="flex-row items-start mb-3">
                <View className="w-2 h-2 rounded-full bg-[#8d6e63] mt-2 mr-3" />
                <Text className="text-base text-[#3e2723] flex-1 flex-wrap leading-6 font-medium">{tip}</Text>
              </View>
            ))}
            <Text className="text-[#8d6e63] text-base mt-7 opacity-80 text-center italic">
              Tap to return
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
          overflow: "hidden",
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