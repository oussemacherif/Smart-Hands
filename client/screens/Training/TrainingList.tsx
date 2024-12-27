import React ,{useEffect,useState}from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
 
  TouchableOpacity,


} from "react-native";


const { width, height } = Dimensions.get("screen");
import { Ionicons } from "@expo/vector-icons"
import LFPost from "./lfPost";
const TrainingList: React.FC <{navigation:any}> = ({navigation}) => {
  const [lfdata,setLfdata]=useState([])
  const [active,setActive]=useState(0)

  useEffect(() => {
    navigation.setOptions({
      title: `Training List`,
      headerStyle: {
        backgroundColor: '#4e9d91',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          
        >
          <Ionicons name="add" size={27} color="white" onPress={()=>{console.log("add ");
          }} />
        </TouchableOpacity>)
    });
  }, [navigation]);





 
  return (
    <View style={styles.alllf}>
      <View style={styles.search}>
      <TouchableOpacity onPress={()=>{setActive(0)}} style={active==0?styles.btact:styles.bt} >
          <View>
            <Text style={active==0?styles.textact:styles.text}>All</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setActive(1)}} style={active==1?styles.btact:styles.bt} >
          <View>
            <Text style={active==1?styles.textact:styles.text}>Online</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setActive(2)}} style={active==2?styles.btact:styles.bt}>
          <View>
            <Text style={active==2?styles.textact:styles.text}>In Presence</Text>
          </View>
        </TouchableOpacity>
      </View>
       <View style={styles.line} />
          <ScrollView style={styles.apdpostes}>
            {lfdata.map((el,i)=>(<LFPost key={i} i={i} el={el}/>))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  cancelButton: {
    backgroundColor: "#e3edfb", 
    borderRadius: 20,
    padding: 15, 
    alignItems: "center",
    justifyContent: "center", 
    marginTop: 10, 
  },
  AddLA: {
    backgroundColor: "#e3edfb",
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
    fontSize: 16, 
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
export default TrainingList;
