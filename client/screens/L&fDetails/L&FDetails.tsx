import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import chien from "../../assets/chien.jpg";
const { width, height } = Dimensions.get("screen");
const LostFounDetails: React.FC = () => {
  return (
    <ScrollView>
      <View>
        <Image
          source={chien}
          style={{ width: width, height: height * 0.32 }}
        ></Image>
      </View>
      <View style={{ padding: 25 }}>
        <View style={styles.finfo}>
          <View style={styles.found}>
            <Text style={styles.statusText}>Found</Text>
          </View>
          <Text style={styles.dateText}>14/01/2024</Text>
        </View>
        <Text style={{ fontSize: 20, fontWeight: "bold", paddingBottom: 20 }}>
          Found Male Golden Retriever
        </Text>
        <Text style={{ paddingBottom: 25 }}>
          FFSDFDFSlgfg vgsdsd dgsdfgfdg sgsdgdsggf vsdgfdsgsgc sdgdsgdsg
          dgsdgdsg gsfgsgfsdmvkfslsf fbf fbf dddvd dvdddvd
        </Text>
        <View style={{ paddingBottom: 35 }}>
          <View style={styles.sinfo}>
            <Text>Date Found</Text>
            <Text>14/01/2024</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.sinfo}>
            <Text>Gender</Text>
            <Text>Male</Text>
          </View>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity>
              <View style={styles.bt}>
                <Text style={{ color: "#fff",fontWeight:"bold" ,fontSize:16}}>Message</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  finfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  sinfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  found: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    marginBottom: 20,
    borderRadius: 15,
    width: width * 0.2,
    padding: 5,
  },
  lost: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    marginBottom: 20,
    borderRadius: 15,
    width: width * 0.2,
    padding: 5,
  },
  statusText: {
    color: "#fff",
    fontSize: 16,
  },
  dateText: {
    color: "#7f7f7f",
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#7f7f7f",
    marginVertical: 10,
  },
  bt: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    height: height * 0.07,
    margin: 25,
    width: width * 0.55,
    borderRadius: 25,
  },
});
export default LostFounDetails;
