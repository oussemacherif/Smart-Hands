
import React from "react"
import {View,Text,StyleSheet,Dimensions,Image, ScrollView, TouchableOpacity} from "react-native"
const { width, height } = Dimensions.get('screen');
import chien from "../../assets/chien.jpg"
import Svg, { Path, G } from 'react-native-svg';
import loc from "../../assets/locccc.png"
import userim from "../../assets/user.jpg"
import umsg from "../../assets/bulle.png"
import { useNavigation } from "@react-navigation/native";
const AdoptationDetails=({route})=>{
        const {petData}=route.params
        const navigation=useNavigation()
        
    return(
<ScrollView  style={styles.allPages}>
<Image style={styles.animalImage} source={{uri:petData.pet_images[0]}}></Image>
<View  style={{padding:20,borderRadius:20,backgroundColor:"white",marginTop:350}}>
  <View style={{display:"flex",flexDirection:"row"}}>
<View >
    <Text style={{fontSize:24,color:"black",marginBottom:20}}>{petData.pet_name}</Text>

</View>
<View style={{display:"flex",flexDirection:"row",gap:5,position:"absolute",top:2,right:5}}>
<Image style={{width:width*0.05,height:height*0.03}} source={loc}></Image>
<Text>Location </Text>
</View>
</View>

    <View  style={{flexDirection:"row",justifyContent:"center",alignItems:"center",gap:18,paddingHorizontal:20,paddingVertical:10}}>
<View  style={{backgroundColor:"#e2e8fe",width:width*0.25,height:height*0.08,justifyContent:"center",alignItems:"center",borderRadius:10}}>
    <Text>Gender</Text>
    <Text  style={{color:"black",fontWeight:"bold",marginTop:7}}>{petData.pet_gender}</Text>
</View>
<View  style={{backgroundColor:"#ffd9d8",width:width*0.25,height:height*0.08,justifyContent:"center",alignItems:"center",borderRadius:10}}>
    <Text>Birth Date</Text>
    <Text   style={{color:"black",fontWeight:"bold",marginTop:7}}>{petData.birth_date.slice(8,10)+"-"+petData.birth_date.slice(5,7)+"-"+petData.birth_date.slice(0,4)}</Text>
</View>
<View  style={{backgroundColor:"#dbf4cf",width:width*0.25,height:height*0.08,justifyContent:"center",alignItems:"center",borderRadius:10}}>
    <Text>weight</Text>
    <Text  style={{color:"black",fontWeight:"bold",marginTop:7}}>{petData.pet_weight}kg</Text>
</View>
    </View>
    <View style={{backgroundColor:"grey",width:width*0.9,height:height*0.001,marginBottom:10}}></View>
    <View><Text  style={{fontSize:17,fontWeight:'bold',marginBottom:10}}>Owner Details</Text></View>
    <View style={{display:"flex",flexDirection:"row",marginBottom:20}}>
      <Image style={{width:width*0.15,height:width*0.15,borderRadius:50}} source={{uri:petData.user?.image}}></Image>
      <TouchableOpacity onPress={()=>{navigation.navigate(...["OtherProfile",{id:petData.user?.id}] as never)}} style={{marginLeft:15,marginTop:5}}><Text style={{fontSize:15,fontWeight:'bold'}}>{petData.user?.fname+" "+petData.user?.lname}</Text>
      <Text>{petData.user?.email}</Text></TouchableOpacity>
      <TouchableOpacity onPress={()=>{navigation.navigate(...["ChatPage",{receiver:petData.user.id}] as never)}} style={{position:"absolute",top:15,right:25}}>
      <View><Image style={{width:width*0.07,height:width*0.07}} source={umsg}></Image></View>
      </TouchableOpacity>
      </View>
         <View style={{backgroundColor:"grey",width:width*0.9,height:height*0.001,marginBottom:20}}></View>
    <View  style={{width:width*0.9,height:height*0.14,gap:10}}>
        <Text  style={{fontSize:17,fontWeight:'bold'}}>About {petData.pet_name}</Text>
        <Text>{petData.pet_description}</Text>
    </View>
    </View>

</ScrollView>


    )
}
const styles = StyleSheet.create({
    allPages: {
  padding:1,
  width:width,
  height:height,
  flexDirection:"column",
    },
    animalImage:{
      position:'absolute',
        width:width,
        height:height*0.5,
        backgroundColor:"#ffc368",

    }
 
  });
  



export default AdoptationDetails