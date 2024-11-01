import { View, Text, SafeAreaView, Pressable, Image, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { notesState } from './state/notesAtom';
import axios from 'axios';

const Add = ({ navigation, route }) => {
  const notes = useRecoilValue(notesState);
  const setNotes = useSetRecoilState(notesState);
  const note = route.params?.note;

  const [content, setContent] = useState(note?.content || "");

  const handleAdd = async () => {
    if (!content) {
      alert("Note cannot be empty");
      return;
    }

    try {
      const response = await axios.post('https://6710cfdca85f4164ef2f6c45.mockapi.io/api/notes', { content });
      setNotes(prevNotes => [...prevNotes, response.data]);
      navigation.navigate('Manage');
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  };

  const handleUpdate = async () => {
    if (!content) {
      alert("Note cannot be empty");
      return;
    }

    try {
      const response = await axios.put(`https://6710cfdca85f4164ef2f6c45.mockapi.io/api/notes/${note.id}`, { content });
      setNotes(prevNotes => prevNotes.map(n => (n.id === note.id ? response.data : n)));
      navigation.navigate('Manage');
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };

  return (
    <SafeAreaView style={{ padding: 20, alignItems: "center" }}>
      <View style={{ flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <Pressable onPress={() => navigation.navigate("Manage")}>{"<--"}</Pressable>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Image source={require("./assets/note.png")} style={{ width: 40, height: 40, borderRadius: 999, overflow: "hidden", borderWidth: 1 }} />
          <View>
            <Text style={{ fontWeight: "600" }}>Hi</Text>
            <Text>Have a great day ahead</Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 50, alignItems: "center", gap: 30 }}>
        <Text style={{ fontWeight: "700", fontSize: 25 }}>{note ? "Update Note" : "Add Your Note"}</Text>
        <TextInput
          style={{ padding: 10, width: 300, borderRadius: 10, borderWidth: 1 }}
          placeholder="Input your note"
          value={content}
          onChangeText={setContent}
        />
        <Pressable
          style={{ backgroundColor: "#00BDD6", width: 160, height: 50, borderRadius: 10, alignItems: "center", justifyContent: "center" }}
          onPress={note ? handleUpdate : handleAdd}
        >
          <Text style={{ fontSize: 30, color: "white" }}>Finish</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Add;
