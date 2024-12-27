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
import { register_provider } from '../../../../lib/apiCalls';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Pet from '../../../../assets/peticon.png';
import Pita from '../../../../assets/pitaouss.png';

const { width, height } = Dimensions.get('screen');

interface FormData {
  fname: string;
  lname: string;
  email: string;
  provider_password: string;
  provider_cv: string | null;
}

const RegisterProvider: React.FC = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState<FormData>({
    fname: '',
    lname: '',
    email: '',
    provider_password: '',
    provider_cv: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    if (
      !formData.email ||
      !formData.provider_password ||
      !formData.fname ||
      !formData.lname
    ) {
      Alert.alert('Registration Error', 'All fields are required');
      setLoading(false);
      return;
    } else {
      const data = await register_provider(formData);
      Alert.alert('Registration Request Sent', 'Please Complete the Steps');
      navigation.navigate(...['ProvCV', { email: formData.email } ]as never);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View>
        <View style={styles.header}>
          <View style={styles.design}>
            <TouchableOpacity style={styles.userImage}>
              <Image
                source={Pita}
                style={styles.pitaImageStyle}
              />
            </TouchableOpacity>
          </View>
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
            placeholder="  Enter Your Password"
            secureTextEntry
            value={formData.provider_password}
            onChangeText={(text) =>
              setFormData({ ...formData, provider_password: text })
            }
          />
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
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
    left: 85,
    width: width * 0.35,
    height: height * 0.16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pitaImageStyle: {
    borderRadius: width * 0.2,
    width: width * 0.55,
    height: width * 0.55,
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

export default RegisterProvider;
