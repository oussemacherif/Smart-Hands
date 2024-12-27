import React from 'react';
import { View, Image, StyleSheet, Dimensions,TouchableOpacity} from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";

import location from "../../../assets/maps-and-flags.png";
import Home from "../../../assets/homevert.png";
import message from "../../../assets/community.png";
import chatbot from "../../../assets/chatbotgris.png";
import signlanguage from "../../../assets/signlanguagegris.png";
import user from "../../../assets/usernav.png";
import { useSelector } from 'react-redux';
import {AntDesign} from 'react-native-vector-icons'
const { width, height } = Dimensions.get('screen');

///#DFBDE7
const Navbar: React.FC = (): React.ReactElement => {
    const navigation = useNavigation();
    // const route = useRoute()
    const userImage = useSelector((state: RootState) => state.user?.userData?.image);
    // const isWelcomeScreen = route.name === "Welcome1" 

    // if (isWelcomeScreen) {
    //     return null;
    //   }
    const provider=""
    const handelNav=()=>{
        user?navigation.navigate("UserProfile" as never):
        provider?navigation.navigate("ProviderProfile" as never):
        navigation.navigate("Login" as never)
    }
  
    return (

        <View style={styles.navbar}>
            <TouchableOpacity onPress={()=>{navigation.navigate("Home" as never)}}><Image source={Home} style={styles.iconHome} /></TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate("Translator" as never)}}><Image source={signlanguage} style={styles.icontraduction} /></TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate("ChatBot" as never)}}><Image source={chatbot} style={styles.iconloc} /></TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate("Community" as never)}}><Image source={message} style={styles.iconImage} /></TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate("Map" as never)}}><Image source={location} style={styles.iconloc} /></TouchableOpacity>
            <TouchableOpacity onPress={()=>{handelNav()}}><Image source={{uri:"https://cdn-icons-png.flaticon.com/512/149/149071.png"}} style={styles.iconProfile} /></TouchableOpacity>

        </View>
      

    );
};

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        flexDirection: 'row',
        width: width*0.9,
        marginHorizontal:17,
        height: height * 0.077,
        borderRadius: 40,
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderColor: '#4e9d91', 
        borderWidth: 1, 
        padding:10,
        position: 'absolute', 
        bottom: 4,

        
        
    },
    iconloc:{
        width: width*0.075,
        height: height*0.035,
        marginHorizontal: 18, 

    },
    icontraduction:{
        width: width*0.085,
        height: height*0.037,
        marginHorizontal: 18, 

    },
    iconHome:{
        width: width*0.075,
        height: height*0.035,
        marginHorizontal: 18, 

    },
    iconImage: {
        width: width*0.075,
        height: height*0.047,
        marginHorizontal: 18, 
    },
    iconProfile:{
        width: width*0.085,
        height: width*0.085,
        marginHorizontal: 18, 
        borderRadius:50
    }
});

export default Navbar;
