import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { useDispatch,useSelector} from "react-redux";
import del from "../../assets/delete.png";
import axios from "axios";
import { port } from "../../port";
import { AppDispatch } from "../../lib/redux/store";
import { updateUserData } from "../../lib/redux/user/userSlice";
import { useNavigation } from "@react-navigation/native";

interface Pets {
  id: number;
  pet_name: string;
  pet_race: string;
  birth_date: string;
  pet_images: any[];
}

const { width, height } = Dimensions.get("screen");

const AllPets: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user?.userData);
  const petData = useSelector((state: RootState) => state.user?.userData.pets);

  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
 const navigation=useNavigation()
 const token = useSelector((state: RootState) => state.auth.authToken);
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${port}/api/pets/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const actionResult = await dispatch(updateUserData({ fname: user.fname }));
    } catch (error) {
      console.error("Error deleting pet:", error);
    } finally {
      setModalVisible(false);
      setSelectedPetId(null);
    }
  };

  const toggleModal = (id: number) => {
    setSelectedPetId(id);
    setModalVisible(!isModalVisible);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {petData.map((el: Pets, i: number) => (
          <TouchableOpacity key={i} style={styles.view} onPress={()=>{navigation.navigate(...['PetsProfile', { petData: el}]as never)}}>
            <Image style={styles.petsImage} source={{ uri: el?.pet_images[0] }} />
            <View style={{ width: width * 0.2 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{el.pet_name}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleModal(el.id)}>
              <Image style={{ width: width * 0.08, height: height * 0.03 }} source={del} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      {/* Confirmation Modal */}
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={{fontSize:15,fontWeight:"bold"}}>Are you sure you want to delete this pet?</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.bt} onPress={() => handleDelete(selectedPetId)}>
              <Text style={styles.modalButton}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bt} onPress={() => toggleModal(null)}>
              <Text style={styles.modalButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    marginVertical: 45,
  },
  view: {
    backgroundColor: "#d9d9d9",
    width: width * 0.8,
    height: height * 0.1,
    borderRadius: 15,
    padding: 13,
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  petsImage: {
    width: width * 0.16,
    height: width * 0.16,
    borderRadius: 12,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  modalButtons: {
    marginTop: 40,
    flexDirection: "row",
    width:width*0.65,
    justifyContent: "space-between",
  },
  bt:{
    backgroundColor: "#ffc368",
    width: width * 0.3,
    height: height * 0.04,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  modalButton: {
    color: "white",
    fontSize: 16,
  },
});

export default AllPets;
