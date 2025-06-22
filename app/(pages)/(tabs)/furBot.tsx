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
  FlatList,
} from "react-native";
import axios from "axios";
import { Feather } from "@expo/vector-icons"; // or 'MaterialIcons', etc.
import { useAxiosSecure } from "@/lib/axiosSecure";
import { ActivityIndicator } from "react-native";

const FurBot = () => {
  const [messages, setMessages] = useState<
    { id: string; sender: string; text: string }[]
  >([]);

  // const maxId = Math.max(...initialMessages.map((msg) => parseInt(msg.id)));
  const [messageId, setMessageId] = useState(1);

  const axiosSecure = useAxiosSecure();
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const translateY = useState(new Animated.Value(0))[0];

  const flatListRef = useRef(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const res = await axiosSecure.get("/chatbot/get_chat_history");
        console.log(res.data);
        const fetchedMessages = res.data["chat_history"];
        setMessages(fetchedMessages.reverse()); // Keep latest at top if using inverted FlatList
        setMessageId(fetchedMessages.length + 1);
      } catch (error) {
        // console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, []);

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

    setLoading(true);

    const userId = messageId.toString();
    const userMessage = {
      id: userId,
      sender: "user",
      text: inputText,
    };
    setMessages((prev) => [userMessage, ...prev]);
    setMessageId((prev) => prev + 1);
    setInputText("");

    try {
      const response = await axiosSecure.post("chatbot/inference", {
        question: inputText,
      });

      setMessages((prev) => [
        {
          id: (messageId + 1).toString(),
          sender: "bot",
          text: response.data.response || "Sorry, I didn't understand that.",
        },
        ...prev,
      ]);
      setMessageId((prev) => prev + 1);
    } catch (error) {
      // console.error("Chat API error:", error);
      setMessages((prev) => [
        {
          id: (messageId + 1).toString(),
          sender: "bot",
          text: "Oops! Something went wrong.",
        },
        ...prev,
      ]);
      setMessageId((prev) => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = async () => {
    const response = await axiosSecure.delete("chatbot/delete_chat_history");
    console.log(response.data);
    const newMessage = response.data["chat_history"];
    setMessages(newMessage);
    setMessageId(1);
  };

  const renderItem = ({ item }) => (
    <View
      className={`my-1 px-4 py-2 rounded-xl max-w-[80%] ${
        item.sender === "user"
          ? "self-end bg-green-200"
          : "self-start bg-gray-200"
      }`}
    >
      <Text className="text-base">
        {item.text.split(/(\*[^*]+\*)/g).map((part, index) => {
          if (part.startsWith("*") && part.endsWith("*")) {
            return (
              <Text key={index} className="font-bold">
                {part.slice(1, -1)}
              </Text>
            );
          } else {
            return part;
          }
        })}
      </Text>
    </View>
  );

  const chatBotLayout = (
    <SafeAreaView>
      <Animated.View
        style={{
          transform: [{ translateY }],
          paddingTop: 0,
        }}
      >
        <View className=" bg-[#f5deda]" style={{ height: 730 }}>
          <FlatList
            ref={flatListRef} // Attach the FlatList reference
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 12 }}
            inverted
          />
        </View>
        <View className="flex-row items-center border-t border-gray-300 p-3 bg-white space-x-2">
          {/* New Chat Button */}
          <TouchableOpacity
            onPress={startNewChat}
            className="bg-[#6e4c30] px-3 py-2 rounded-full"
          >
            <Feather name="plus" size={20} color="white" />
          </TouchableOpacity>

          {/* Text Input */}
          <TextInput
            className="flex-1 bg-gray-100 rounded-full px-4 py-2"
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            placeholderTextColor="#999"
          />

          {/* Send Button */}
          <TouchableOpacity
            onPress={sendMessage}
            disabled={loading}
            className="bg-[#6D4C41] px-4 py-2 rounded-full"
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Feather name="send" size={20} color="white" />
            )}
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
