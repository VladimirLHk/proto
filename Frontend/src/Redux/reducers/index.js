import {combineReducers} from "redux";
import buttonState from "./noteButtonPressed";
import currentText from "./currentNoteTextOperate";
import lexicon from './updateLexicon';
import cursorIndex from './cursorIndex';
import basketsOperation from './basketsSetOperation';
import currentStepNum from './goNext';
import tagsOperations from './tagsOperations';
import symbolsOperations from './symbolsOperations';
import blocksOperations from './blocksOperations';

//  currentText,

export default combineReducers({
  buttonState,
  lexicon,
  cursorIndex,
  currentStepNum,
  basketsOperation,
  tagsOperations,
  symbolsOperations,
  blocksOperations,
})