import React from 'react';
import { ScrollView, View, Text,StyleSheet,Dimensions ,TouchableOpacity, Image} from 'react-native';
const { width, height } = Dimensions.get('screen')
import { useNavigation } from '@react-navigation/native';
import adp from '../../../assets/cours.jpg'

const  Adoptation: React.FC = (): React.ReactElement=> {
    const navigation=useNavigation()
    
    return (
        <View style={styles.allPages}>
              <View style={styles.service}>
                <Text  style={{color:"#4e9d91",fontSize:18,fontWeight:"bold"
}}>| Cours</Text>
                <TouchableOpacity onPress={()=>{
                navigation.navigate("Cours" as never)
            }}><View  style={styles.container}>
                 <Image style={styles.image} source={adp}></Image>
                </View>
                </TouchableOpacity>
            </View>
    </View>
    );
};
const styles = StyleSheet.create({
    allPages: {
        flexDirection:"column",
  
   height:height*0.25,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap:20
    },
    service:{
        width:width*0.85,
        justifyContent:"flex-start",
         alignItems:'flex-start',
         flexDirection:"column",
         gap:20,

         height:height*0.25,
    },
    container: {
        width:width*0.85,
        backgroundColor:"white",
        height:height*0.18,
        borderRadius:10
    },
    image: {
        width:width*0.85,
        height:height*0.18,
        borderRadius:10
    }
});
export default Adoptation