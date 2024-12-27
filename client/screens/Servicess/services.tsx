import React from 'react';
import { ScrollView, View,StyleSheet ,Dimensions} from 'react-native';
import AllServices from './component/allServices';
const { width, height } = Dimensions.get('screen')


const Services: React.FC = () => {
    return (
        <ScrollView style={styles.UsersServicesp}>
            <AllServices/>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    UsersServicesp: {
   backgroundColor:"#fff",
   display:"flex",
   alignContent:"center",
},
UsersServices :{
    paddingTop:20,
    display: 'flex',
    marginHorizontal:20,
    flexDirection:'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
    
},
logo :{
    backgroundColor:"white",
    width:width*0.85,
    height:height*0.155,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:25,
    marginHorizontal:20,
    marginVertical:20,
    display:'flex',
},

})
export default Services;

