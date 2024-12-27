import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text,StyleSheet ,Dimensions,Image,TouchableOpacity, InteractionManager} from 'react-native';
import logOut from '../../../assets/logout.png'
import email from '../../../assets/email.png'
import edit from '../../../assets/edit.png'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import useLogout from './LogoutButton';

interface UserInfoProps {
    UserInf: {
        fname:string;
        lname:string;
        email:string
        
    };
  }

const { width, height } = Dimensions.get('screen')

const UserInfo: React.FC<UserInfoProps> = ({UserInf}) => {

   const navigation=useNavigation()
   const logout = useLogout({ navigation });
    return (
        <View style={styles.petContainer}>
            <View style={styles.UserNameContainer}>
                <Text style={{fontWeight:"bold",fontSize:20}}>{UserInf.fname+" "+UserInf.lname}</Text>
                <TouchableOpacity style={styles.logout} onPress={logout}>
                <Image style={{width:width*0.05,height:height*0.022}} source={logOut}></Image>
                    <Text style={{color:"#e64d4d"}}>Log out</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.UserNameContainer}>
            <View style={styles.userEmail}>
                <Image style={{width:width*0.055,height:height*0.0185}} source={email}></Image>
                <Text>{UserInf?.email}</Text>
            </View>
            <TouchableOpacity onPress={()=>{navigation.navigate('EditProfile' as never)}} ><Image style={{width:width*0.08,height:height*0.035}} source={edit}></Image></TouchableOpacity>
            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    UserNameContainer: {
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        padding:7
    },
    logout : {
        display:"flex",
        alignItems:"center",
        flexDirection:"row",
        gap:10,
       },
        userEmail: {
        display:"flex",
        alignItems:"center",
        flexDirection:"row",
        gap:10,
        paddingHorizontal:25,
        paddingVertical:10
       },
    petContainer :{
        backgroundColor:"white",
        marginVertical:7,
        marginHorizontal:20,
        borderRadius:20,
        padding:10,
    }

})


export default UserInfo;

