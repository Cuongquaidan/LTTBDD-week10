import {
  FETCH_NOTES_REQUEST,
  CREATE_NOTE_REQUEST,
  UPDATE_NOTE_REQUEST,
  DELETE_NOTE_REQUEST,
} from '../ActionTypes';

export const fetchNotes = () => ({ type: FETCH_NOTES_REQUEST });
export const createNote = (note) => ({ type: CREATE_NOTE_REQUEST, payload: note });
export const updateNote = (note) => ({ type: UPDATE_NOTE_REQUEST, payload: note });
export const deleteNote = (id) => ({ type: DELETE_NOTE_REQUEST, payload: id });