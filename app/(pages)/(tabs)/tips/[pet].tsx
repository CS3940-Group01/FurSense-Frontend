import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  Animated,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const PET_IMAGES: Record<string, any> = {
  Dog: require("../../../../assets/images/petTips/dog.jpeg"),
  Cat: require("../../../../assets/images/petTips/cat.jpeg"),
  Bird: require("../../../../assets/images/petTips/bird.jpeg"),
  Rabbit: require("../../../../assets/images/petTips/rabbit.jpg"),
  Fish: require("../../../../assets/images/petTips/fish.jpeg"),
  Hamster: require("../../../../assets/images/petTips/hamster.jpeg"),
  Tortoise: require("../../../../assets/images/petTips/tortoise.jpeg"),
  Pig: require("../../../../assets/images/petTips/pig.jpeg"),
};

const petTips = [
  {
    type: "Dog",
    tips: [
      "Feed your dog balanced meals twice a day.",
      "Regular exercise helps keep dogs healthy and happy.",
      "Brush their teeth regularly to prevent dental issues.",
      "Schedule annual vet checkups and vaccinations.",
      "Socialize them early to build good behavior.",
    ],
  },
  {
    type: "Cat",
    tips: [
      "Cats need fresh water every day.",
      "Provide scratching posts to protect furniture.",
      "Clean their litter box daily for hygiene.",
      "Play with them to keep them mentally stimulated.",
      "Brush their fur regularly to reduce shedding.",
    ],
  },
  {
    type: "Bird",
    tips: [
      "Give your bird a variety of fruits and seeds.",
      "Keep their cage clean and spacious.",
      "Provide toys to keep them entertained.",
      "Let them fly in a safe space regularly.",
      "Avoid non-stick cookware around birds (toxic fumes).",
    ],
  },
  {
    type: "Rabbit",
    tips: [
      "Rabbits need a diet rich in hay and leafy greens.",
      "Provide plenty of space for them to hop around.",
      "Keep their cage clean and dry.",
      "Avoid picking them up by their ears.",
      "Rabbits are social—consider keeping them in pairs.",
    ],
  },
  {
    type: "Fish",
    tips: [
      "Maintain proper water temperature and pH levels.",
      "Avoid overfeeding—only what they eat in 2 minutes.",
      "Clean the tank regularly to prevent algae buildup.",
      "Use a filter to keep water clean and oxygenated.",
      "Research fish compatibility before mixing species.",
    ],
  },
  {
    type: "Hamster",
    tips: [
      "Provide tunnels and wheels for exercise.",
      "Clean the cage once a week to avoid odor.",
      "Feed a mix of pellets, seeds, and veggies.",
      "Avoid waking them suddenly—they’re nocturnal.",
      "Give them materials to build their nests.",
    ],
  },
  {
    type: "Tortoise",
    tips: [
      "Ensure UVB lighting for healthy shell growth.",
      "Feed leafy greens and calcium-rich foods.",
      "Provide a basking area with a heat lamp.",
      "Avoid wet, cold environments—they need warmth.",
      "Let them roam safely outside when weather allows.",
    ],
  },
  {
    type: "Pig",
    tips: [
      "Feed them a balanced pig diet—avoid junk food.",
      "Pigs are smart—teach them tricks and routines.",
      "Provide mud or shaded areas to cool off.",
      "Keep their living space clean and dry.",
      "Trim their hooves regularly and visit the vet.",
    ],
  },
];

const PetTipsPage = () => {
  const { pet } = useLocalSearchParams();
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [fadeAnims, setFadeAnims] = useState<Animated.Value[]>([]);
  const imageAnim = useRef(new Animated.Value(0)).current;

  const petType = pet?.charAt(0).toUpperCase() + pet?.slice(1).toLowerCase();
  const petData = petTips.find((p) => p.type === petType);

  useEffect(() => {
    if (!petData) return;
    const anims = petData.tips.map(() => new Animated.Value(0));
    setFadeAnims(anims);

    anims.forEach((anim, index) => {
      setTimeout(() => {
        Animated.timing(anim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, index * 300);
    });

    // Animate image card entrance
    Animated.timing(imageAnim, {
      toValue: 1,
      duration: 900,
      delay: 200,
      useNativeDriver: true,
    }).start();
  }, [petData]);

  const IMAGE_HEIGHT = 230;

  if (!pet) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: "#f5deda" }}
      >
        <Text className="text-lg text-brown-800">No pet selected</Text>
      </View>
    );
  }

  if (!petData) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: "#f5deda" }}
      >
        <Text className="text-xl text-red-500 font-semibold mb-4">
          Tips for "{petType}" not found.
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/tips")}
          className="bg-brown-800 px-6 py-3 rounded-full shadow-md"
        >
          <Text className="text-white text-base font-semibold tracking-wider">
            ← Go Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-pink-50 relative">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: IMAGE_HEIGHT + 70,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          className="text-center text-4xl font-extrabold text-brown-800 mb-8 tracking-wider"
          style={{ color: "#6e4c30" }}
        >
          {petType}
        </Text>

        {petData.tips.map((tip, index) => (
          <Animated.View
            key={index}
            className="flex-row items-start bg-white/70 border border-brown-300 px-5 py-4 rounded-2xl mb-4 mx-4 shadow-lg backdrop-blur-md"
            style={{
              opacity: fadeAnims[index] || 0,
              transform: [
                {
                  translateY: fadeAnims[index]
                    ? fadeAnims[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      })
                    : 0,
                },
              ],
            }}
          >
            <Ionicons
              name="paw-outline"
              size={20}
              color="#6e4c30"
              className="mt-1 mr-3"
            />
            <Text className="text-brown-800 text-base font-medium leading-relaxed">
              {tip}
            </Text>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Animated Image Card */}
      <Animated.View
        className="absolute top-5 self-center items-center w-[95%]"
        style={{
          opacity: imageAnim,
          transform: [
            {
              scale: imageAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
              }),
            },
          ],
        }}
      >
        <View className="rounded-3xl overflow-hidden border-[6px] border-white/80 shadow-2xl w-full h-[230px] bg-white">
          <Image
            source={PET_IMAGES[petType]}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
      </Animated.View>

      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.push("/tips")}
        className="absolute top-12 left-5 bg-black/60 p-2 rounded-full z-50"
      >
        <Ionicons name="chevron-back" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default PetTipsPage;
