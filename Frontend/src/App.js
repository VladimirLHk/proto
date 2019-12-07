import React from 'react';
import NoteSaveEditButton from "./containers/noteSaveEditButton/noteSaveEditButton";
import './App.css';
import NoteTextInputHandle from "./containers/noteTextInputHandle/noteTextInputHandle";
import NoteMarkedText from "./containers/noteMarkedText/noteMarkedText";
import {connect} from "react-redux";

{/*<div className="textWrapper">*/}

const AppCard = ({isEdit})=>{
  return(
    <div className="container">
      {!isEdit && <NoteTextInputHandle/>}
      {isEdit && <NoteMarkedText/>}
      <NoteSaveEditButton/>
    </div>
    )
};

const App = connect(
  (state) => {return {isEdit: state.buttonState}}
)(AppCard);

export default App;
