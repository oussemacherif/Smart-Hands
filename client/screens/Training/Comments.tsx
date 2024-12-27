import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet,Dimensions,ScrollView } from 'react-native';
import { useSelector } from "react-redux";
import { port } from '../../port';
import UserInfo from '../UserProfile/component/UserInfo';
const { width, height } = Dimensions.get("screen");


const Comments = ({route}) => {
  const [newComment, setNewComment] = useState('');
   const {postInfo}=route.params
const userData = useSelector((state: RootState) => state.user?.userData);
  const [comments, setComments] = useState([]);
  const [commentref, setCommentref] = useState(false);

  const handleAddComment = async() => {
    const obj ={
      content:newComment,
      userId:userData?.id,
      lfaId:postInfo.id
    }
    
  const add=await axios.post(`${port}/api/comments`,obj)
     setCommentref(!commentref)
      setNewComment('');
    }
    const getCom=async()=>{
const gett=await axios.get(`${port}/api/comments/${postInfo.id}`)
setComments(gett.data)
    }
    useEffect(()=>{
      getCom()
    },[commentref])
  
  const renderCommentItem = ({ item }) => (
    <View>
        
    <View style={styles.commentContainer}>
      <Image source={{uri:item?.user?.image}} style={styles.avatar} />
      <View style={styles.commentContent}>
        <Text style={styles.animalName}>{item?.user?.fname+" "+item?.user?.lname}</Text>
        <Text style={styles.commentText}>{item.content}</Text>
        <View style={styles.commentActions}>
          
        </View>
      </View>
    </View>
    </View>
  );
return (
    <ScrollView style={styles.container} nestedScrollEnabled={true}>
        <View style={{padding:5,marginBottom:30}}>
<View style={styles.onepost}>
  <Image style={styles.image} source={{uri:postInfo?.user?.image}}></Image>
  <View  style={{width:width*0.45,marginLeft:10}}>
    <View>
      <View>
        <Text style={{fontSize:20,fontWeight:"bold"}}>{postInfo?.user?.fname+" "+postInfo?.user?.lname}</Text>
      </View>
      <View>
        <Text>14/01/2024</Text>
      </View>
    </View>
  </View>
  <View >
      <Text style={postInfo.status==='Found'?styles.found:styles.lost} >{postInfo.status}</Text>
    </View>
</View>
<View style={{marginHorizontal:20,marginBottom:10}}>
  <Text>{postInfo.pet_description}</Text>
</View>
<View style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
  <Image style={{width:width*0.9,height:height*0.27,borderRadius:25}} source={{uri:postInfo?.pet_images[0]}}></Image>
</View>
<View style={{display:"flex",flexDirection:"row",marginHorizontal:20,marginVertical:10,justifyContent:"space-between"}}>
  </View>
</View>
    {comments.map((item,i)=>(
      <View key={i}>
        
      <View style={styles.commentContainer}>
        <Image source={{uri:item?.user?.image}} style={styles.avatar} />
        <View style={styles.commentContent}>
          <Text style={styles.animalName}>{item?.user?.fname+" "+item?.user?.lname}</Text>
          <Text style={styles.commentText}>{item.content}</Text>
          <View style={styles.commentActions}>
            
          </View>
        </View>
      </View>
      </View>
     ))}
      {/* <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={renderCommentItem}
      /> */}

      <View style={styles.addCommentContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a funny comment..."
          value={newComment}
          onChangeText={(text) => setNewComment(text)}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleAddComment}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    height:height
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  animalName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentText: {
    marginBottom: 10,
  },
  commentActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom:20
  },
  commentInput: {
    flex: 1,
    padding: 8,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  submitButton: {
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: "orange", 
    borderRadius: 20,
    padding: 15, 
    alignItems: "center",
    justifyContent: "center", 
    marginTop: 10, 
  },
  AddLA: {
    backgroundColor: "orange",
    borderRadius: 20,
    padding: 15, 
    alignItems: "center",
  },
  alllf: {
    height: height*1.1,
    backgroundColor:"white"
  },
  search: {
    backgroundColor: "#fff",
    height: height * 0.1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  text:{
    color: "#4e9d91",
   fontSize: 17 
  },
  textact:{
    color: "#fff",
    fontSize: 17 
  },
  bt: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical:10,
    paddingHorizontal:18,
    borderRadius: 25,
    borderWidth:1.5,
    borderColor:"#4e9d91"
  },
  btact: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4e9d91",
    paddingVertical:10,
    paddingHorizontal:18,
    borderRadius: 25,
    borderWidth:1.5,
    borderColor:"#4e9d91"
  },
  apdpostes: {
    backgroundColor: "#fff",
    display: "flex",
    padding: 5,
    marginBottom:200
  },
  onepost: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 5,
    
  },
  image: {
    width: width * 0.15,
    height: width * 0.15,
    margin: 10,
    borderRadius: 50,
    borderWidth:3,
    borderColor:"#e3edfb"
  },
  found: {
    display: "flex",
    justifyContent:"center",
    alignItems: "center", 
    marginBottom: 20,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical:5, 
    marginLeft:22,
    borderWidth:1.5,
    borderColor:'green',
    color:"green"
  },
  lost:{
    display: "flex",
    justifyContent:"center",
    alignItems: "center", 
    marginBottom: 20,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical:5, 
    marginLeft:30,
    borderWidth:1.5,
    borderColor:'red',
    color:"red"
  },
  statusText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold", 
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#4e9d91',
    backgroundColor:"#fff",
    paddingVertical: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: width * 0.7,
    height: height * 0.7,
    alignSelf: 'center', 
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc", 
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 15, 
    fontSize: 16, // Increase font size
  },
  saveButton: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize:18
  },
  imageButton: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  imageButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  headerButton: {
    marginRight: 15,
  },
});

export default Comments;