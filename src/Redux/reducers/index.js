import {combineReducers} from "redux";
import buttonState from "./noteButtonPressed";
import currentText from "./currentNoteTextOperate";

export default combineReducers({buttonState, currentText})