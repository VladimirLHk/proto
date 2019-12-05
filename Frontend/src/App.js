import React from 'react';
import NoteSaveEditButton from "./containers/noteSaveEditButton/noteSaveEditButton";
import './App.css';
import NoteTextInputHandle from "./containers/noteTextInputHandle/noteTextInputHandle";
import NoteMarkedText from "./containers/noteMarkedText/noteMarkedText";

{/*<div className="textWrapper">*/}

const App = ()=>{
  return(
    <div className="container">
      <NoteTextInputHandle/>
      <NoteMarkedText/>
      <NoteSaveEditButton/>
    </div>
    )
};

export default App;
