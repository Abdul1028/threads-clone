import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useEffect, useContext, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { UserType } from "../UserContext";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import CommentModal from "../components/CommentModal";


const HomeScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    fetchPosts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (post) => {
    setShowModal(true);
    setSelectedPost(post)

  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCommentSubmit = (content,id) => {
    // Submit the comment to the backend or handle as needed
    console.log('Submittedf comment:', content);
    handleComment(id,content);
    console.log("Done submitting")

  };


  const fetchPosts = async () => {
    try {
      const response = await axios.get("https://threads-backend-api.vercel.app/" + "get-posts");
      setPosts(response.data);
    } catch (error) {
      console.log("error fetching posts", error);
    }
  };

  console.log("posts", posts);
  const handleLike = async (postId) => {
    try {
      const response = await axios.put(
        `https://threads-backend-api.vercel.app/posts/${postId}/${userId}/like`
      );
      const updatedPost = response.data;

      const updatedPosts = posts?.map((post) =>
        post?._id === updatedPost._id ? updatedPost : post
      );

      setPosts(updatedPosts);
    } catch (error) {
      console.log("Error liking the post", error);
    }
  };

  const handleDislike = async (postId) => {
    try {
      const response = await axios.put(
        `https://threads-backend-api.vercel.app/posts/${postId}/${userId}/unlike`
      );
      const updatedPost = response.data;
      // Update the posts array with the updated post
      const updatedPosts = posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
      console.log("updated ", updatedPosts)

      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const handleComment = async (postId, content) => {

    try {
      const response = await axios.post(`https://threads-backend-api.vercel.app/comment/${postId}`, {
        userId: userId,
        content: content
      });

      if (response.status === 201) {
        console.log("Comment added successfully");
      } else {
        console.error("Failed to add comment:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }

  };


  return (
    <ScrollView style={{ marginTop: 50, flex: 1, backgroundColor: "white" }}>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Image
          style={{ width: 60, height: 40, resizeMode: "contain" }}
          source={{
            uri: "https://freelogopng.com/images/all_img/1688663386threads-logo-transparent.png",
          }}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        {posts?.map((post) => (
          <View
            style={{
              padding: 15,
              borderColor: "#D0D0D0",
              borderTopWidth: 1,
              flexDirection: "row",
              gap: 10,
              marginVertical: 10,
            }}
          >
            <View>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  resizeMode: "contain",
                }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
                }}
              />
            </View>

            <View>
              <Text
                style={{ fontSize: 15, fontWeight: "bold", marginBottom: 4 }}
              >
                {post?.user?.name}
              </Text>
              <Text>{post?.content}</Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 15,
                }}
              >
                {post?.likes?.includes(userId) ? (
                  <AntDesign
                    onPress={() => handleDislike(post?._id)}
                    name="heart"
                    size={18}
                    color="red"
                  />
                ) : (
                  <AntDesign
                    onPress={() => handleLike(post?._id)}
                    name="hearto"
                    size={18}
                    color="black"
                  />
                )}

                <FontAwesome name="comment-o" onPress={()=> handleOpenModal(post) } size={18} color="black" />

                <Ionicons name="share-social-outline"  size={18} color="black" />


                {/* Modal */}
                {/* <CommentModal visible={showModal} onClose={handleCloseModal} onSubmit={handleCommentSubmit} /> */}

                <CommentModal post = {selectedPost} visible = {showModal} onClose = {handleCloseModal} onSubmit = {handleCommentSubmit} />

              </View>

              <Text style={{ marginTop: 7, color: "gray" }}>
                {post?.likes?.length} likes • {post?.replies?.length} reply
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}; 

export default HomeScreen;

const styles = StyleSheet.create({});
