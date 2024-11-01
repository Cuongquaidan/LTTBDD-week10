import { View, Text ,SafeAreaView,Image,TextInput,Pressable} from 'react-native'
import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, createNote, updateNote, deleteNote } from './actions/noteActions';

import {useAuth} from "./context/authContext"
const Add = ({navigation,route}) => {
    const dispatch = useDispatch();
  const notes = route.params?.notes
  const note = route.params?.note
  const [content,setContent] = useState(note?.content||"")

 const handleAdd = async () => {
    if (!content) {
      alert("Note cannot be empty");
      return;
    }

    try {
      const newNote = { content }; // Create note object

      const response = await dispatch(createNote(newNote)); // Use Redux action

      if (!response) {
        throw new Error('Failed to add note');
      }

      navigation.navigate('Manage', { notes: [...notes, response] }); // Navigate with updated notes
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    if (!content) {
      alert("Note cannot be empty");
      return;
    }

    try {
      const updatedNote = { id: note.id, content }; // Update note object

      const response = await dispatch(updateNote(updatedNote)); // Use Redux action

      if (!response) {
        throw new Error('Failed to update note');
      }

      const updatedNotes = notes.map(item => (item.id === note.id ? response : item)); // Update local notes
      navigation.navigate('Manage', { notes: updatedNotes }); // Navigate with updated notes
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <SafeAreaView style={{padding:20,alignItems:"center"}}>
            <View style={{flexDirection:"row-reverse",alignItems:"center",justifyContent:"space-between",width:"100%"}}>
                <Pressable onPress={()=>navigation.navigate("Manage")}>{"<--"}</Pressable>
                <View style={{flexDirection:"row",gap:10}}>
                    <Image source={require("./assets/note.png")} style={{width:40,height:40,borderRadius:999,overflow:"hidden",borderWidth:1}}></Image>
                    <View>
                        <Text style={{fontWeight:600}}>Hi </Text>
                        <Text>have a great day a head</Text>
                    </View>
                </View>
            </View>
            <View style={{marginTop:50,alignItems:"center",gap:30}}>
                <Text style={{fontWeight:700,fontSize:25}}>{note?"Update note":"ADD YOUR NOTE"}</Text>
                <TextInput style={{padding:10,width:300,borderRadius:10,borderWidth:1}} placeholder="Input your note" value={content} onChangeText = {(value)=>setContent(value)}>
                
                </TextInput>
               
                <Pressable  style={{backgroundColor:"#00BDD6",width:160,height:50,borderRadius:10,alignItems:"center",justifyContent:"center",paddingBottom:10}}   onPress={note?handleUpdate: handleAdd} >
                    <Text style={{fontSize:30, color:"white"}}>Finish</Text>
                </Pressable>

                 <Image source={require("./assets/note.png")} style={{width:200,height:200, marginTop:50}}></Image>
            </View>
        </SafeAreaView>
  )
}

export default Add