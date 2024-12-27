import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text,StyleSheet ,Dimensions,Image,TouchableOpacity} from 'react-native';
import addPet from '../../../assets/add-pet.png'
import dog1 from '../../../assets/ownerdog2.png'
import dog2 from '../../../assets/ownerdog1.png'
import peticon from '../../../assets/peticon.png'
import axios from 'axios';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { port } from '../../../port';

interface UserPetsProps {
    pets: Pets[];
  }
interface Pets {
    id:Number,
    pet_name:string,
    pet_race:string,
    birth_date:string,
    pet_images:any[]
}
type PetsProfileRouteParams = {
    PetsProfile: {
      petData: Pets;
    };
  };

const { width, height } = Dimensions.get('screen')
const UserPets: React.FC <UserPetsProps>= ({pets}) => {

    const navigation=useNavigation()
    console.log(pets,"hhh");
    
    
    return (
        <View style={styles.petContainer}>
            <View style={{display:"flex",flexDirection:'row',justifyContent:'space-between'}}>
            <View style={styles.myPets}>
            <Image style={{width:width*0.08,height:height*0.035}} source={peticon}></Image>
            <Text style={{fontWeight:'bold',fontSize: 18}}>My Pets</Text>
            </View>
            <View style={{borderColor:"#4e9d91",borderWidth:1,borderRadius:20,padding:5}}>
            <TouchableOpacity onPress={()=>{navigation.navigate('AllPets' as never)}}><Text style={{color:"#4e9d91",fontWeight:"bold"}}>See All</Text></TouchableOpacity>
            </View>
            </View>
        <View style={{display:"flex",flexDirection:'row', gap:20,  marginVertical:15,justifyContent:"space-around",paddingHorizontal:15}}>
          
        {pets[0]&&<TouchableOpacity key={(pets[0]?.id).toString()} onPress={()=>{ navigation.navigate(...['PetsProfile' as never, { petData: pets[0]} ] as never)}}>
            <Image style={styles.PetsImage} source={{uri:pets[0]?.pet_images[0]}}></Image>
            </TouchableOpacity>}
            {pets[1]&& <TouchableOpacity key={(pets[1]?.id).toString()} onPress={()=>{ navigation.navigate(...['PetsProfile' as never, { petData: pets[1]} ] as never)}}>
            <Image style={styles.PetsImage} source={{uri:pets[1]?.pet_images[0]}}></Image>
            </TouchableOpacity>}
        
        <TouchableOpacity onPress={()=>{navigation.navigate('AddPet' as never)}}><Image style={styles.PetsImage} source={addPet}></Image></TouchableOpacity>
        </View>
        </View>
    );
};
const styles = StyleSheet.create({
    PetsImage: {
        width:width*0.2,
        height:height*0.09,
        borderRadius:12
       
       
    },
    myPets : {
        display:"flex",
        alignItems:"center",
        justifyContent:"flex-start",
        flexDirection:"row",
        gap:10,
       
    },
    petContainer :{
        backgroundColor:"white",
        marginVertical:7,
        marginHorizontal:20,
        borderRadius:20,
        padding:15,
    }

})
export default UserPets;

