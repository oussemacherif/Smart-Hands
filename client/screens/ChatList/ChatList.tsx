import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { port } from '../../port';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('screen');

type RootStackParamList = {
  ChatPage: { receiver: string };

};

const ChatList: React.FC = (): React.ReactElement => {
  const [roomsData, setRoomsData] = useState([{}]);
//   const token = useSelector((state: RootState) => state.auth.authToken);
// console.log(token);

  const navigation=useNavigation()

//   const userId = useSelector((state: RootState) => state.user?.userData.id);
//   console.log(userId);
  

//   const getData = async () => {
//     try {
//       const result = await axios.put(`${port}/api/Rooms/${userId}`,{
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       console.log(result.data);
//       setRoomsData(result.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

  const renderItem = ({ item }) => (
    <View>
    <TouchableOpacity
    onPress={() => {
      navigation.navigate(...["ChatPage", {
        receiver: 1,
      }]as never);
    }}
  >

    <View style={styles.pageContainer}>
      <Image source={{ uri: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-image-icon-default-avatar-profile-icon-social-media-user-vector-image-209162840.jpg" }} style={{ width: width * 0.18, height:  width * 0.18, borderRadius: 60 }} />
      <View style={{ justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column", flex: 1 ,marginLeft:15}}>
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "black" }}>{"Yassin"}</Text>
        <Text style={{ fontSize: 16, color: "grey" }}>{"❤🍔"}</Text>
      </View>
      <View style={{ justifyContent: "flex-end", alignItems: "center" }}>
        <Text style={{ fontSize: 16, color: "grey" }}>اليوم</Text>
        {(1===1)&&<Text style={{ fontSize: 16, color: "grey" }}>أنت</Text>}
      </View>
    </View>
    </TouchableOpacity>
    <TouchableOpacity
    onPress={() => {
      navigation.navigate(...["ChatPage", {
        receiver: 1,
      }]as never);
    }}
  >

    <View style={styles.pageContainer}>
      <Image source={{ uri: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-image-icon-default-avatar-profile-icon-social-media-user-vector-image-209162840.jpg" }} style={{ width: width * 0.18, height:  width * 0.18, borderRadius: 60 }} />
      <View style={{ justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column", flex: 1 ,marginLeft:15}}>
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "black" }}>{"BAHA"}</Text>
        <Text style={{ fontSize: 16, color: "grey" }}>{"السلام عليكم"}</Text>
      </View>
      <View style={{ justifyContent: "flex-end", alignItems: "center" }}>
        <Text style={{ fontSize: 16, color: "grey" }}>أمس</Text>
        {(1!=1)&&<Text style={{ fontSize: 16, color: "grey" }}>أنت</Text>}
      </View>
    </View>
    </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={roomsData}
      renderItem={renderItem}
      keyExtractor={(item) => "1"}
    />
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    width: width*0.9,
    height: height * 0.13,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal:15
  }
});

export default ChatList;
