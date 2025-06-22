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
  Parrot: require("../../../../assets/images/petTips/parrot.jpg"),
  Rabbit: require("../../../../assets/images/petTips/rabbit.jpg"),
  Goldfish: require("../../../../assets/images/petTips/goldfish.jpeg"),
  Pigeon: require("../../../../assets/images/petTips/pigeon.jpg"),
};

const petTips = [
  {
    type: "Dog",
    name: "Happy & Healthy Dogs: Care Essentials",
    tips: [
      "Feed your dog high-quality, age-appropriate food twice a day and avoid giving them human food scraps.",
      "Ensure they get daily physical activity like walks, fetch, or runs to maintain a healthy weight and prevent boredom.",
      "Brush their teeth at least 2–3 times a week to prevent tartar buildup and dental diseases.",
      "Keep their vaccinations up to date and schedule regular veterinary checkups for early disease detection.",
      "Groom your dog regularly—brush their coat, trim nails, and clean ears to prevent infections.",
      "Use positive reinforcement during training—rewards and praise work better than punishment.",
      "Provide mental stimulation through puzzle toys, scent games, and obedience training.",
      "Socialize them with other dogs and people from a young age to build confidence and reduce anxiety.",
      "Protect them from parasites like ticks, fleas, and heartworms with regular treatments.",
      "Ensure they have a safe, quiet space to rest and sleep comfortably indoors.",
    ],
  },
  {
    type: "Cat",
    name: "How to Keep Your Cat Happy?",
    tips: [
      "Feed your cat a balanced diet—avoid feeding dog food or excessive treats as it can cause health issues.",
      "Provide constant access to fresh, clean water to prevent dehydration and urinary problems.",
      "Scoop the litter box daily and change the litter weekly to maintain hygiene and reduce odor.",
      "Place scratching posts around the home to prevent furniture damage and keep claws healthy.",
      "Give your cat vertical space like shelves or cat trees for climbing and observation.",
      "Play daily with interactive toys (feathers, lasers) to provide exercise and prevent obesity.",
      "Brush your cat’s fur regularly to prevent matting, especially in long-haired breeds.",
      "Take them for annual vet checkups and keep up with vaccinations and deworming.",
      "Spay or neuter your cat to reduce unwanted behaviors and prevent overpopulation.",
      "Offer hiding spots or quiet zones where your cat can retreat and feel safe.",
    ],
  },
  {
    type: "Parrot",
    name: "Parrot Health & Enrichment Essentials",
    tips: [
      "Provide a balanced diet of fresh fruits, vegetables, pellets, and a small amount of seeds to meet their nutritional needs.",
      "Spend time talking and interacting daily—parrots are highly social and need mental stimulation.",
      "Rotate toys and puzzles frequently to prevent boredom and encourage problem-solving behavior.",
      "Ensure their cage is large enough to flap wings freely and has a variety of perches of different textures.",
      "Keep their environment clean—change water daily, clean food dishes, and disinfect the cage weekly.",
      "Avoid fumes from non-stick pans, smoke, and aerosols—they are highly toxic to parrots.",
      "Train your parrot using positive reinforcement to build trust and enhance communication.",
      "Make sure they get at least 10–12 hours of sleep in a quiet, dark room to stay healthy.",
      "Clip wings carefully only if necessary, or allow supervised flight for exercise and enrichment.",
      "Watch for signs of illness such as feather plucking, lethargy, or changes in appetite and consult an avian vet.",
    ],
  },
  {
    type: "Rabbit",
    name: "Rabbits: Diet, Space & Safety",
    tips: [
      "Feed rabbits mostly hay, along with fresh leafy greens and a small amount of pellets daily.",
      "Provide a spacious enclosure where they can stretch, hop, and stand on their hind legs.",
      "Rabbits need mental stimulation—offer chew toys, tunnels, and cardboard boxes for enrichment.",
      "Always provide clean water, either in a heavy bowl or water bottle, and refresh it daily.",
      "Keep their living space clean and dry—spot-clean daily and deep-clean weekly.",
      "Litter train your rabbit using a corner litter box lined with rabbit-safe litter (avoid clumping types).",
      "Handle them gently—never lift by the ears and always support their hindquarters.",
      "Get your rabbit spayed or neutered to prevent health issues and reduce aggression.",
      "Rabbits are social—bond them with a compatible rabbit companion if possible.",
      "Check their teeth and nails regularly—overgrown teeth can cause pain and eating issues.",
    ],
  },
  {
    type: "Goldfish",
    name: "Goldfish Tank Maintenance & Well-being",
    tips: [
      "Use a tank of at least 20 gallons per goldfish—they produce a lot of waste and need space.",
      "Install a high-quality filtration system and change 20–30% of the water weekly to maintain clean water.",
      "Feed them sinking pellets and vegetables like peas (without skins) to aid digestion and avoid floating issues.",
      "Avoid overfeeding—only feed what they can consume in under 2 minutes to prevent water contamination.",
      "Test water regularly for ammonia, nitrite, nitrate, and pH to ensure a healthy aquatic environment.",
      "Keep water temperature stable (18–22°C) and avoid placing the tank in direct sunlight to prevent overheating.",
      "Decorate the tank with smooth stones and live plants like anubias or hornwort—these mimic a natural environment.",
      "Quarantine new fish for at least 2 weeks before introducing them to avoid spreading diseases.",
      "Observe your fish daily—look for changes in behavior, fins, or appetite as early signs of illness.",
      "Don’t keep goldfish with tropical or aggressive species—choose compatible, cold-water fish companions only.",
    ],
  },
  {
    type: "Pigeon",
    name: "Caring for Your Feathered Friend",
    tips: [
      "Ensure your pigeon has a spacious, well-ventilated coop that protects them from rain, wind, and predators.",
      "Clean the coop weekly and remove droppings daily to maintain hygiene and prevent respiratory diseases.",
      "Feed them a variety of grains, legumes, and pigeon pellets, and provide grit for digestion.",
      "Always offer fresh, clean water—replace it at least once daily and more often in hot weather.",
      "Give pigeons access to open space or a flight cage for exercise and mental stimulation.",
      "Watch for signs of illness like lethargy, discharge from beak or eyes, ruffled feathers, or diarrhea.",
      "Keep nesting boxes clean and give materials like straw or shredded paper for nesting comfort.",
      "Use pigeon-safe treatments for parasites like mites and lice and clean perches with disinfectant.",
      "Spend time near them to build trust—pigeons can recognize faces and respond to consistent care.",
      "Provide a calcium source like crushed oyster shells or mineral blocks for healthy eggs and bones.",
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
          className="text-center text-3xl font-extrabold text-brown-800 mb-8 tracking-wide px-4"
          style={{ color: "#6e4c30" }}
        >
          {petData.name}
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
            <Text
              className="text-brown-800 text-base font-medium leading-relaxed flex-1"
              style={{ flexWrap: "wrap" }}
            >
              {tip}
            </Text>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Animated Image Card */}
      <Animated.View
        className="absolute self-center items-center w-[95%]"
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
        <View className="rounded-3xl overflow-hidden border-[6px] border-white/80 shadow-2xl w-full h-[280px] bg-white">
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
