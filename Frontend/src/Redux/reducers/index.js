import {combineReducers} from "redux";
import buttonState from "./noteButtonPressed";
import currentText from "./currentNoteTextOperate";
import lexicon from './updateLexicon';
import cursorIndex from './cursorIndex';
import basketsOperation from './basketsSetOperation';
import currentStepNum from './goNext';


export default combineReducers({
  buttonState,
  currentText,
  lexicon,
  cursorIndex,
  currentStepNum,
  basketsOperation,
})