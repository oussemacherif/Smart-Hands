import React ,{useEffect,useState}from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,

} from "react-native";
import { format } from "date-fns";
import {port } from '../../port'
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import chien from "../../assets/chien.jpg";
import like from "../../assets/coeur.png"
import likeact from "../../assets/likeact.png"
import commenter from "../../assets/commenter.png"
import messager from "../../assets/messager.png"
const { width, height } = Dimensions.get("screen");
import { Ionicons } from "@expo/vector-icons"
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const LFPost: React.FC <any>= ({el,i}): React.ReactElement => {
    const [likesCount,setLikesCount]=useState(0)
    const [coCount,setCoCount]=useState(0)
    const [likers,setLikers]=useState([])
    const [com,setCom]=useState([])
    const [refresh,setRefresh]=useState(false)
    const navigation=useNavigation()
    // const userData = useSelector((state: RootState) => state.user.userData);
    useEffect(()=>{
      //   axios.get(`${port}/api/likes/${el.id}`).then((ress)=>{
      //       setLikesCount(ress.data.length);
      //       setLikers(ress.data.map(el=>el.user.id))
      //   })
      //   axios.get(`${port}/api/comments/${el.id}`).then((ress)=>{
      //     setCoCount(ress.data.length);
      //     setCom(ress.data)
         
          
      // })
    },[refresh])
    // const handleDelete=async()=>{
    //  const del=await axios.delete(`${port}/api/likes/${el.id}/${userData.id}`)
    //  setRefresh(!refresh)
    // }

    // const handleAdd=async()=>{
    //   const del=await axios.post(`${port}/api/likes`,{
    //     userId:userData.id,
    //     lfaId:el.id
    // })
    // setRefresh(!refresh)
    //  }
    //  const Upadate=()=>{setRefresh(!refresh)}

  return (
<View key={i} style={{padding:1,marginBottom:30,backgroundColor:"white",borderRadius:20}}>
<View style={styles.onepost}>
  <Image style={styles.image} source={{uri:el?.user?.image}}></Image>
  <View  style={{width:width*0.45,marginLeft:10}}>
    <TouchableOpacity onPress={()=>{navigation.navigate(...["OtherProfile",{id:el?.user?.id}] as never)}}>
      <View>
        <Text style={{fontSize:20,fontWeight:"bold"}}>{el?.user?.fname+" "+el?.user?.lname}</Text>
      </View>
      <View>
        <Text>{el.createdAt.slice(8,10)+"/"+el.createdAt.slice(5,7)+"/"+el.createdAt.slice(0,4)}</Text>
      </View>
    </TouchableOpacity>
  </View>
</View>
<View style={{marginHorizontal:20,marginBottom:10}}>
  <Text>{el.pet_description}</Text>
</View>
<View style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
  <Image style={{width:width*0.9,height:height*0.27,borderRadius:25}} source={{uri:el?.pet_images[0]}}></Image>
</View>
<View style={{display:"flex",flexDirection:"row",marginHorizontal:20,marginVertical:10,justifyContent:"space-between"}}>
  {likers.includes(parseInt("1"))?
<TouchableOpacity  style={{display:"flex",flexDirection:'row',alignItems:"center",gap:4}}>
  <Image style={{width:width*0.075,height:width*0.075}} source={likeact}></Image>
  <Text>{likesCount} Likes</Text>
  </TouchableOpacity>:<TouchableOpacity  style={{display:"flex",flexDirection:'row',alignItems:"center",gap:4}}>
  <Image style={{width:width*0.075,height:width*0.075}} source={like}></Image>
  <Text>{likesCount} Likes</Text>
  </TouchableOpacity>}
  <TouchableOpacity onPress={()=>{navigation.navigate(...["comment",{cmnts:com,postInfo:el,}] as never )}}  style={{display:"flex",flexDirection:'row',alignItems:"center",gap:4}}>
    <Image style={{width:width*0.065,height:width*0.065}} source={commenter}></Image>
    <Text>{coCount} Comments</Text></TouchableOpacity>
  <TouchableOpacity onPress={()=>{navigation.navigate(...["ChatPage",{receiver:el.user.id}] as never)}} style={{display:"flex",flexDirection:'row',alignItems:"center",gap:4}}>
    <Image style={{width:width*0.08,height:width*0.08}} source={messager}></Image>
    <Text>message</Text>
    </TouchableOpacity>
  </View>
</View>
);
};
const styles = StyleSheet.create({
  cancelButton: {
    backgroundColor: "orange", 
    borderRadius: 20,
    padding: 15, 
    alignItems: "center",
    justifyContent: "center", 
    marginTop: 10, 
  },
  AddLA: {
    backgroundColor: "orange",
    borderRadius: 20,
    padding: 15, 
    alignItems: "center",
  },
  alllf: {
    height: height*1.1,
    backgroundColor:"white"
  },
  search: {
    backgroundColor: "#fff",
    height: height * 0.1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  text:{
    color: "#4e9d91",
   fontSize: 17 
  },
  textact:{
    color: "#fff",
    fontSize: 17 
  },
  bt: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical:10,
    paddingHorizontal:18,
    borderRadius: 25,
    borderWidth:1.5,
    borderColor:"#4e9d91"
  },
  btact: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4e9d91",
    paddingVertical:10,
    paddingHorizontal:18,
    borderRadius: 25,
    borderWidth:1.5,
    borderColor:"#4e9d91"
  },
  apdpostes: {
    backgroundColor: "#fff",
    display: "flex",
    padding: 5,
    marginBottom:200
  },
  onepost: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 5,
    
  },
  image: {
    width: width * 0.15,
    height: width * 0.15,
    margin: 10,
    borderRadius: 50,
    borderWidth:3,
    borderColor:"#e3edfb"
  },
  found: {
    display: "flex",
    justifyContent:"center",
    alignItems: "center", 
    marginBottom: 20,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical:5, 
    marginLeft:22,
    borderWidth:1.5,
    borderColor:'green',
    color:"green"
  },
  lost:{
    display: "flex",
    justifyContent:"center",
    alignItems: "center", 
    marginBottom: 20,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical:5, 
    marginLeft:30,
    borderWidth:1.5,
    borderColor:'red',
    color:"red"
  },
  statusText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold", 
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#4e9d91',
    backgroundColor:"#fff",
    paddingVertical: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: width * 0.7,
    height: height * 0.7,
    alignSelf: 'center', 
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc", 
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 15, 
    fontSize: 16, // Increase font size
  },
  saveButton: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize:18
  },
  imageButton: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  imageButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  headerButton: {
    marginRight: 15,
  },
});
export default LFPost;
