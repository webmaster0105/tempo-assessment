import { Note } from '../types/note';

export const saveNoteToAPI = async (note: Note): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Mock saved to API:', note);
      resolve();
    }, 500);
  });
};

export const fetchNotesFromAPI = async (): Promise<Note[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const stored = localStorage.getItem('notes');
      const notes = stored ? JSON.parse(stored) : [];
      console.log('Mock fetched from API');
      resolve(notes);
    }, 500);
  });
};
