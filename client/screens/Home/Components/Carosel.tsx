import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { port } from "../../../port";
import doctor from "../../../assets/doctor.png";
import teacher from "../../../assets/teacher.png";
import training from "../../../assets/training-course.png";
import volunteer from "../../../assets/volunteer.png";
import trainer from "../../../assets/coach.png";
import { useSelector } from "react-redux";

const { width, height } = Dimensions.get("screen");

const Carosel: React.FC = (): React.ReactElement => {
  const navigation = useNavigation();
  const [serviceData, setServiceData] = useState<Services[] | []>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalName, setModalName] = useState(null);
  const [modalImage, setModalImage] = useState(null); 

  const token = useSelector((state: RootState) => state.auth.authToken);

  const navigateToHome = () => {
    navigation.navigate("Services" as never);
  };

  const navigateToServiceDetails = (serviceId) => {
    navigation.navigate(
      ...(["DynamicScreenAllServices", { serviceId }] as never)
    );
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(`${port}/api/service`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setServiceData(result.data);
        console.log("ser", result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleLongPress = (imageSource,name) => {
    setModalImage(imageSource); // Set the image for the modal
    setModalName(name);
    setModalVisible(true); // Show the modal
  };

  const closeModal = () => {
    setModalVisible(false); // Hide the modal
    setModalImage(null); // Clear the image
  };

  const handleOverlayPress = () => {
    closeModal(); // Close the modal if the overlay is pressed
  };

  return (
    <View style={styles.allPages}>
      <View style={styles.service}>
        <Text style={{ color: "#4e9d91", fontSize: 18, fontWeight: "bold" }}>
          | Services
        </Text>
        <TouchableOpacity style={styles.viewAllButton} onPress={navigateToHome}>
          <Text style={styles.viewAllText}>Voir Tout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.allService} horizontal>
        <View style={styles.horizontalScrollContainer}>
          <TouchableOpacity
            key={serviceData[0]?.id}
            onPress={() => navigateToServiceDetails(serviceData[0]?.id)}
            onLongPress={() =>
              handleLongPress("https://s4.ezgif.com/tmp/ezgif-4-47f9be0181.gif","Medecin")
            } // Pass the image for the modal
            delayLongPress={500}
          >
            <View style={styles.oneServicee}>
              <View style={styles.oneService}>
                <Image style={styles.image} source={doctor} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            key={serviceData[1]?.id}
            onPress={() => navigateToServiceDetails(serviceData[1]?.id)}
            onLongPress={() =>
              handleLongPress("https://s6.ezgif.com/tmp/ezgif-6-4d5b63337c.gif","Enseignant")
            } // Pass the image for the modal
            delayLongPress={500}
          >
            <View style={styles.oneServicee4}>
              <View style={styles.oneService4}>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={teacher}
                ></Image>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            key={serviceData[2]?.id}
            onPress={() => navigateToServiceDetails(serviceData[2]?.id)}
            onLongPress={() =>
              handleLongPress("https://s4.ezgif.com/tmp/ezgif-4-609cfef3c6.gif","Formateur")
            } // Pass the image for the modal
            delayLongPress={500}
          >
            <View style={styles.oneServicee2}>
              <View style={styles.oneService2}>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={trainer}
                ></Image>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            key={serviceData[3]?.id}
            onPress={() => navigateToServiceDetails(serviceData[3]?.id)}
            onLongPress={() =>
              handleLongPress("https://s4.ezgif.com/tmp/ezgif-4-3120bbf2e6.gif","Centre de Formation")
            } // Pass the image for the modal
            delayLongPress={500}
          >
            <View style={styles.oneServicee3}>
              <View style={styles.oneService3}>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={training}
                ></Image>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            key={serviceData[4]?.id}
            onPress={() => navigateToServiceDetails(serviceData[4]?.id)}
            onLongPress={() =>
              handleLongPress("https://s4.ezgif.com/tmp/ezgif-4-5c78c16475.gif","Volunteer")
            } 
            delayLongPress={500}
          >
            <View style={styles.oneServicee1}>
              <View style={styles.oneService1}>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={volunteer}
                ></Image>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay} onTouchStart={handleOverlayPress}>
          <View style={styles.modalContent}>
            {modalImage && (
              <WebView source={{ uri: modalImage }} style={styles.webview} />
            )}
             <Text style={{fontSize:20, paddingTop:5}}>{modalName}</Text>
          </View>
         
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  allPages: {
    width: width * 0.95,
    height: height * 0.25,
    borderRadius: 8,
    paddingHorizontal: 15,
    gap: 10,
  },
  service: {
    width: width * 0.85,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: height * 0.07,
  },
  viewAllButton: {
    borderRadius: 20,
    borderColor: "#4e9d91",
    borderWidth: 1.5,
    width: width * 0.2,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  viewAllText: {
    color: "#4e9d91",
    fontSize: 14,
    fontWeight: "bold",
  },
  allService: {
    height: height * 0.09,
    paddingHorizontal: 6,
    gap: 10,
  },
  oneService: {
    backgroundColor: "#d5eef6",
    width: width * 0.22,
    height: width * 0.22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  webview: {
    width: width * 0.7,
    height: height * 0.9,
    backgroundColor: "transparent",
  },
  oneServicee: {
    backgroundColor: "white",
    width: width * 0.25,
    height: width * 0.25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "#d5eef6",
    borderWidth: 2,
  },
  oneService1: {
    backgroundColor: "#f8e3fb",
    width: width * 0.22,
    height: width * 0.22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "",
  },
  oneServicee1: {
    backgroundColor: "white",
    width: width * 0.25,
    height: width * 0.25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "#f8e3fb",
    borderWidth: 2,
  },
  oneService2: {
    backgroundColor: "#f9efcb",
    width: width * 0.22,
    height: width * 0.22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "",
  },
  oneServicee2: {
    backgroundColor: "white",
    width: width * 0.25,
    height: width * 0.25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "#f9efcb",
    borderWidth: 2,
  },
  oneService3: {
    backgroundColor: "#e3edfb",
    width: width * 0.22,
    height: width * 0.22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "",
  },
  oneServicee3: {
    backgroundColor: "white",
    width: width * 0.25,
    height: width * 0.25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "#e3edfb",
    borderWidth: 2,
  },
  oneService4: {
    backgroundColor: "#fbe3e3",
    width: width * 0.22,
    height: width * 0.22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "",
  },
  oneServicee4: {
    backgroundColor: "white",
    width: width * 0.25,
    height: width * 0.25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "#fbe3e3",
    borderWidth: 2,
  },
  image: {
    width: 50,
    height: 50,
  },
  horizontalScrollContainer: {
    flexDirection: "row",
    gap: 10,
    paddingEnd: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    height: height * 0.5,
  },
  modalImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
  },
});

export default Carosel;
