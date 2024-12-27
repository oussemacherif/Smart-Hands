import React ,{useEffect, useState}from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  
} from "react-native";
// import CartAdoptation from "../Components/CartAdoptation";
import CartAdoptation from "../Adoptation/Components/CartAdoptation";
import dog from "../../assets/dogcategories.png";
import cat from "../../assets/catcategory.png";
import bird from "../../assets/birdcategory.png";
import fish from "../../assets/fishcategory.png";
import { Ionicons } from "@expo/vector-icons"
import Svg, { Rect, Path } from 'react-native-svg';
import { port } from "../../port";
import axios from "axios";
import {getOneAnimal} from "../../store/adaptSlice"
import { useDispatch,useSelector} from "react-redux";
import formation from "../../assets/formation.jpg"
import online from "../../assets/online.jpg"
import offline from "../../assets/offline.jpg"
import sign from "../../assets/signlan.png"
import science from "../../assets/science.png"
import religion from "../../assets/islam.png"
import culture from "../../assets/culture.png"
import ASL from "../../assets/Asl.png"
import signCours from "../../assets/signcours.jpg"
import quran from "../../assets/quran.png"



import chien from "../../assets/chien.jpg";

const { width, height } = Dimensions.get("screen");
interface Animal {
  id:number,
  pet_name: string;
  pet_weight: number;
  pet_gender: string;
  pet_race: string;
  pet_images: string[]; 
  birth_date: Date | null;
  pet_description: string;
  status:  'Adopted' | 'Not Adopted';
}

