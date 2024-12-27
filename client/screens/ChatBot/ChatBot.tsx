import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import { WebView } from "react-native-webview";

const { width, height } = Dimensions.get("screen");

const ChatbotScreen: React.FC = () => {
  const [inputText, setInputText] = useState(""); // State to store input text
  const [videoUri, setVideoUri] = useState<string | null>(null); // State to store selected video URI
  const [messageVisible, setMessageVisible] = useState(false); // State to manage message visibility

  // Function to pick video from gallery
  const pickVideo = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need access to your photo library to pick a video.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setVideoUri(result.assets[0].uri); // Set the video URI to display
    }
  };

  // Effect hook to show the message after 3 seconds when the video is selected
  useEffect(() => {
    if (videoUri) {
      const timer = setTimeout(() => {
        setMessageVisible(true); // Show the message after 3 seconds
      }, 3000);

      // Cleanup timer when videoUri changes or component unmounts
      return () => clearTimeout(timer);
    }
  }, [videoUri]);

  return (
    <View style={styles.container}>
      {/* Chatbot Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <WebView source={require("../../assets/chat.gif")} style={styles.webview} />
        </View>
      </View>

      {/* Text Below Logo */}
      <View style={styles.textContainer}>
        <Text style={styles.helpText}>How can I help you today?</Text>
      </View>

      {/* Input Bar */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.videoButton} onPress={pickVideo}>
          <Text style={styles.micIcon}>🎥</Text> {/* Video Icon */}
        </TouchableOpacity>
        <View style={styles.inputBar}>
          <TextInput
            style={styles.inputText}
            placeholder="Ask"
            value={inputText}
            onChangeText={(text) => setInputText(text)}
            placeholderTextColor="#a3a3a3"
          />
        </View>
      </View>

      {/* Video Display */}
      {videoUri && (
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: videoUri }}
            style={styles.video}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        </View>
      )}

      {/* Show the message after 3 seconds */}
      {messageVisible && <Text style={styles.message}>This is a teacher</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoCircle: {
    width: width * 0.9,
    height: height * 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  webview: {
    width: width * 0.7,
    height: height * 0.3,
    backgroundColor: "transparent",
  },
  textContainer: {
    marginBottom: 20,
  },
  helpText: {
    fontSize: 18,
    color: "#707070",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginBottom: 40,
  },
  videoButton: {
    backgroundColor: "#e3e3fe",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  micIcon: {
    fontSize: 24,
    color: "#5a5aed",
  },
  inputBar: {
    flex: 1,
    backgroundColor: "#ffffff",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  inputText: {
    fontSize: 16,
    color: "#000000",
    flex: 1,
  },
  videoContainer: {
    width: "90%",
    marginTop: 20,
  },
  video: {
    width: "100%",
    height: 300,
  },
  message: {
    marginTop: 20,
    fontSize: 18,
    color: "#707070",
    textAlign: "center",
  },
});

export default ChatbotScreen;
