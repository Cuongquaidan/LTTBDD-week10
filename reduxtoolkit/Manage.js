
import { View, Text, SafeAreaView, Pressable, Image, TextInput } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, deleteNote } from './features/notesSlice'; 

const Manage = ({ navigation }) => {
  const dispatch = useDispatch();
  const notes = useSelector(state => state.notes);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleDelete = async (noteId) => {
    try {
      await dispatch(deleteNote(noteId)).unwrap(); // Use unwrap for error handling
    } catch (error) {
      console.error('Failed to delete note: ', error);
    }
  };

  return (
    <SafeAreaView style={{ padding: 20, alignItems: "center" }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <Pressable onPress={() => navigation.navigate("Home")}>{"<--"}</Pressable>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Image source={require("./assets/note.png")} style={{ width: 40, height: 40, borderRadius: 999, overflow: "hidden", borderWidth: 1 }} />
          <View>
            <Text style={{ fontWeight: "600" }}>Hi</Text>
            <Text>Have a great day ahead</Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 50, alignItems: "center", gap: 30 }}>
        <TextInput style={{ padding: 10, width: 300, borderRadius: 10, borderWidth: 1 }} placeholder="Search" />
        <View style={{ gap: 20 }}>
          {notes.map(note => (
            <View key={note.id} style={{ width: 300, borderRadius: 10, borderWidth: 1, flexDirection: "row", justifyContent: "space-between", padding: 10, backgroundColor: "#ddd" }}>
              <Text style={{ fontWeight: "700" }}>{note.content}</Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Text style={{ color: "red" }} onPress={() => handleDelete(note.id)}>Delete</Text>
                <Text style={{ color: "orange" }} onPress={() => navigation.navigate("Add", { notes, note })}>Update</Text>
              </View>
            </View>
          ))}
        </View>
        <Pressable onPress={() => navigation.navigate("Add", { notes })} style={{ backgroundColor: "#00BDD6", width: 50, height: 50, borderRadius: 25, alignItems: "center", justifyContent: "center", paddingBottom: 10 }}>
          <Text style={{ fontSize: 40, color: "white" }}>+</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Manage;
