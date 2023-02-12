import React, { useState, useEffect } from "react";
import './App.css';
import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

function App() {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const notesRef = collection(db, "notes");



  const createNote = async () => {
    await addDoc(notesRef, { title: newTitle, content: newContent });
    setNewTitle('');
    setNewContent('');
  };

  const editNote = (id, title, content) => {
    setEditTitle(title);
    setEditContent(content);
    console.log(id, title, content);
  }

  const deleteNote = async (id) => {
    const noteDoc = doc(db, 'notes', id);
    await deleteDoc(noteDoc);
  }

  const updateNote = async (id, title, content) => {
    const noteDoc = doc(db, 'users', id);

    const newField = {
      title: title,
      content: content
    }
    await updateDoc(noteDoc, newField)
  }

  useEffect(() => {
    const getNotes = async () => {
      const data = await getDocs(notesRef);
      setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getNotes();
  }, [createNote, deleteNote]);

  return (
    <div className="App">
      <h1>DB-NOTES</h1>
      <div className="add-note-container">
        <input
          type="text"
          placeholder="title..."
          onChange={(event) => {
            setNewTitle(event.target.value);
          }}
        />
        <textarea
          type="textarea"
          rows="10"
          cols="30"
          placeholder="content..."
          onChange={(event) => {
            setNewContent(event.target.value);
          }}
        />
        <button onClick={createNote}>Add note</button>
      </div>
      {notes.map((note) => {
        return (
          <div key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <button onClick={() => {deleteNote(note.id)}}>delete</button>
            <button onClick={() => {editNote(note.id, note.title, note.content)}}>edit</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
