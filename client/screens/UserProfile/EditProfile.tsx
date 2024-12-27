import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { port } from "../../port";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData, selectUserData } from '../../lib/redux/user/userSlice';
import { AppDispatch } from '../../lib/redux/store';



const { width, height } = Dimensions.get("screen");





const EditProfile: React.FC = () => {
  const userData = useSelector((state: RootState) => state.user.userData);
  const [fname, setFname] = useState(userData.fname);
  const [lname, setLname] = useState(userData.lname);
  const [password, setPassword] = useState("");//prevous
  const [newP, setNewP] = useState("");
  const [conf, setConf] = useState("");
  const [pass,setPass] = useState(true);
  const [pword,setPword] = useState(true);
  const [image, setImage] = useState<string | null>(userData.image);
  const navigation=useNavigation()

  const dispatch: AppDispatch = useDispatch();



  const selectImage = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.canceled === true) {
      return;
    }
    const selected=pickerResult.assets[0]
    setImage(selected.uri);
  };

  const takePhoto = async () => {
    const pickerResult = await ImagePicker.launchCameraAsync();

    if (pickerResult.canceled === true) {
      return;
    }
    const selected=pickerResult.assets[0]
    setImage(selected.uri);
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      "Choose Image Source",
      "Would you like to choose an image from the gallery or take a photo?",
      [
        {
          text: "Choose from Gallery",
          onPress: selectImage,
        },
        {
          text: "Take a Photo",
          onPress: takePhoto,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };


  const updateProfile=async()=>{
    if(fname===""||lname===""){
        setPass(false)
        Alert.alert(
            "Please fill your info correctly"
        )
    }
    else if (conf!==newP){
        setPass(true)
        setPword(false)
        Alert.alert(
            "New Password Didn't Match"
        )
    }
    else {
        setPass(true)
        setPword(true)

        const editedData = {
            fname,
            lname,
            image,
            user_password : newP,
            previousPassword : password
        }

        try {
          const actionResult = await dispatch(updateUserData(editedData));
          console.log('actionres',actionResult);
          navigation.goBack();

        } catch (error) {
          console.error('Error dispatching updateUserData:', error);
        }
    }



 
}
  
  return (
    <ScrollView>
      <View style={styles.container}>
        {image && <Image source={{ uri: image }} style={styles.selectedImage} />}
        <TouchableOpacity onPress={showImagePickerOptions}>
          <Text>Select Image</Text>
        </TouchableOpacity>
        <View style={styles.allInput}>
      <View style={{display:'flex',flexDirection:'row',gap:20}} >
        <TextInput
           style={pass ? styles.inputname : styles.non}
          placeholder=" Your First Name"
          value={fname}
          onChangeText={(text) => setFname(text)}
        />
        <TextInput
          style={pass ? styles.inputname : styles.non}
          placeholder=" Your Family Name"
          value={lname}
          onChangeText={(text) => setLname(text)}
        />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Previous Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={pword?styles.input:styles.inputn}
          placeholder="New Password"
          secureTextEntry
          value={newP}
          onChangeText={(text) => setNewP(text)}
        />
        <TextInput
          style={pword?styles.input:styles.inputn}
          placeholder="Confirme Password"
          value={conf}
          secureTextEntry
          onChangeText={(text) => setConf(text)}
        />

        <TouchableOpacity
          style={styles.registerButton}
          onPress={()=> updateProfile()
          }
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Update Profile
          </Text>
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom:45
  },
  selectedImage: {
    width: width * 0.9,
    height: height * 0.3,
    borderRadius: 10,
    marginVertical: 10,

  },
  input: {
    backgroundColor: "rgb(238, 238, 238)",
    width: width * 0.85,
    height: height * 0.07,
    borderRadius: 10,
    textAlign: "center",
    borderColor: "#4e9d91",
    borderWidth: 2,
  },
  inputn: {
    backgroundColor: "rgb(238, 238, 238)",
    width: width * 0.85,
    height: height * 0.07,
    borderRadius: 10,
    textAlign: "center",
    borderColor: "red",
    borderWidth: 2,
  },
  inputname: {
    backgroundColor: "rgb(238, 238, 238)",
    width: width * 0.4,
    height: height * 0.07,
    borderRadius: 10,
    textAlign: "center",
    borderColor: "#4e9d91",
    borderWidth: 2,
  },
  non: {
    backgroundColor: "rgb(238, 238, 238)",
    width: width * 0.4,
    height: height * 0.07,
    borderRadius: 10,
    textAlign: "center",
    borderColor: "red",
    borderWidth: 2,
  },
  allInput: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",

    gap: 17,
  },
  registerButton: {
    backgroundColor: "#4e9d91",
    width: width * 0.85,
    height: height * 0.06,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});

export default EditProfile;
