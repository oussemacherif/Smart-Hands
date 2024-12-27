import React,{useState,useEffect} from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import female from "../../../assets/femalee.png";
import male from "../../../assets/malee.png";
const { width, height } = Dimensions.get("screen");
import chien from "../../../assets/chien.jpg";
import exem from "../../../assets/exemple.png";
import exem1 from "../../../assets/exemple1.png";
import { port } from "../../../port";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";

const CartAdoptation: React.FC <any>= ({el}:any): React.ReactElement => {
  const navigation=useNavigation()
  return (
    <View key={el.id} style={styles.allPages}>
      <TouchableOpacity style={{marginBottom:25}} onPress={()=>navigation.navigate(...["AdoptationDetails",{petData:el}]as never)}>
    <View style={styles.allPag}>
      <Image source={{uri:el.pet_images[0]}} style={styles.animalPicture}></Image>
        <View style={{marginLeft:10}} >
        <Text style={{fontSize:18,fontWeight:"bold",marginBottom:10}}>{el.pet_name}</Text>
        <Text style={{marginBottom:10}}>{el.createdAt.slice(8,10)+"-"+el.createdAt.slice(5,7)+"-"+el.createdAt.slice(0,4)}</Text>
        <Text >location</Text>
      </View>
      <Image style={{width:width*0.11,height:width*0.11,position:"absolute",top:6,right:12}} source={el.pet_gender==="Male"?male:female}></Image>
    </View>
    </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  allPages: {
    padding: 10,
    justifyContent: "space-between",
    columnGap: 10,
    rowGap: 10,
  },
  allPag: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    width: width * 0.93,
    height: height * 0.16,
    gap: 7,
    borderRadius: 15,
    borderColor:"black",
  },
  animalPicture: {
    width: width * 0.35,
    height: width * 0.39,
    borderRadius: 15,
    
  },
  description: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap:10
    
  },
});
export default CartAdoptation;
