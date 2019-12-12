import {combineReducers} from "redux";
import buttonState from "./noteButtonPressed";
import currentText from "./currentNoteTextOperate";
import  lexicon from './updateLexicon';
import  cursorIndex from './cursorIndex';

export default combineReducers({
  buttonState,
  currentText,
  lexicon,
  cursorIndex
})