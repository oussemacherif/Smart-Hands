import React from 'react';
import { ScrollView, View, Text,StyleSheet ,Dimensions} from 'react-native';
import  Training from "./Components/Training"
import Carosel from "./Components/Carosel"
import Publicite from "./Components/Publicité"
import Adoptation from './Components/Adoptation';
import Blogs from './Components/Blogs';
import { useSelector } from 'react-redux';
import Navbar from './Components/Navbar';

const { width, height } = Dimensions.get('screen')

const Home: React.FC = (): React.ReactElement => {
    const userData = useSelector((state: RootState) => state.user?.userData);

    console.log("userfromhome", userData);
    

    return (
        <View>
        <ScrollView style={styles.container} >
            <View style={styles.allPages}>
               <Publicite/>
               <Carosel/>
               <Adoptation   />
               <Training/>
               <Blogs/>
            </View>
          
        </ScrollView>
        <Navbar/>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        display: "flex",
        backgroundColor: "#fff",
       
    },
    allPages: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:20,
        gap:20,
        marginBottom:75,
       
    },})
export default Home;

