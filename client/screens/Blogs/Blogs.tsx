import React, { useState,useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"
import Icon from "react-native-vector-icons/FontAwesome"; // Import the icon library

const { width, height } = Dimensions.get("screen");

const Blogs: React.FC = ({ route,navigation }: any): React.ReactElement => {
  const [newTitle, setNewTitle] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [authorName, setAuthorName] = useState("John Doe"); // Default author name
  const [authorImage, setAuthorImage] = useState(
    "https://placekitten.com/100/100" // Default author image
  );
  const [isModalVisible, setModalVisible] = useState(false);

  const articles = [
    {
      id: 1,
      title: " Balanced Diet",
      subject: "Offer high-quality, species appropriate food suitable for your pet's age, size, and health condition.",
      author: "Mr Mouhamed",
      image: "https://tse3.mm.bing.net/th?id=OIP.jIWHnrukahcKVsriBZRc9wHaE8&pid=Api&P=0&h=180",
      articleImage: "https://placekitten.com/200/200", // Additional photo for the article
    },
    {
      id: 2,
      title: "Regular Exercise",
      subject: "Playtime and walks are essential for both mental and physical stimulation.",
      author: "Mr Lousif",
      image: "https://tse1.mm.bing.net/th?id=OIP.ZIyclPpdPSFRiXNl7dHp_wHaE8&pid=Api&P=0&h=180",
      articleImage: "https://placekitten.com/201/201", // Additional photo for the article
    },
    {
      id: 3,
      title: "Grooming",
      subject: "Brush your pet's fur, trim nails, and clean ears as needed.",
      author: "Mr Lousif",
      image: "https://tse1.mm.bing.net/th?id=OIP.ZIyclPpdPSFRiXNl7dHp_wHaE8&pid=Api&P=0&h=180",
      articleImage: "https://placekitten.com/202/202", // Additional photo for the article
    },
    {
      id: 4,
      title: "Love and Attention",
      subject: "Spend quality time with your pet to strengthen the bond..",
      author: "Mrs Borni",
      image: "https://tse2.mm.bing.net/th?id=OIP.n65WUhPj3VTrn4HULi1fnAHaE7&pid=Api&P=0&h=180",
      articleImage: "https://placekitten.com/202/202", // Additional photo for the article
    },
  ];

  const handleSaveBlog = () => {
    console.log("New Title:", newTitle);
    console.log("New Subject:", newSubject);
    console.log("Author Name:", authorName);
    console.log("Author Image:", authorImage);
    setNewTitle("");
    setNewSubject("");
    setModalVisible(false);
  };
  useEffect(() => {
    navigation.setOptions({
      title: `Blogs`,
      headerStyle: {
        backgroundColor: '#4e9d91',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      // headerRight: () => (
      //   <TouchableOpacity
      //     style={styles.headerButton}
      //     onPress={() => {
      //       console.log("hhhh");
            
      //     }}
      //   >
      //     <Ionicons name="add" size={27} color="white" onPress={()=>{setModalVisible(true)}} />
      //   </TouchableOpacity>)
    });
  }, [navigation]);

  const handleLike = (articleId: number) => {
    console.log(`Liked article with id ${articleId}`);
  };

  const handleDislike = (articleId: number) => {
    console.log(`Disliked article with id ${articleId}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.existingBlogs}>
        {articles.map((article) => (
          <View key={article.id} style={styles.blogCard}>
            <Image
              source={{ uri: article.image }}
              style={styles.authorImage}
              resizeMode="cover"
            />
            <View style={styles.blogInfo}>
              <View style={styles.titleContainer}>
                <Text style={styles.authorName}>{article.author}</Text>
                <Text style={styles.blogTitle}>{article.title}</Text>
              </View>
              <Text style={styles.blogContent}>{article.subject}</Text>
              <Image
                source={{ uri: article.articleImage }}
                style={styles.articleImage}
                resizeMode="cover"
              />
              {/* <View style={styles.iconContainer}>
                <TouchableOpacity
                  onPress={() => handleLike(article.id)}
                  style={styles.iconButton}
                >
                  <Icon name="thumbs-up" size={20} color="#4e9d91"/>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDislike(article.id)}
                  style={styles.iconButton}
                >
                  <Icon name="thumbs-down" size={20} color="#4e9d91" />
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
        ))}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Enter Blog Title"
              value={newTitle}
              onChangeText={(text) => setNewTitle(text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter Blog Subject"
              value={newSubject}
              onChangeText={(text) => setNewSubject(text)}
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveBlog}
            >
              <Text style={styles.buttonText}>Save Blog</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4e9d91",
  },
  addBlogContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#4e9d91",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  existingBlogs: {
    marginBottom: 20,
  },
  blogCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    flexDirection: "row",
  },
  authorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  blogInfo: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  authorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4e9d91",
    marginRight: 8,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  blogContent: {
    fontSize: 16,
    color: "#555",
  },
  articleImage: {
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  iconButton: {
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: width - 40,
  },
  saveButton: {
    backgroundColor: "#4e9d91",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  headerButton: {
    marginRight: 15,
  },
});

export default Blogs;
