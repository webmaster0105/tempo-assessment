import { useState, useEffect } from 'react';
import { Note } from '../types/note';
import { saveNotes } from '../utils/storage';
import { saveNoteToAPI, fetchNotesFromAPI } from '../utils/api';

export const useNotes = () => {
  // Load notes synchronously on first render
  const [notes, setNotes] = useState<Note[]>(() => {
    const stored = localStorage.getItem('notes');
    return stored ? JSON.parse(stored) : [];
  });

  const [zTop, setZTop] = useState(() => {
    const stored = localStorage.getItem('notes');
    if (stored) {
      const parsed: Note[] = JSON.parse(stored);
      return Math.max(0, ...parsed.map(n => n.zIndex));
    }
    return 1;
  });

  // Optional: Also refresh notes asynchronously (mock API) if needed
  useEffect(() => {
    fetchNotesFromAPI().then(fetched => {
      if (fetched.length > 0) {
        setNotes(fetched);
        const maxZ = Math.max(0, ...fetched.map(n => n.zIndex));
        setZTop(maxZ);
      }
    });
  }, []);

  useEffect(() => {
    saveNotes(notes);
    notes.forEach(note => saveNoteToAPI(note));
  }, [notes]);

  const createNote = (color: string) => {
    let x = 100;
    let y = 100;
    if (notes.length > 0) {
      const last = notes[notes.length - 1];
      x = last.x + 10;
      y = last.y + 10;
    }

    const newNote: Note = {
      id: crypto.randomUUID(),
      x,
      y,
      width: 200,
      height: 200,
      text: '',
      color,
      zIndex: zTop + 1,
    };
    setZTop(zTop + 1);
    setNotes(prev => [...prev, newNote]);
  };

  const updateNote = (id: string, changes: Partial<Note>) => {
    setNotes(prev =>
      prev.map(note => (note.id === id ? { ...note, ...changes } : note))
    );
  };

  const bringToFront = (id: string) => {
    setZTop(zTop + 1);
    updateNote(id, { zIndex: zTop + 1 });
  };

  return {
    notes,
    createNote,
    updateNote,
    bringToFront,
  };
};
