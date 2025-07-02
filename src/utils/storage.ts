import { Note } from '../types/note';

export const saveNotes = (notes: Note[]) => {
  localStorage.setItem('notes', JSON.stringify(notes));
};
