import {NOTE_BUTTON_PRESSED} from "../actionsNames";
import {TEST_TEXT} from "../../constants";

const initialState = TEST_TEXT;

export default (state = initialState, action) => {
  if (action.type === NOTE_BUTTON_PRESSED) {
    return action.text
  }

  return state
}