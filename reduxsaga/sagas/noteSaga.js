import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_NOTES_REQUEST,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_FAILURE,
  CREATE_NOTE_REQUEST,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_FAILURE,
  UPDATE_NOTE_REQUEST,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAILURE,
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAILURE,
} from '../ActionTypes';

const API_URL = 'https://6710cfdca85f4164ef2f6c45.mockapi.io/api/notes';

function* fetchNotes() {
  try {
    const response = yield call(axios.get, API_URL);
    yield put({ type: FETCH_NOTES_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: FETCH_NOTES_FAILURE, payload: error.message });
  }
}

function* createNote(action) {
  try {
    const response = yield call(axios.post, API_URL, action.payload);
    yield put({ type: CREATE_NOTE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: CREATE_NOTE_FAILURE, payload: error.message });
  }
}

function* updateNote(action) {
  try {
    const response = yield call(axios.put, `${API_URL}/${action.payload.id}`, action.payload);
    yield put({ type: UPDATE_NOTE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: UPDATE_NOTE_FAILURE, payload: error.message });
  }
}

function* deleteNote(action) {
  try {
    yield call(axios.delete, `${API_URL}/${action.payload}`);
    yield put({ type: DELETE_NOTE_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: DELETE_NOTE_FAILURE, payload: error.message });
  }
}

export default function* noteSaga() {
  yield takeLatest(FETCH_NOTES_REQUEST, fetchNotes);
  yield takeLatest(CREATE_NOTE_REQUEST, createNote);
  yield takeLatest(UPDATE_NOTE_REQUEST, updateNote);
  yield takeLatest(DELETE_NOTE_REQUEST, deleteNote);
}