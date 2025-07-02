import React, { useState } from 'react';
import StickyNote from './components/StickyNote';
import { useNotes } from './hooks/useNotes';

const App: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState('#fffa65');
  const { notes, createNote, updateNote, bringToFront } = useNotes();

  return (
    <div className="app">
      <div style={{ marginBottom: '0.5rem' }}>
        <label htmlFor="color">Choose color:</label> &nbsp;
        <input
          id="color"
          type="color"
          value={selectedColor}
          onChange={e => setSelectedColor(e.target.value)}
        />{' '}
        <button onClick={() => createNote(selectedColor)}>Create Note</button>
      </div>
      <div className="canvas">
        {notes.map(note => (
          <StickyNote
            key={note.id}
            note={note}
            onUpdate={updateNote}
            onTop={() => bringToFront(note.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
