import {NOTE_BUTTON_PRESSED} from "../actionsNames";

const initialState = new Map();

export default (state = initialState, action) => {
  if (action.type === NOTE_BUTTON_PRESSED) {
    return !state
  }

  return state
}