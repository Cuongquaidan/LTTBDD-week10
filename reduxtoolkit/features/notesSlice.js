import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await axios.get('https://6710cfdca85f4164ef2f6c45.mockapi.io/api/notes');
  return response.data;
});

export const createNote = createAsyncThunk('notes/createNote', async (note) => {
  const response = await axios.post('https://6710cfdca85f4164ef2f6c45.mockapi.io/api/notes', note);
  return response.data;
});

export const updateNote = createAsyncThunk('notes/updateNote', async (note) => {
  const response = await axios.put(`https://6710cfdca85f4164ef2f6c45.mockapi.io/api/notes/${note.id}`, note);
  return response.data;
});
export const deleteNote = createAsyncThunk('notes/deleteNote', async (noteId) => {
  await axios.delete(`https://6710cfdca85f4164ef2f6c45.mockapi.io/api/notes/${noteId}`);
  return noteId; // Return the ID of the deleted note for reducer
});

const notesSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.findIndex(note => note.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        return state.filter(note => note.id !== action.payload); // Remove the deleted note from the state
      });
  },
});

export default notesSlice.reducer;