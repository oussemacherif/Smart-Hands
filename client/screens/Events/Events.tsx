import React, { useState ,useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import Pet from '../../assets/peticon.png'

import { FontAwesome } from "@expo/vector-icons";
import chien from "../../assets/chien.jpg";
import * as Location from "expo-location";
import axios from "axios";
import { port } from "../../port";
const { width, height } = Dimensions.get("screen");
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import * as ImagePicker from 'expo-image-picker'; 
import { useSelector } from "react-redux";

const EventCard = ({navigation}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [allEvent,setAllEvent]=useState([])

  const eventLocation = useSelector(
    (state:any) => state.location.selecteEventLocation
  ) || { longitude: '', latitude: '' };

  const [latitude,setLatitude]=useState(eventLocation.latitude+"")



  const [form, setForm] = useState({
    event_title: '',
  event_description: '',
  event_images: [],
  event_date: Date.now(),
  event_langitude:eventLocation.longitude,
  event_lattitude:eventLocation.latitude ,
  email: "",
  status: 'On Hold',
  })
  const [selectedImage, setSelectedImage] = useState(null);
// console.log(form.event_images,"image")

  const selectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission Denied', 'Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.canceled === true) {
      return;
    }

    setForm({ ...form, event_images:[ (pickerResult as any).uri ]});
    setSelectedImage((pickerResult as any).uri);

  };
  // console.log(form,"form")

const [loc,setLoc]=useState("")
// console.log(loc,"loc")
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const token = useSelector((state: RootState) => state.auth.authToken);
  
  

