import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet ,Dimensions,TouchableOpacity,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { login_provider } from '../../../../lib/apiCalls';
import { useDispatch, useSelector } from 'react-redux'; 
import { setAuthTokenAction } from '../../../../lib/redux/auth/authThunks';
// import { setUserData } from '../../../../lib/redux/user/userSlice';
import { setProviderData } from '../../../../lib/redux/provider/providerSlice';
import pita from "../../../../assets/pitaouss.png"

const { width, height } = Dimensions.get("screen");


const LoginProvider: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: '',
    provider_password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    if (!formData.email || !formData.provider_password) {
      Alert.alert('Login Error', 'All fields are required');
      setLoading(false);
      return;
    }
      
    try {
        const data = await login_provider(formData);
       
  
        if (data) {
           console.log("data from Api succes",data);
          dispatch(setAuthTokenAction(data.token));
          dispatch(setProviderData(data))
  
          setLoading(false);

          Alert.alert('Success', data.message);
          
          setTimeout(() => {
            navigation.navigate('CompleteProvider' as never); 
          }, 2000);

        } else {
          setLoading(false);
          
          Alert.alert('Error', data.message);
        }
      } catch (error) {
        setLoading(false);
        Alert.alert('Error', 'An unexpected error occurred');
      }
    };
    
    
  

  return (
    <View style={styles.container}>
      <Image style={{width:width*0.8,height:width*0.8,}} source={pita}></Image>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formData.provider_password}
        onChangeText={(text) => setFormData({ ...formData, provider_password: text })}
      />
      <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Login
          </Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor:"#fff",
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    backgroundColor: "rgb(238, 238, 238)",
    width: width * 0.85,
    height: height * 0.07,
    borderRadius: 10,
    textAlign: "center",
    borderColor: "#4e9d91",
    borderWidth: 2,
    marginBottom:20
  },
  button:{
    backgroundColor: "#4e9d91",
    width: width * 0.85,
    height: height * 0.06,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom:145
  }
});

export default LoginProvider;
