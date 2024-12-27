import React,{useState,useEffect} from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import UserPets from "./component/UserPets";
import UserInfo from "./component/UserInfo";
import user from '../../assets/user.jpg'
import Navbar from "../Home/Components/Navbar";
import axios from "axios";
import { port } from "../../port";
import { useSelector } from 'react-redux';
interface UserInfo {
  image:string;

}
interface UserInfoProps {
  image?: string;
  fname?: string;
  lname?: string;
  email?: string;
}

const { width, height } = Dimensions.get("screen");
const UserProfile: React.FC = () => {
  const userData = useSelector((state: RootState) => state.user?.userData);
  
  return (
    <View style={styles.container}>
    <ScrollView>
        <View><Image style={{width:width*1,height:height*0.35}} source={{uri:userData?.image}}></Image></View>
      <View style={styles.UsersProfile}>
        <UserInfo UserInf={userData}  />
        <UserPets pets={userData?.pets}/>
      </View>
    </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
  UsersProfile: {
    display: "flex",
  },
});
export default UserProfile;
