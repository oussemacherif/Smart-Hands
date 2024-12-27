import React, { useState } from 'react';
import { View,Text, TextInput, Button, StyleSheet, TouchableOpacity,Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
interface CompleteProviderProps {
  onButtonPress: (description: string) => void;
}
const { width, height } = Dimensions.get("screen");
const CompleteProvider: React.FC<CompleteProviderProps> = ({ onButtonPress }) => {
  const [description, setDescription] = useState<string>('');
  const [exp, setExp] = useState<string>('');
  const navigation=useNavigation()
  const handleButtonPress = () => {
    onButtonPress(description);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textArea}
        placeholder="Enter description"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        style={styles.textAreaA}
        placeholder="Enter Your Experience"
        multiline
        numberOfLines={4}
        value={exp}
        onChangeText={(text) => setExp(text)}
      />
      <TouchableOpacity
      onPress={()=>{navigation.navigate("Home" as never)}}
       style={{marginTop:50,marginLeft:120,backgroundColor:"#4e9d91",width:width*0.23, padding:10,borderRadius:20}}>
        <Text style={{color:"white"}}>Complete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop:180
  },
  textArea: {
    height: 100,
    borderColor: '#4e9d91',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  textAreaA: {
    height: 40,
    borderColor: '#4e9d91',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});

export default CompleteProvider;
