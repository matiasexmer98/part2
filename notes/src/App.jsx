import { useState } from "react";
import Note from "./components/Note.jsx";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("a new note...");

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    };
    notes.concat(noteObject);

    setNotes(notes.concat(noteObject));
    setNewNote("");
  };

  // const handleNewNote = (e) => {
  //   setNewNote(e.target.value);
  //   const noteObject = {
  //   content: newNote,
  //   important: Math.random() < 0.5,
  //   id: String(notes.length + 1),
  // }
  //   setNotes.concat(noteObject);

  // }

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
