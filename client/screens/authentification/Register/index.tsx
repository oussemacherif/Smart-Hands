import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { register_me } from '../../../lib/apiCalls';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Pet from '../../../assets/pitaouss.png';

const { width, height } = Dimensions.get('screen');

interface FormData {
  fname: string;
  lname: string;
  email: string;
  user_password: string;
  image: string | null;
}

const Register: React.FC = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState<FormData>({
    fname: '',
    lname: '',
    email: '',
    user_password: '',
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const selectImage = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.canceled === true) {
      return;
    }
    const selected = pickerResult.assets[0];
    setFormData({ ...formData, image: (selected as any).uri });
  };

  const takePhoto = async () => {
    const pickerResult = await ImagePicker.launchCameraAsync();

    if (pickerResult.canceled === true) {
      return;
    }
    const selected = pickerResult.assets[0];
    setFormData({ ...formData, image: (selected as any).uri });
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (!formData.email || !formData.user_password || !formData.fname || !formData.lname) {
      Alert.alert('Registration Error', 'All fields are required');
      setLoading(false);
      return;
    } else {
      const data = await register_me(formData);
      Alert.alert('You have successfully created your account');
      navigation.navigate('Login' as never);
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      'Choose Image Source',
      'Would you like to choose an image from the gallery or take a photo?',
      [
        {
          text: 'Choose from Gallery',
          onPress: selectImage,
        },
        {
          text: 'Take a Photo',
          onPress: takePhoto,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <View style={styles.design}></View>
        <TouchableOpacity style={styles.userImage} >
          
            <Image
              source={Pet}
              style={styles.userImageStyle}
            />
        
        </TouchableOpacity>
      </View>
      <View style={styles.allInput}>
        <View style={styles.nameInputs}>
          <TextInput
            style={styles.inputname}
            placeholder=" Your First Name"
            value={formData.fname}
            onChangeText={(text) => setFormData({ ...formData, fname: text })}
          />
          <TextInput
            style={styles.inputname}
            placeholder=" Your Family Name"
            value={formData.lname}
            onChangeText={(text) => setFormData({ ...formData, lname: text })}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder=" Enter Your Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder=" Enter Your Password"
          secureTextEntry
          value={formData.user_password}
          onChangeText={(text) =>
            setFormData({ ...formData, user_password: text })
          }
        />
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
  header: {
    height: height * 0.35,
    padding: 5,
    alignItems: 'center',
  },
  design: {
    backgroundColor: '#4e9d91',
    width: width * 0.9,
    height: height * 0.2,
    borderBottomLeftRadius: width * 0.4,
    borderBottomRightRadius: width * 0.4,
  },
  userImage: {
    position: 'absolute',
    marginTop: width * 0.2,
    borderRadius: width * 0.5,
    width: width * 0.35,
    height: height * 0.16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImageStyle: {
    borderRadius: width * 0.2,
    width: width * 0.5,
    height: width * 0.5,
  },
  nameInputs: {
    flexDirection: 'row',
    gap: 20,
  },
  input: {
    backgroundColor: 'rgb(238, 238, 238)',
    width: width * 0.85,
    height: height * 0.07,
    borderRadius: 10,
    textAlign: 'center',
    borderColor: '#4e9d91',
    borderWidth: 2,
  },
  inputname: {
    backgroundColor: 'rgb(238, 238, 238)',
    width: width * 0.4,
    height: height * 0.07,
    borderRadius: 10,
    textAlign: 'center',
    borderColor: '#4e9d91',
    borderWidth: 2,
  },
  allInput: {
    padding: 10,
    alignItems: 'center',
    gap: 17,
  },
  registerButton: {
    backgroundColor: '#4e9d91',
    width: width * 0.85,
    height: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Register;
