import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  TextInput,
  Button,
  Alert,
  Keyboard,
} from "react-native";
import React, { useState,useEffect,useContext } from "react";
import { UserType } from "../UserContext";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { keyboardProps } from "react-native-web/dist/cjs/modules/forwardedProps";


const ThreadsScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [content, setContent] = useState("");
  const [user,setUser] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `https://threads-backend-api.vercel.app/profile/${userId}`
        );
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchProfile();
  });




  const handlePostSubmit = () => {
    const postData = {
      userId,
    };





    if (content) {

      if (content.trim() === ""){
        Alert.alert("Empty","please enter some thread!!")
      }
      else{
        postData.content = content;
        Alert.alert("Success","Thread posted");
        Keyboard.dismiss();
      }

    }
    else{
      Alert.alert("Empty","please enterr some thread!!")
    }

    axios
      .post("https://threads-backend-api.vercel.app/"+"create-post", postData)
      .then((response) => {
        setContent("");
      })
      .catch((error) => {
        console.log("error creating post", error);
      });
  };
  return (
    <SafeAreaView style={{ padding:10,marginTop:20 }} >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          padding: 10,
        }}
      >
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            resizeMode: "contain",
            marginLeft:5
          }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
          }}
        />

        <Text style={{padding:10, fontSize:18 ,fontWeight:"bold", margin:8, paddingLeft:0}}  >{user?.name}</Text>
      </View>

      <View style={{ width:"100%",flexDirection: "row", marginLeft: 10 }}>
        <TextInput
          value={content}
          onChangeText={(text) => setContent(text)}
          placeholderTextColor={"black"}
          placeholder="Type your message..."
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={{ marginTop: 20 }} />

      <Button onPress={handlePostSubmit} title="Share Post" />
    </SafeAreaView>
  );
};

export default ThreadsScreen;

const styles = StyleSheet.create({});
