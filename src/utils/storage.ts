import { Note } from '../types/note';

export const getInitialNotes = (): Note[] => {
  const stored = localStorage.getItem('notes');
  return stored ? JSON.parse(stored) : [];
};

export const saveNotes = (notes: Note[]) => {
  localStorage.setItem('notes', JSON.stringify(notes));
};
