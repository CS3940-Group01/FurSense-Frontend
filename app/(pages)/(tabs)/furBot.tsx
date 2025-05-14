import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  Platform,
  SafeAreaView,
  FlatList
} from "react-native";
import axios from "axios";

const FurBot = () => {
  const [messages, setMessages] = useState([
    { id: "1", sender: "bot", text: "Hi, I'm your FurBot. How can I assist you today?" },
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const translateY = useState(new Animated.Value(0))[0];

  const flatListRef = useRef(null); 

  useEffect(() => {
      const showSub = Keyboard.addListener("keyboardDidShow", () => {
        setKeyboardVisible(true);
        Animated.timing(translateY, {
          toValue: -315,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
      const hideSub = Keyboard.addListener("keyboardDidHide", () => {
        setKeyboardVisible(false);
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
  
      return () => {
        showSub.remove();
        hideSub.remove();
      };
    }, [translateY]);
  

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: inputText,
    };

    setMessages((prev) => [userMessage, ...prev]); // Add new message to the top
    setInputText("");
    setLoading(true);

    try {
      const response = await axios.post("http://192.168.1.9:4200/inference", {
        question: inputText,
      });

      const botReply = {
        id: Date.now().toString() + "-bot",
        sender: "bot",
        text: response.data.response || "Sorry, I didn't understand that.",
      };

      setMessages((prev) => [botReply, ...prev]); // Add bot reply to the top
    } catch (error) {
      console.error("Chat API error:", error);
      const errorMsg = {
        id: Date.now().toString() + "-error",
        sender: "bot",
        text: "Oops! Something went wrong.",
      };
      setMessages((prev) => [errorMsg, ...prev]); // Add error message to the top
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View
      className={`my-1 px-4 py-2 rounded-xl max-w-[80%] ${
        item.sender === "user"
          ? "self-end bg-green-200"
          : "self-start bg-gray-200"
      }`}
    >
      <Text className="text-base">{item.text}</Text>
    </View>
  );

  const chatBotLayout = (
    <SafeAreaView>
      <Animated.View
              style={{
                transform: [{ translateY }],
                paddingTop: 20,
              }}
            >
        <View className=" bg-[#f5deda]" style={{ height: 709 }}>
          <FlatList
            ref={flatListRef} // Attach the FlatList reference
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 12 }}
            inverted // This reverses the order of the list
          />
        </View>
          <View className="flex-row items-center border-t border-gray-300 p-3 bg-white"  >
            <TextInput
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2"
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type a message..."
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              onPress={sendMessage}
              disabled={loading}
              className="bg-[#6D4C41] px-4 py-2 rounded-full"
            >
              <Text className="text-white font-bold">
                {loading ? "..." : "Send"}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
    </SafeAreaView>

  );

  return Platform.OS === "web" ? (
      chatBotLayout
    ) : (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {chatBotLayout}
      </TouchableWithoutFeedback>
    );
};

export default FurBot;