const getAllevent=async()=>{
  try {
    const getEvent=await axios.get(`${port}/api/events`,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    console.log("events",getEvent.data);
    

    setAllEvent(getEvent.data)
    // console.log("allevents",getEvent.data[0]);
    
  } catch (error) {
    console.log(error)
  }
}
const createEvent = async () => {
  setForm({
    ...form,
    event_lattitude: eventLocation.latitude + "",
    event_langitude: eventLocation.longitude + "",
  });

  try {
    const latit = form.event_langitude 
    console.log("latitude ",latit);
    
    const created = await axios.post(`${port}/api/events}`, form);

    console.log("Event created successfully:", created.data);

    Alert.alert("Success", "You successfully created your event");
  } catch (error) {
    console.error("Error creating event:", error);

    if (error.response) {
     
      console.error("Server responded with an error status:", error.response.data);
      Alert.alert("Error", `Server responded with an error: ${error.response.data}`);
    } else if (error.request) {
 
      console.error("No response received from the server:", error.request);
      Alert.alert("Error", "No response received from the server");
    } else {
      
      console.error("Error setting up the request:", error.message);
      Alert.alert("Error", `An error occurred: ${error.message}`);
    }
  }
};

  useEffect(() => {
 
    getUserLocationAndNearestAddress();
    getAllevent()
  }, [eventLocation.latitude,eventLocation.longitude,loc]);
  const getUserLocationAndNearestAddress = async () => {
    try {
      const nearestAddressResponse = await Location.reverseGeocodeAsync({
        latitude: JSON.parse(eventLocation.latitude),
        longitude: JSON.parse(eventLocation.longitude),
      });
  
      if (nearestAddressResponse.length > 0) {
        const nearestAddress = nearestAddressResponse[0];
        const place = `${nearestAddress.city}${nearestAddress.region} ${nearestAddress.country}`;
        setLoc(place);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  
  const handleAddEvent = () => {
    createEvent();  

    toggleModal();  
  };
  const convertAdress = async (latitude, longitude) => {
  try {
    const parsedLatitude = parseFloat(JSON.parse(latitude));
    
    const parsedLongitude = parseFloat(JSON.parse(longitude));

    if (isNaN(parsedLatitude) || isNaN(parsedLongitude)) {
      throw new Error('Invalid latitude or longitude values.');
    }

    const nearestAddressResponse = await Location.reverseGeocodeAsync({
      latitude: parsedLatitude,
      longitude: parsedLongitude,
    });

    const nearestAddress = nearestAddressResponse[0];
    const place = `${nearestAddress.city} ${nearestAddress.region} ${nearestAddress.country}`;
    // console.log("place",place); return valid place
    
    return place;
  } catch (error) {
    console.error('Error converting address:', error);
    return null; // or throw the error if needed
  }
};
  


  // const handleInputChange = (e:any,content:any):any => {
 
  //   setForm({...form,content:e});
  // };
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate !== undefined && event.type !== "dismissed") {
      // handleInputChange({ target: { name: "event_date", value: selectedDate } });
      setForm({...form,event_date:selectedDate})
    }
  };
  
  return (
    <ScrollView>
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
          <Text style={styles.addButtonText}>Add Event</Text>
        </TouchableOpacity>
      </View> */}
{allEvent.map((e,i)=>{
  const convertAddressText :any= convertAdress(e.event_lattitude, e.event_langitude);

  return(


      <View key={i} style={[styles.container, styles.customStyle]}>
  
<Image style={styles.image} source={{uri:e.event_images[0]}} />
{/* {e.event_images[0] && typeof e.event_images[0] === 'string' ? (
      <Image style={styles.image} source={{ uri: e.event_images[0] }} />
    ) : (
      <Text>Invalid Image Source</Text>
    )} */}
          <View style={styles.overlay}>
            <View style={styles.createdByContainer}>
              <View><Text style={styles.createdBy}>{e?.owner?.fname+" "+e?.owner?.lname}</Text></View>
              <TouchableOpacity onPress={()=>{navigation.navigate(...["Event",{id:e.id}])}}>
              <Text style={styles.createdBy}>See More</Text>
              </TouchableOpacity>
            </View>
          </View>

        {/* {showDetails && (
          <View style={styles.content}>
            <Text style={[styles.title, styles.customText]}>Event Title : {e.event_title}</Text>
            <Text style={[styles.title, styles.customText]}>Event Description : {e.event_description}</Text>
            <Text style={[styles.title, styles.customText]}>Event Date:{e.createdAt.slice(0,10)}</Text>
            <Text style={[styles.title, styles.customText]}>Adress:</Text>
          </View>
        )} */}
      </View>
)})}
      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <TouchableOpacity  style={styles.userImage}  onPress={selectImage}>
     
     {form.event_images.length>0 ? <Image source={{ uri: selectedImage}}  style={{borderRadius:width*0.2,  width:width*0.35,
  height:height*0.16,}} />:<Image source={ Pet}   style={{borderRadius:width*0.2,  width:width*0.35,
    height:height*0.16,}} />}
      </TouchableOpacity>
            <TextInput  
               
                 value={form.event_title}
                 onChange={(event) => setForm({ ...form, event_title: event.nativeEvent.text })}
                 
            style={styles.input} placeholder="Event Title" />
            <TextInput value={form.event_description}
  onChange={(event) => setForm({ ...form, event_description: event.nativeEvent.text })} 
             style={styles.input} placeholder="Event Description" />
             <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker(true)}
            >
              <Text     style={{fontSize:16}}>{format(form.event_date, 'yyyy-MM-dd')}</Text>
            </TouchableOpacity>
            {showDatePicker && (
  <DateTimePicker 
    value={new Date(form.event_date)}
    mode="datetime"
    display="default"
    onChange={handleDateChange}
  />
)}

{eventLocation.longitude==="" && eventLocation.latitude==="" ? (
          <Pressable
            onPress={() => 
              
          {    setShowModal(false)
            navigation.navigate("MapForEvent")}
              
            }
          >
            {/* <Loc style={styles.icon} /> */}
            <Text>Use Your Event Location </Text>
          </Pressable>
        ) : (
          <Text style={styles.locationText}>{loc}</Text>
        )}
            <TouchableOpacity style={styles.addButton} 
      onPress={() => handleAddEvent()}
              >
              <Text style={styles.addButtonText}    >Add  Event</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 15,
    margin: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  userImage:{
  
    borderRadius:width*0.5,
    width:width*0.35,
    height:height*0.16,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"red"
   },
  image: {
    width: "100%",
    height: height * 0.3,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
    padding: 15,
    borderRadius: 15,
  },
  createdByContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  createdBy: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  profileIcon: {
    marginRight: 10,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFA500", 
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333333", 
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333333", 
  },
  status: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333333", 
  },
  customStyle: {
    borderWidth: 2,
    borderColor: "black",
  },
  customText: {
    color: "#333333", 
    fontSize: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#4e9d91", 
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: width * 0.8,
    alignItems: "center",
    height:height*0.5,
    flexDirection:"column",
    justifyContent:"center",
    alignContent:"center",
    gap:10,
   

  },
  input: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: "100%",
    paddingLeft: 10,
    justifyContent:"center",
    alignItems:"center"
  },
  inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start", 
    
      borderWidth: 1,
      borderRadius: 12,
      padding: 5,
      borderColor: "#ddd",
    },
    
  mapMarkerIcon: {
    fontSize: 30,
    color: "#333333", 
  },
  locationText: {
    fontSize: 18,
    color: "#333333", 
  
  },
});
export default EventCard;
