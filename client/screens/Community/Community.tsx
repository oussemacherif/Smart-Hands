import React, { useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Post from "../Training/lfPost";
import msget from "../../assets/msget.png"

const { width } = Dimensions.get("screen");

const CommunityPage: React.FC = () => {
const [serviceData, setServiceData] = useState<any[]>([
  // Blog posts from doctors
  {
    id: 1,
    user: {
      id: 101,
      fname: "Dr. Sarah",
      lname: "Williams",
      image: "https://randomuser.me/api/portraits/women/1.jpg", // Random doctor image
    },
    createdAt: "2024-12-20T10:00:00Z",
    status: "Blog Post",
    pet_description: "Understanding Hearing Aids: An Overview of Technologies and Options.",
    pet_images: [
      "https://images.unsplash.com/photo-1612221869825-aba9abfb9d4e" // Relevant image of hearing aids
    ],
  },
  {
    id: 2,
    user: {
      id: 102,
      fname: "Dr. John",
      lname: "Davis",
      image: "https://randomuser.me/api/portraits/men/2.jpg", // Random doctor image
    },
    createdAt: "2024-12-19T12:30:00Z",
    status: "Blog Post",
    pet_description: "Coping with Deafness: Psychological Tips for Deaf Individuals and Their Families.",
    pet_images: [
      "https://images.unsplash.com/photo-1581091870625-d45d2a98fbcf" // Image of therapy or family support
    ],
  },
  {
    id: 3,
    user: {
      id: 103,
      fname: "Dr. Lisa",
      lname: "Martinez",
      image: "https://randomuser.me/api/portraits/women/3.jpg", // Random doctor image
    },
    createdAt: "2024-12-18T14:45:00Z",
    status: "Blog Post",
    pet_description: "The Role of Speech Therapy in Supporting Deaf Children.",
    pet_images: [
      "https://images.unsplash.com/photo-1594722544105-b13b44f767db" // Image of a therapist with a child
    ],
  },

  // Posts from deaf people
  {
    id: 4,
    user: {
      id: 104,
      fname: "Emily",
      lname: "Brown",
      image: "https://randomuser.me/api/portraits/women/4.jpg", // Random deaf person image
    },
    createdAt: "2024-12-17T16:30:00Z",
    status: "Deaf Person Post",
    pet_description: "Looking for Support: How do you manage life without hearing? Let’s share experiences!",
    pet_images: [
      "https://images.unsplash.com/photo-1596082494009-d44a4ffba5b5" // Image of a group of deaf people interacting
    ],
  },
  {
    id: 5,
    user: {
      id: 105,
      fname: "Chris",
      lname: "Johnson",
      image: "https://randomuser.me/api/portraits/men/5.jpg", // Random deaf person image
    },
    createdAt: "2024-12-15T11:00:00Z",
    status: "Deaf Person Post",
    pet_description: "How do you communicate with hearing people? I’m looking for tips on bridging the gap.",
    pet_images: [
      "https://images.unsplash.com/photo-1606155051291-bfd977684be2" // Image of a deaf person using sign language
    ],
  },
  {
    id: 6,
    user: {
      id: 106,
      fname: "Sophia",
      lname: "Wilson",
      image: "https://randomuser.me/api/portraits/women/6.jpg", // Random deaf person image
    },
    createdAt: "2024-12-14T10:45:00Z",
    status: "Deaf Person Post",
    pet_description: "Seeking Advice: What is your experience with sign language in public spaces?",
    pet_images: [
      "https://images.unsplash.com/photo-1596459077089-52c7c362c276" // Image of sign language being used in public
    ],
  },
  {
    id: 7,
    user: {
      id: 107,
      fname: "Michael",
      lname: "Taylor",
      image: "https://randomuser.me/api/portraits/men/7.jpg", // Random deaf person image
    },
    createdAt: "2024-12-13T09:15:00Z",
    status: "Deaf Person Post",
    pet_description: "Interacting with my hearing family during the holidays – Tips and tricks to connect.",
    pet_images: [
      "https://images.unsplash.com/photo-1576097748209-b319a5f6c1c1" // Image of a family during holidays
    ],
  },
  {
    id: 8,
    user: {
      id: 108,
      fname: "Olivia",
      lname: "Smith",
      image: "https://randomuser.me/api/portraits/women/8.jpg", // Random deaf person image
    },
    createdAt: "2024-12-12T13:00:00Z",
    status: "Deaf Person Post",
    pet_description: "How do you navigate the world without sound? I’d love to hear your experiences.",
    pet_images: [
      "https://images.unsplash.com/photo-1606791781386-b01f074fb1a7" // Image of a person navigating the world with hearing aids or sign language
    ],
  },
]);


  const navigation = useNavigation();

  return (
    <View>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.UsersServices}>
        {serviceData.map((el, i) => (
          <Post key={i} i={i} el={el} />
        ))}
      </View>
    
    </ScrollView>
    <TouchableOpacity onPress={()=>{navigation.navigate("ChatList" as never)}} style={{borderRadius:'49%',width:width*0.19,backgroundColor:'#4e9d91',padding:20,position:"absolute",left:14,bottom:25,borderColor:"#000000"}}><Image style={{width:width*0.08,height:width*0.08}} source={msget} ></Image></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  UsersServices: {
    marginTop: 2,
    paddingTop: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingBottom: 75,
  },
});

export default CommunityPage;
