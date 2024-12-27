import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { port } from "../../../port";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import teacher from "../../../assets/teacher.png"
import doctor from "../../../assets/doctor.png"
import trainer from "../../../assets/coach.png"
import training from "../../../assets/training-course.png"
import volunteer from "../../../assets/volunteer.png"
const { width, height } = Dimensions.get("screen");



const AllServices: React.FC = () => {
  const [serviceData, setServiceData] = useState<Services[] | []>([]);
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [modalImage, setModalImage] = useState(null); 
  const navigation=useNavigation()


  const handleLongPress = (imageSource) => {
    setModalImage(imageSource); 
    setModalVisible(true); 
  };

  const closeModal = () => {
    setModalVisible(false); 
    setModalImage(null);
  };

  const handleOverlayPress = () => {
    closeModal(); 
  };

  return (
    <View style={styles.UsersServices}>
          <View  key ={0}>
            <View style={{borderColor:"#d5eef6",borderWidth:1,borderRadius:25}}>
            <TouchableOpacity onPress={()=>{
              navigation.navigate(...["DynamicScreenAllServices", {serviceId : serviceData[0]?.id}] as never )}} 
              style={styles.Service}>
              <Image
                style={styles.images}
                source={doctor}
              ></Image>
            </TouchableOpacity>
            </View>
            <Text style={styles.item}>{"Medecin"}</Text>
          </View>
          <View  key ={1}>
            <View style={{borderColor:"#fbe3e3",borderWidth:1,borderRadius:25}}>
            <TouchableOpacity onPress={()=>{
              navigation.navigate(...["DynamicScreenAllServices", {serviceId : serviceData[1]?.id}] as never )}} 
              style={styles.Service1}>
              <Image
                style={styles.images}
                source={teacher}
              ></Image>
            </TouchableOpacity>
            </View>
            <Text style={styles.item}>{"Enseignant"}</Text>
          </View>

          <View  key ={2}>
            <View style={{borderColor:"#f9efcb",borderWidth:1,borderRadius:25}}>
            <TouchableOpacity onPress={()=>{
              navigation.navigate(...["DynamicScreenAllServices", {serviceId : serviceData[2]?.id}] as never )}} 
              style={styles.Service2}>
              <Image
                style={styles.images}
                source={trainer}
              ></Image>
            </TouchableOpacity>
            </View>
            <Text style={styles.item}>{"Formateur"}</Text>
          </View>
          <View  key ={4}>
            <View style={{borderColor:"#f8e3fb",borderWidth:1,borderRadius:25}}>
            <TouchableOpacity onPress={()=>{
              navigation.navigate(...["DynamicScreenAllServices", {serviceId : serviceData[4]?.id}] as never )}} 
              style={styles.Service4}>
              <Image
                style={styles.images}
                source={volunteer}
              ></Image>
            </TouchableOpacity>
            </View>
            <Text style={styles.item}>{"Volunteer"}</Text>
          </View>
          <View  key ={3}>
            <View style={{borderColor:"#e3edfb",borderWidth:1,borderRadius:25}}>
            <TouchableOpacity onPress={()=>{
              navigation.navigate(...["DynamicScreenAllServices", {serviceId : serviceData[3]?.id}] as never )}} 
              style={styles.Service3}>
              <Image
                style={styles.images}
                source={training}
              ></Image>
            </TouchableOpacity>
            </View>
            <Text style={styles.item}>{"Centre Formation"}</Text>
          </View>
          
          {/* <View  key ={serviceData[5]?.id}>
            <View style={{borderColor:"#d5eef6",borderWidth:1,borderRadius:25}}>
            <TouchableOpacity onPress={()=>{
              navigation.navigate("Events"as never )}} 
              style={styles.Service}>
              <Image
                style={styles.images}
                source={{ uri: serviceData[5]?.service_image }}
              ></Image>
            </TouchableOpacity>
            </View>
            <Text style={styles.item}>{serviceData[5]?.service_name}</Text>
          </View> */}
      
    </View>
  );
};
const styles = StyleSheet.create({
  UsersServices: {
    marginTop:100,
    paddingTop: 20,
    display: "flex",
    marginHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingBottom: 75,
  },
  item: {
    display: "flex",
    textAlign: "center",
    color: "grey",
    marginBottom:10
  },
  Service: {
    backgroundColor: "#d5eef6",
    width: width * 0.29,
    height: width * 0.29,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    margin: 5,
    display: "flex",
  },
  Service1: {
    backgroundColor: "#fbe3e3",
    width: width * 0.29,
    height: width * 0.29,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    margin: 5,
    display: "flex",
  },
  Service2: {
    backgroundColor: "#f9efcb",
    width: width * 0.29,
    height: width * 0.29,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    margin: 5,
    display: "flex",
  },
  Service3: {
    backgroundColor: "#e3edfb",
    width: width * 0.29,
    height: width * 0.29,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    margin: 5,
    display: "flex",
  },
  Service4: {
    backgroundColor: "#f8e3fb",
    width: width * 0.29,
    height: width * 0.29,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    margin: 5,
    display: "flex",
  },
  images: {
    width: width * 0.2,
    height: height * 0.09,
  },
});
export default AllServices;
