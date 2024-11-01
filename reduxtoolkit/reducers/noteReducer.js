import {
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_FAILURE,
  CREATE_NOTE_SUCCESS,
  UPDATE_NOTE_SUCCESS,
  DELETE_NOTE_SUCCESS,
} from '../ActionTypes';

const initialState = {
  notes: [],
  loading: false,
  error: null,
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTES_SUCCESS:
      return { ...state, notes: action.payload, loading: false };
    case FETCH_NOTES_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case CREATE_NOTE_SUCCESS:
      return { ...state, notes: [...state.notes, action.payload] };
    case UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload.id ? action.payload : note
        ),
      };
    case DELETE_NOTE_SUCCESS:
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload),
      };
    default:
      return state;
  }
};

export default noteReducer;