const OffLine: React.FC<any> = ({route,navigation:any}): React.ReactElement => {
  
const dispatch=useDispatch()
  const [adaptationTable,setAdaptationTable]=useState([])
const [element,setElement]=useState({})
const [active,setActive]=useState(0)
const token = useSelector((state: RootState) => state.auth.authToken);

const getAllAdapt=async ()=>{
try {
  const get=await axios.get(`${port}/api/Adp`,{
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  setAdaptationTable(get.data)
} catch (error) {
  console.log(error)
}

}
useEffect(() => {
  navigation.setOptions({
    title: `Cours`,
    headerStyle: {
      backgroundColor: '#4e9d91',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });
}, []);
const getAllDogs=async ()=>{
  try {
    const get=await axios.get(`${port}/api/Adp`,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    setAdaptationTable(get.data.filter((el)=>el.pet_race=="Dog"))
  } catch (error) {
    console.log(error)
  }
  
  }
  const getAllCates=async ()=>{
    try {
      const get=await axios.get(`${port}/api/Adp`,{
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      setAdaptationTable(get.data.filter((el)=>el.pet_race=="Cat"))
    } catch (error) {
      console.log(error)
    }
    
    }
    const getAllFishs=async ()=>{
      try {
        const get=await axios.get(`${port}/api/Adp`,{
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        setAdaptationTable(get.data.filter((el)=>el.pet_race=="Fish"))
      } catch (error) {
        console.log(error)
      }
      
      }
      const getAllBirds=async ()=>{
        try {
          const get=await axios.get(`${port}/api/Adp`,{
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
          setAdaptationTable(get.data.filter((el)=>el.pet_race=="Bird"))
        } catch (error) {
          console.log(error)
        }
        
        }
useEffect(()=>{
  active===0?getAllAdapt():
  active===1?getAllDogs():
  active===2?getAllCates():
  active===3?getAllBirds():getAllFishs()
},[active,route.params])

console.log(adaptationTable)
const navigation=useNavigation()
  return (
    <ScrollView style={{backgroundColor:"#ffffff"}} >
 <View style={{backgroundColor:"#ffffff",paddingBottom:10,borderBottomWidth:1,borderColor:"#4e9d91"}}>
 
{/* <TouchableOpacity
  style={{
    marginTop: 22,
    backgroundColor: '#4e9d91',
    borderRadius: 50,
  }}
  onPress={() => {
    navigation.navigate("LostFound" as never);
  }}
>
  <View style={styles.container}>
    <Image style={styles.image} source={online}></Image>
  </View>
  <View
    style={{
      backgroundColor: "#4e9d91",
      marginTop: 40,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      borderRadius:40
    }}
  >
    <Text style={{ textAlign: 'center', color: 'white',fontSize:20 }}>Cours en Ligne</Text>
  </View>
</TouchableOpacity>
<TouchableOpacity
  style={{
    marginTop: 22,
    backgroundColor: '#4e9d91',
    borderRadius: 50,
  }}
  onPress={() => {
    navigation.navigate("LostFound" as never);
  }}
>
  <View style={styles.container}>
    <Image style={styles.image} source={offline}></Image>
  </View>
  <View
    style={{
      backgroundColor: "#4e9d91",
      marginTop: 40,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      borderRadius:40,

    }}
  >
    <Text style={{ textAlign: 'center', color: 'white',fontSize:20 }}>Cours Enregistré</Text>
  </View>
</TouchableOpacity> */}

{/* <TouchableOpacity
  style={{
    marginTop: 22,
    backgroundColor: 'red',
    borderRadius: 50,
  }}
  onPress={() => {
    navigation.navigate("LostFound" as never);
  }}
>
  <View style={styles.container}>
    <Image style={styles.image} source={online}></Image>
  </View>
  <View
    style={{
      backgroundColor: "red",
      marginTop: 30,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center', // Center horizontally
    }}
  >
    <Text>Online</Text>
  </View>
</TouchableOpacity> */}

        <ScrollView  horizontal>
          <TouchableOpacity onPress={()=>{setActive(0)}}>
            <View
              style={active==0?styles.allact:styles.all}
            >
              <Text style={active==0?styles.alltact:styles.allt}>All</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setActive(1)}}>
            <View style={active==1?styles.categoriesact:styles.categories}>
              <Image
                style={{ width: width * 0.08, height: width * 0.08 }}
                source={sign}
              ></Image>
              <Text
               style={active==1?styles.alltact:styles.allt}
              >
                language de signe
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setActive(2)}}>
            <View style={active==2?styles.categoriesact:styles.categories}>
              <Image
                style={{ width: width * 0.08, height: width * 0.08 }}
                source={science}
              ></Image>
              <Text
                 style={active==2?styles.alltact:styles.allt}
              >
                Science
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setActive(3)}}>
            <View style={active==3?styles.categoriesact:styles.categories}>
              <Image
                style={{ width: width * 0.08, height: width * 0.08 }}
                source={religion}
              ></Image>
              <Text
                 style={active==3?styles.alltact:styles.allt}
              >
                Religion
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{setActive(4)}}>
            <View style={active==4?styles.categoriesact:styles.categories}>
              <Image
                style={{ width: width * 0.08, height: width * 0.08 }}
                source={culture}
              ></Image>
              <Text
                style={active==4?styles.alltact:styles.allt}
              >
                Culture
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView> 
       </View> 
       <View style={{marginLeft:10,marginVertical:5}}>
        </View> 
        {/* {adaptationTable.map((el,i)=>( <CartAdoptation key={i} el={el}/>))}
      */}
      <TouchableOpacity>
      <View style={{padding:20}}>
        <Image source={ASL} style={{width:width*0.9,height:height*0.2}}></Image>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',  justifyContent:'space-between', marginTop: 10 }}>
  {/* Square with theme color */}
 
  <Text style={{ textAlign: "left", fontSize: 20 }}>ASL Sign Language</Text>
  <View
    style={{
      width: 50, // Adjust size for the square
      height: 50, // Make it a square
      backgroundColor: '#d5eef6', // Replace with your theme color
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
      borderRadius:10
    }}
  >
    <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>20 h</Text>
  </View>
</View>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{ navigation.navigate("QuranCours" as never);}}>
      <View style={{padding:20}}>
        <Image source={quran} style={{width:width*0.9,height:height*0.2}}></Image>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',  justifyContent:'space-between', marginTop: 10 }}>
  {/* Square with theme color */}
 
  <Text style={{ textAlign: "left", fontSize: 20 }}>منهج القرآن الكريم بلغة الإشارة</Text>
  <View
    style={{
      width: 50, // Adjust size for the square
      height: 50, // Make it a square
      backgroundColor: '#d5eef6', // Replace with your theme color
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
      borderRadius:10
    }}
  >
    <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>70 h</Text>
  </View>
</View>
      </View>
      </TouchableOpacity>
      <TouchableOpacity>
      <View style={{padding:20}}>
        <Image source={signCours} style={{width:width*0.9,height:height*0.2}}></Image>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',  justifyContent:'space-between', marginTop: 10 }}>
  {/* Square with theme color */}
 
  <Text style={{ textAlign: "left", fontSize: 20 }}>لغة الإشارة التونسية</Text>
  <View
    style={{
      width: 50, // Adjust size for the square
      height: 50, // Make it a square
      backgroundColor: '#d5eef6', // Replace with your theme color
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
      borderRadius:10
    }}
  >
    <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>20 h</Text>
  </View>
</View>

      </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  allPages: {
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    columnGap: 10,
    rowGap: 10,
  },
  container: {
    width:width*0.99,
    backgroundColor:"white",
    height:height*0.2,
    borderRadius:50,
          borderWidth: 4,
      borderColor: '#4e9d91'

},
image: {
    width:width*0.99,
    height:height*0.25,
    borderRadius:40
},
  cartAdoptation: {
    width: width * 0.45,
  },
  title: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: height * 0.09,
    gap: 60,
  },
  allact:{
    
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: "#6fbbb1",
      borderColor: "#4e9d91",
      borderWidth: 1,
      borderRadius: 20,
      margin: 10,
      paddingHorizontal: 10,
      paddingVertical: 8,
    
  },
  all:{
    
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: "white",
      borderColor: "#4e9d91",
      borderWidth: 1,
      borderRadius: 20,
      margin: 10,
      paddingHorizontal: 10,
      paddingVertical: 8,
    
  },
  alltact:{
    fontSize: 15, color: "white", fontWeight: "bold" 
  },
  allt:{
    fontSize: 15, color: "#4e9d91", fontWeight: "bold" 
  },
  categories: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "white",
    borderColor: "#4e9d91",
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  categoriesact: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#6fbbb1",
    borderColor: "#4e9d91",
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  allPages1: {
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    columnGap: 10,
    rowGap: 10,
  },
  allPag: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    width: width * 0.45,
    height: height * 0.27,
    gap: 7,
    borderRadius: 15,
    borderColor:"black",
    paddingTop:10
  },
  animalPicture: {
    width: width * 0.4,
    height: height * 0.18,
    borderRadius: 15,
    
  },
  description: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap:10
    
  },
});

export default OffLine;
