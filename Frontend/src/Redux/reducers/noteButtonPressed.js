import {EDIT_NOTE_BUTTON_PRESSED, SAVE_NOTE_BUTTON_PRESSED} from "../actionsNames";

const initialState = false;

export default (state = initialState, action) => {
  if ([EDIT_NOTE_BUTTON_PRESSED, SAVE_NOTE_BUTTON_PRESSED].includes(action.type)) {
    return !state
  }

  return state
}