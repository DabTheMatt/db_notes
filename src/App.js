import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

function App() {

const [notes, setNotes] = useState([]);
const [newTitle, setNewTitle] = useState('');
const [newContent, setNewContent] = useState('');

const notesRef = collection(db, 'notes');

  useEffect(() => {
    const getNotes = async () => {
      const data = await getDocs(notesRef);
     setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
  
    getNotes();
  }, []);

  return (
    <div className="App">
      {notes.map((note) => {
        return (
          <div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        )
      })}
    </div>
  );
}

export default App;
