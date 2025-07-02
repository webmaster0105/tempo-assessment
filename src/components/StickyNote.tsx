import React, { useRef } from 'react';
import { Note } from '../types/note';

interface StickyNoteProps {
  note: Note;
  onUpdate: (id: string, changes: Partial<Note>) => void;
  onTop: () => void;
}

const StickyNote: React.FC<StickyNoteProps> = ({ note, onUpdate, onTop }) => {
  const noteRef = useRef<HTMLDivElement>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    onTop();
    const startX = e.clientX;
    const startY = e.clientY;
    const origX = note.x;
    const origY = note.y;

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      onUpdate(note.id, { x: origX + dx, y: origY + dy });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onResize = (e: React.MouseEvent) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = note.width;
    const startH = note.height;

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      onUpdate(note.id, {
        width: Math.max(100, startW + dx),
        height: Math.max(100, startH + dy),
      });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      ref={noteRef}
      className="note"
      style={{
        top: note.y,
        left: note.x,
        width: note.width,
        height: note.height,
        backgroundColor: note.color,
        zIndex: note.zIndex,
      }}
      onMouseDown={onMouseDown}
    >
      <textarea
        value={note.text}
        onChange={e => onUpdate(note.id, { text: e.target.value })}
        className="note-text"
      />
      <div className="resizer" onMouseDown={onResize} />
    </div>
  );
};

export default StickyNote;
