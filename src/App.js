import React from 'react';
import NoteSaveEditButton from "./containers/noteSaveEditButton/noteSaveEditButton";
import './App.css';
import NoteTextInputHandle from "./containers/noteTextInputHandle/noteTextInputHandle";
import NoteMarkedText from "./containers/noteMarkedText/noteMarkedText";


const App = ()=>{
  return(
    <div className="textWrapper">
      <NoteTextInputHandle/>
      <NoteMarkedText/>
      <NoteSaveEditButton/>
    </div>
    )
};

export default App;
