import React,{useState,useEffect} from "react";
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
import { port } from "../../port";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import dog from '../../assets/dog.png'
import cat from '../../assets/cat.png'
import bird from '../../assets/bird.png'
import fish from '../../assets/fish.png'
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useSelector,useDispatch } from "react-redux";
import { AppDispatch } from '../../lib/redux/store';
import { updateUserData } from '../../lib/redux/user/userSlice';

interface AddForm {
  pet_name: string;
  pet_weight:number;
  pet_gender:string;
  pet_race:string;
  pet_images?:any[]|[];
  birth_date:number;
  userId:number
}

const { width, height } = Dimensions.get("screen");
const AddPet: React.FC = () => {
  const userData = useSelector((state: RootState) => state.user?.userData);
  console.log(userData.id);
  
  const [formData, setFormData] = useState<AddForm>({
    pet_name: "",
    pet_weight: 0,
    pet_gender: "",
    pet_race: "",
    pet_images:[],
    birth_date: Date.now(),
    userId:userData.id
  });
  const dispatch: AppDispatch = useDispatch();
  
  const navigation=useNavigation()
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [st, setSt] = useState("");
  const token = useSelector((state: RootState) => state.auth.authToken);
  
  const selectImage = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.canceled === true) {
      return;
    }
    const selected=pickerResult.assets[0]
    setFormData({ ...formData, pet_images:[...formData.pet_images,selected.uri]  })
  };

  const takePhoto = async () => {
    const pickerResult = await ImagePicker.launchCameraAsync();

    if (pickerResult.canceled === true) {
      return;
    }
    const selected=pickerResult.assets[0]
    setFormData({ ...formData, pet_images:[...formData.pet_images,selected.uri]  })
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
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate !== undefined && event.type !== "dismissed") {
      setFormData({...formData,birth_date:selectedDate})
    }
  };
  const handleSubmit=async()=>{
    const addina=await axios.post(`${port}/api/pets`,formData,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    const actionResult = await dispatch(updateUserData({
      fname:userData.fname
    }));
    navigation.goBack()
    
  }
  const handleRace=(type:string)=>{
    setSt(type)
    setFormData({...formData,pet_race:type})
  }
  

  return (
   <View>
   <View style={styles.header}>
   {formData.pet_images[0] && <Image source={{uri:formData.pet_images[0]}} style={styles.selectedImage} />}
        <TouchableOpacity onPress={showImagePickerOptions}>
          <Text>Select Image</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.allInput}>
        <TextInput
          style={styles.input}
          placeholder="Pet Name"
          value={formData.pet_name}
          onChangeText={(text) => setFormData({ ...formData, pet_name: text })}
        />
         <View style={{padding:7,width:width*0.85,display:'flex',flexDirection:'row',justifyContent:"space-between"}} >
          <TouchableOpacity style={st==="dog"?styles.choosed:styles.choose} onPress={()=>{handleRace("dog")}} >
            <Image style={{width:width*0.13,height:height*0.04}} source={dog}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={st==="cat"?styles.choosed:styles.choose} onPress={()=>{handleRace("cat")}}>
            <Image style={{width:width*0.13,height:height*0.04}} source={cat}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={st==="bird"?styles.choosed:styles.choose} onPress={()=>{handleRace("bird")}} >
            <Image style={{width:width*0.11,height:height*0.04}} source={bird}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={st==="fish"?styles.choosed:styles.choose} onPress={()=>{handleRace("fish")}} >
            <Image style={{width:width*0.13,height:height*0.04}} source={fish}></Image>
          </TouchableOpacity>
          
        </View>

        <View style={{padding:7,width:width*0.9,display:'flex',flexDirection:'row',justifyContent:"space-between"}}>
        <TextInput
          style={styles.inputname}
          placeholder="Pet Gender"
          value={formData.pet_gender}
          onChangeText={(text) =>
            setFormData({ ...formData, pet_gender: text })
          }
        />
        <TextInput
          style={styles.inputnamee}
          placeholder="Pet Weight"
          keyboardType="numeric"
          value={(formData.pet_weight).toString()}
          onChangeText={(text) =>
            setFormData({ ...formData, pet_weight: parseFloat(text) })
          }
        />
         <TouchableOpacity
              style={styles.inputname}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={{fontSize:16,textAlign:"center"}}>{format(formData.birth_date, 'yyyy-MM-dd')}</Text>
            </TouchableOpacity>
            {showDatePicker && (
  <DateTimePicker 
    value={new Date(formData.birth_date)}
    mode="datetime"
    display="default"
    onChange={handleDateChange}
  />
)}
         </View>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleSubmit}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Add Pet
          </Text>
        </TouchableOpacity>
      </View>
   </View>
  );
};
const styles = StyleSheet.create({
  header: {
    height: height * 0.3,
    padding: 5,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  design: {
    backgroundColor: "rgba(255, 195, 104,0.8)",
    width: width * 0.9,
    height: height * 0.2,
    borderBottomLeftRadius: width * 0.4,
    borderBottomRightRadius: width * 0.4,
  },
  selectedImage: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: 10,
    marginVertical: 10,

  },
  choose:{
    width:width*0.15,
    height:width*0.15,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    borderWidth:2,
    borderColor:"#d4d4d4",
    padding:5,
    borderRadius:10
  },
  choosed:{
    width:width*0.15,
    height:width*0.15,
    display:"flex",
    backgroundColor:"#d4d4d4",
    justifyContent:"center",
    alignItems:"center",
    borderWidth:2,
    borderColor:"#d4d4d4",
    padding:5,
    borderRadius:10
  },
  
  userImage: {
    position: "absolute",
    marginTop: width * 0.2,
    borderRadius: width * 0.5,
    width: width * 0.35,
    height: height * 0.16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  pita: {
    marginTop: width * 0.15,
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 25,
  },
  input: {
    backgroundColor: "#d4d4d4",
    width: width * 0.85,
    height: height * 0.07,
    borderRadius: 10,
    textAlign: "center",
    fontWeight:"bold"
    // borderColor: "grey",
    // borderWidth: 2,
    
  },
  inputname: {
    backgroundColor: "#d4d4d4",
    width: width * 0.3,
    height: height * 0.07,
    borderRadius: 10,
    textAlign: "center",
    fontWeight:"bold",
    alignContent:"center",
    justifyContent:"center"
  },
  inputnamee :{
    backgroundColor: "#d4d4d4",
    width: width * 0.22,
    height: height * 0.07,
    borderRadius: 10,
    textAlign: "center",
    fontWeight:"bold",
    alignContent:"center",
    justifyContent:"center"
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
export default AddPet;