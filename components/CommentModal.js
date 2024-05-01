// // CommentModal.js

// import React, { useState } from 'react';
// import { Modal, View, TextInput, Button, StyleSheet, Text, Image } from 'react-native';
// import { addListener } from '../api/models/user';

// const CommentModal = ({ visible, onClose, onSubmit }) => {
//   const [content, setContent] = useState('');

//   const handleSubmit = () => {
//     onSubmit(content);
//     setContent(''); // Clear input field after submission
//     onClose(); // Close the modal
//   };

//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={visible}
//       onRequestClose={onClose}
//     >
//       <View style={styles.modalContainer}>

//         <View style={styles.uppersection}>
//           <Image
//             style={{
//               width: 40,
//               height: 40,
//               borderRadius: 20,
//               resizeMode: "contain",
//             }}
//             source={{
//               uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
//             }}
//           />

//           <View style={styles.contentContainer} >
//             <Text
//               style={{ fontSize: 15, fontWeight: "bold", marginBottom: 4 }}
//             >
//               Abdul Shaikh
//             </Text>
//             <Text>Heyy wanna ride</Text>

//           </View>

//         </View>

//         <View style={styles.modalContent}>
//           <View style={styles.inputContainer}>
//             <View style={styles.replyname}>
//               <Text style={{fontSize:14}} >Replying to abduldotexe </Text>
//             </View>

//             <TextInput
//               style={styles.input}
//               placeholder="Enter your comment..."
//               value={content}
//               onChangeText={setContent}
//             />

//             <Button title="Submit" onPress={handleSubmit} />
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     height: "auto",
//     width: "100%",
//     position: "absolute",
//     bottom: 0,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     borderWidth:3,
//     backgroundColor: "white",
//     borderTopColor:"black",
//     borderBottomColor:"white"


//   },
//   uppersection:{
//     display:'flex',
//     padding:8,
//     marginTop:7,
//     flexDirection:"row",
//     gap:4
//   },

//   contentContainer:{
//     padding:5,
//     justifyContent:"center",
//     alignItems:"center",
//   },

//   modalContent: {
//     backgroundColor: 'transparent', // Transparent background for upper part
//     flex: 1,
//     justifyContent: "flex-end",

//   },
//   inputContainer: {
//     borderTopLeftRadius: 30,
//     padding: 10,
//     paddingTop:5,
//     width: "100%",
//     flex: 1,
//     justifyContent: "flex-end"

//   },


//   replyname: {
//     padding: 5,
//     marginBottom:6
//   },

//   input: {
//     marginBottom: 8,
//     padding: 10,
//     width: "full",
//     borderWidth: 1,
//     borderColor: 'black',
//     borderRadius: 5,
//   },
// });

// export default CommentModal;


// CommentModal.js

import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text, Image, TouchableWithoutFeedback } from 'react-native';

const CommentModal = ({ visible, onClose, onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    onSubmit(content);
    setContent(''); // Clear input field after submission
    onClose(); // Close the modal
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackdrop} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContainer}>

        <View style={styles.uppersection}>
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

          <View style={styles.contentContainer} >
            <Text
              style={{ fontSize: 15, fontWeight: "bold", marginBottom: 4 }}
            >
              Abdul Shaikh
            </Text>
            <Text>Heyy wanna ride</Text>

          </View>

        </View>

        <View style={styles.modalContent}>
          <View style={styles.inputContainer}>
            <View style={styles.replyname}>
              <Text style={{ fontSize: 14 }}>Replying to abduldotexe </Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Enter your comment..."
              value={content}
              onChangeText={setContent}
            />

            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'transparent', // Semi-transparent black background
  },
  modalContainer: {
    height: "auto",
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 3,
    backgroundColor: "white",
    borderTopColor: "black",
    borderBottomColor: "white"
  },
  uppersection: {
    display: 'flex',
    padding: 8,
    marginTop: 7,
    flexDirection: "row",
    gap: 4
  },
  contentContainer: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: 'transparent', // Transparent background for upper part
    flex: 1,
    justifyContent: "flex-end",
  },
  inputContainer: {
    borderTopLeftRadius: 30,
    padding: 10,
    paddingTop: 5,
    width: "100%",
    flex: 1,
    justifyContent: "flex-end"
  },
  replyname: {
    padding: 5,
    marginBottom: 6
  },
  input: {
    marginBottom: 8,
    padding: 10,
    width: "full",
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
});

export default CommentModal;

