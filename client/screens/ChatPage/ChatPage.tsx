import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, FlatList, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import send from '../../assets/paper-plane1.png';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const { width, height } = Dimensions.get('screen');

// Emoji mapping function for ASL sentences
const textToEmojis = (text: string) => {
  const emojiMap: { [key: string]: string } = {
    "I love my family": "🙋‍♂️😊",
    "I am happy": "😊",
    "We are friends": "🫂",
    "I am eating": "🍴🍲",
    "I love you": "❤️🙋‍♂️",
    "Let's play soccer": "⚽🎮",
    "I am studying": "📚💡",
    "Good morning": "🌞☕",
    "Good night": "🌙🌜",
  };
  

  return emojiMap[text] || text; // Return emoji if mapped, else return original text
};
const textToASL = (text: string) => {
  const emojiMap: { [key: string]: string } = {
    "hello world": "✋ 🤙 👋 👋 👌 🔲 🖐 👌 ✋ 👋 🤞",
    "hello":"✋ 🤙 👋 👋 👌"
  };
  

  return emojiMap[text] || text; // Return emoji if mapped, else return original text
};

const ChatPage: React.FC = ({ route }: any): React.ReactElement => {
  const [conv, setConv] = useState([
    { id: '1', msg: '🙋‍♂️😊', user: 1 }, // User 1 sends "Hi"
    { id: '2', msg: '❤🍔', user: 2 } // User 2 responds with "Hello"
  ]);
  const [newMsg, setNewMsg] = useState("");
  const navigation = useNavigation();

  const renderConv = ({ item }) => (
    <View key={item.id}>
      {item.user === 1 ? (
        // User 1's message (on the left)
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
            backgroundColor: "#e9e9eb",
            padding: 10,
            width: width * 0.5,
            borderRadius: 20,
            height: height * 0.05,
            marginVertical: 5,
          }}
        >
          <Text>{item.msg}</Text>
        </View>
      ) : (
        // User 2's message (on the right)
        <View
          style={{
            marginLeft: width * 0.4,
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
            backgroundColor: "#34ca5a",
            padding: 10,
            width: width * 0.5,
            borderRadius: 20,
            height: height * 0.05,
            marginVertical: 5,
          }}
        >
          <Text>{item.msg}</Text>
        </View>
      )}
    </View>
  );

  useEffect(() => {
    navigation.setOptions({
      title: 'Chat', // Simplified title
      headerStyle: { backgroundColor: '#4e9d91' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    });
  }, [navigation, conv]);

  const handleSend = () => {
    console.log("newMsg", newMsg);

    
    if (newMsg.includes('**')) {
      const message = newMsg.split('**')[0].trim(); // Take part before '**' and trim any extra spaces
      const emojiMsg = textToASL(message); // Convert text to emoji version
      const obj = { msg: emojiMsg, user: 2 }; // Assuming User 1 is sending the message
      setConv([...conv, obj]);
    
    } else if (newMsg.includes('//')){
      const message = newMsg.split('//')[0].trim(); // Take part before '**' and trim any extra spaces
      const emojiMsg = textToEmojis(message); // Convert text to emoji version
      const obj = { msg: emojiMsg, user: 2 }; // Assuming User 1 is sending the message
      setConv([...conv, obj]);
    }
      else {
      const obj = { msg: newMsg, user: 2 }; // Regular message
      setConv([...conv, obj]);
    }

    setNewMsg("");
    Keyboard.dismiss();
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ width: width, height: height, padding: 5 }}
        data={conv}
        renderItem={renderConv}
        keyExtractor={(item) => item.id}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder="message"
          style={{
            backgroundColor: "grey",
            width: width * 0.8,
            height: height * 0.05,
            borderRadius: 20,
            paddingHorizontal: 15,
          }}
          onChangeText={setNewMsg}
          value={newMsg}
        />
         <Icon name="language" size={30} color="#4e9d91" /> 
        <TouchableOpacity onPress={handleSend}>
          <Image source={send} style={{ width: width * 0.077, height: height * 0.03 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default ChatPage;
