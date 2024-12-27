import React from 'react';
import { ScrollView, View, Text,StyleSheet,Dimensions ,Image, TouchableOpacity} from 'react-native';
import chat from "../../../assets/chat.png"
import { useNavigation } from '@react-navigation/native';
import pub from '../../../assets/cours.jpg'
import notif from '../../../assets/bell.png'
import { useSelector } from 'react-redux';
const { width, height } = Dimensions.get('screen')

const Publicite: React.FC = (): React.ReactElement => {
    const navigation=useNavigation()
    const user = useSelector((state: RootState) => state.user?.userData);
    const provider=""
    const handelNav=()=>{
        user?navigation.navigate("UserProfile" as never):
        provider?navigation.navigate("ProviderProfile" as never):
        navigation.navigate("Login" as never)
    }
    return (
           <View style={{marginTop:20,padding:20}}>
             <TouchableOpacity onPress={()=>{handelNav()}} style={styles.imageText} >
                <Image style={{width:width*0.12,height:width*0.12,borderRadius:50,borderWidth:1.5,borderColor:"#4e9d91"}} source={{uri:"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-image-icon-default-avatar-profile-icon-social-media-user-vector-image-209162840.jpg"}}></Image>
                <View>
                    <Text style={{fontWeight:'bold',fontSize:17}}>{"oussema cherif"}</Text>
                    <Text style={{color:'grey'}}>{"oussema@gmail.com"}</Text>
                    </View>
                    <TouchableOpacity>
                    <Image style={{width:width*0.08,height:width*0.07,position:'absolute',left:40,top:10}} source={notif}></Image>
                </TouchableOpacity>
                </TouchableOpacity>    
            <Image style={{width:width*0.95,height:height*0.2,borderRadius:20}} source={pub}></Image>
            </View>

      
    );
};
const styles = StyleSheet.create({
    allPages: {
   backgroundColor:"#8596fa",
       flexDirection:'row',
        justifyContent: "space-around",
        alignItems: 'center',
        width:width*0.9,
        height:height*0.2,
        borderRadius:8,
        paddingLeft:15,
        gap:10,
        
        
    },
    description:{
 
   
        width:width*0.5,
        height:height*0.2,
        gap:15
    } ,
        imageText: {
            display:"flex",
            flexDirection:"row",
            marginBottom:10,
            padding:10,
            gap:15
        },
})
export default Publicite