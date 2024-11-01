// src/hooks/useFetchNotes.js

import { useSetRecoilState } from 'recoil';
import { notesState } from '../state/notesAtom';
import axios from 'axios';
import { useEffect } from 'react';

const useFetchNotes = () => {
  const setNotes = useSetRecoilState(notesState);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('https://6710cfdca85f4164ef2f6c45.mockapi.io/api/notes');
        setNotes(response.data);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };

    fetchNotes();
  }, [setNotes]);
};

export default useFetchNotes;