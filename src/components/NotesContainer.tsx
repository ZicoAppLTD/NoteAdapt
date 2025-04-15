import React, { useState, useEffect } from 'react';
import StickyNote from './StickyNote';
import { StickyNoteIcon } from 'lucide-react';

interface Note {
     id: string;
     content: string;
     x: number;
     y: number;
     color: string;
}

interface NotesContainerProps {
     onNotesChange: (hasNotes: boolean) => void;
}

const NotesContainer: React.FC<NotesContainerProps> = ({ onNotesChange }) => {
     const [notes, setNotes] = useState<Note[]>([]);

     useEffect(() => {
          onNotesChange(notes.length > 0);
     }, [notes, onNotesChange]);

     const addNote = () => {
          const centerX = window.innerWidth / 2 - 140;
          const centerY = window.innerHeight / 2 - 140;

          const hasNoteInCenter = notes.some(note =>
               Math.abs(note.x - centerX) < 50 && Math.abs(note.y - centerY) < 50
          );

          const offset = hasNoteInCenter ? 30 : 0;
          const newNote: Note = {
               id: Date.now().toString(),
               content: '',
               x: centerX + offset,
               y: centerY + offset,
               color: '#FFFFFF'
          };
          setNotes(prevNotes => [...prevNotes, newNote]);
     };

     const updateNoteContent = (id: string, content: string) => {
          setNotes(prevNotes =>
               prevNotes.map(note => note.id === id ? { ...note, content } : note)
          );
     };

     const updateNoteColor = (id: string, color: string) => {
          setNotes(prevNotes =>
               prevNotes.map(note => note.id === id ? { ...note, color } : note)
          );
     };

     const deleteNote = (id: string) => {
          setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
     };

     const moveNoteToFront = (id: string) => {
          setNotes(prevNotes => {
               const noteIndex = prevNotes.findIndex(note => note.id === id);
               if (noteIndex === -1) return prevNotes;

               const note = prevNotes[noteIndex];
               const newNotes = [...prevNotes];
               newNotes.splice(noteIndex, 1);
               newNotes.push(note);
               return newNotes;
          });
     };

     return (
          <>
               <div className="fixed inset-0 isolate">
                    {notes.map(note => (
                         <StickyNote
                              key={note.id}
                              initialX={note.x}
                              initialY={note.y}
                              initialContent={note.content}
                              color={note.color}
                              onColorChange={(color) => updateNoteColor(note.id, color)}
                              onContentChange={(content) => updateNoteContent(note.id, content)}
                              onDragStart={() => moveNoteToFront(note.id)}
                              onDelete={() => deleteNote(note.id)}
                         />
                    ))}
               </div>

               <div className="fixed bottom-8 right-8 isolate">
                    <button
                         onClick={addNote}
                         className="bg-border/5 border-[2px] border-border/[8%] backdrop-blur-md outline-0 rounded-full cursor-pointer flex items-center justify-center transition-transform duration-200 hover:scale-110 p-[10px]"
                    >
                         <StickyNoteIcon className="w-6 h-6 rotate-12" />
                    </button>
               </div>
          </>
     );
};

export default NotesContainer; 