import React,{useState,useEffect} from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons"
import Icon from "react-native-vector-icons/FontAwesome"; 
import user from '../../assets/user.jpg'
import Navbar from "../Home/Components/Navbar";
import axios from "axios";
import { port } from "../../port";
import { useSelector } from 'react-redux';
import adpimg from '../../assets/adpimg.png'
import loc from '../../assets/locccc.png'
import star from '../../assets/star.png'
import starempty from '../../assets/starempty.png'

interface UserInfo {
  image:string;

}
interface UserInfoProps {
  image?: string;
  fname?: string;
  lname?: string;
  email?: string;
}
interface EventProps {
    id?:number;
    event_images?: string;
    owner?: any;
    event_description?: string;
    event_title?: string;
  }

const { width, height } = Dimensions.get("screen");
const OneEvent: React.FC<any> = ({route}) => {
    const [one, setOne] = useState<EventProps>({})
    const [inters, setInters] = useState<any>([])
    const [refresh, setRefresh] = useState<Boolean>(false)
    const [interestedUsers, setInterestedUsers] = useState<UserInfoProps[]>([
        { image: "dummy1.jpg", fname: "John", lname: "Doe", email: "john.doe@example.com" },
        { image: "dummy2.jpg", fname: "Jane", lname: "Doe", email: "jane.doe@example.com" },
    
      ]);
      const userData = useSelector((state: RootState) => state.user.userData);
      const {id}=route.params
    useEffect(()=>{
        axios.get(`${port}/api/events/${id}`).then((ress)=>{setOne(ress.data)

        })
        .catch(err=>console.log(err))
        axios.get(`${port}/api/interested/${id}`).then((ress)=>{
            setInters(ress.data.map(e=>e.user.id))

        })
    },[refresh])
      const handleInterestedDelClick = () => {
          axios.delete(`${port}/api/interested/${userData.id}/${id}`).then((ress)=>{
            setRefresh(!refresh)
            console.log(ress);
            
          })
      };
      const handleInterestedAddClick = () => {
        axios.post(`${port}/api/interested`,{
            userId:userData.id,
            eventId:id
        }).then((ress)=>{
          setRefresh(!refresh)
          
        })
    };
      console.log(inters);
      
  return (
    <View style={styles.container}>
    <View style={styles.containerEv}>
      <View>
        {one.event_images&&<Image style={styles.image} source={{uri:one?.event_images[0]}} />}
        <View style={styles.overlay}>
        </View>
      </View>
    </View>  
    <View style={{backgroundColor:"white",marginHorizontal:15,paddingVertical:15,paddingHorizontal:10,borderRadius:15,marginBottom:10}}>
        <View  style={{display:"flex",flexDirection:"row"}}><Text style={{fontSize:17,fontWeight:"bold"}}>Title : </Text><Text style={{fontSize:16}}>{one?.event_title}</Text></View>
        <View  style={{display:"flex",flexDirection:"row",width:width*0.6}}><Text style={{fontSize:17,fontWeight:"bold"}}>Description : </Text ><Text style={{fontSize:16}}>{one?.event_description}</Text></View>
        <View  style={{display:"flex",flexDirection:"row"}}><Image style={{width:width*0.06,height:width*0.06}} source={loc}></Image><Text style={{fontSize:16}}>Alghazala</Text></View>
    </View>
    <View>
        <View style={{backgroundColor:"white",marginHorizontal:15,paddingVertical:15,paddingHorizontal:10,borderRadius:15,marginBottom:10}}>
            <Text style={{fontSize:20,fontWeight:"bold"}}>Organized by</Text>
            <View style={{display:"flex",flexDirection:"row",alignItems:"center",marginHorizontal:10,paddingVertical:10}}>
                <Image style={{width:width*0.15,height:width*0.15, marginRight:35,borderRadius:50}} source={{uri:one?.owner?.image[0]}}></Image>
                <View>
                <Text style={{fontSize:16,fontWeight:"bold"}}>Mr(s) {one?.owner?.fname+" "+one?.owner?.lname}</Text>
                <Text style={{fontSize:15}}>{one?.owner?.email}</Text>
                </View>
                
            </View>
        </View>
      
    </View>
    <View style={{backgroundColor:"white",marginHorizontal:50,borderRadius:15,marginBottom:10,position:"absolute",width:width*0.7,height:height*0.06,bottom:2,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"row",gap:20}}>
        {inters.includes(userData.id)?<TouchableOpacity onPress={()=>{handleInterestedDelClick()}}><Image source={star} style={{width:width*0.07,height:width*0.07}}></Image></TouchableOpacity>:<TouchableOpacity onPress={()=>{handleInterestedAddClick()}}><Image source={starempty} style={{width:width*0.07,height:width*0.07}}></Image></TouchableOpacity>}
            <Text style={{fontSize:17,fontWeight:"bold",color:"#FFC107"}}>Interested</Text>
        </View>
  </View>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerEv: {
        backgroundColor: "#fff",
        borderRadius: 15,
        margin: 15,
        height:height*0.27,
        width:width*0.9,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        borderWidth: 2,
        borderColor: "black",
      },
      image: {
        height:height*0.27,
        width:width*0.9,
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
      blogCard: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        flexDirection: "row",
      },
      authorImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
      },
      blogInfo: {
        flex: 1,
      },
      titleContainer: {
        flexDirection: "row",
        marginBottom: 8,
      },
      authorName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#4e9d91",
        marginRight: 8,
      },
      blogTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
      },
      blogContent: {
        fontSize: 16,
        color: "#555",
      },
});
export default OneEvent;
