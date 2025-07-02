import React, { useState, useEffect } from 'react';
import { Note } from './types/note';
import { getInitialNotes, saveNotes } from './utils/storage';
import StickyNote from './components/StickyNote';

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(getInitialNotes);
  const [zTop, setZTop] = useState(1);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const createNote = () => {
    const id = crypto.randomUUID();
    const newNote: Note = {
      id,
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      text: '',
      color: '#fffa65',
      zIndex: zTop + 1,
    };
    setZTop(zTop + 1);
    setNotes([...notes, newNote]);
  };

  const updateNote = (id: string, changes: Partial<Note>) => {
    setNotes(prev =>
      prev.map(note => (note.id === id ? { ...note, ...changes } : note))
    );
  };

  return (
    <div className="app">
      <button onClick={createNote}>Create Note</button>
      <div className="canvas">
        {notes.map(note => (
          <StickyNote
            key={note.id}
            note={note}
            onUpdate={updateNote}
            onTop={() => setZTop(zTop + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
