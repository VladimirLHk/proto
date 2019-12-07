import {EDIT_NOTE_BUTTON_PRESSED, NOTE_BUTTON_PRESSED, SAVE_NOTE_BUTTON_PRESSED} from "../actionsNames";

const initialState = false;

export default (state = initialState, action) => {
  if ([EDIT_NOTE_BUTTON_PRESSED, SAVE_NOTE_BUTTON_PRESSED].indexOf(action.type) !== -1) {
    return !state
  }

  return state
}