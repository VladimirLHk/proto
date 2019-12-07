import {NOTE_BUTTON_PRESSED, SAVE_NOTE_BUTTON_PRESSED} from "../actionsNames";
import {TEST_TEXT} from "../../constants";
import getProperNounCandidates from "../../TextLib/properNounFilter";

const initialState = getProperNounCandidates(TEST_TEXT);

export default (state = initialState, action) => {
  if (action.type === SAVE_NOTE_BUTTON_PRESSED) {
    return getProperNounCandidates(action.text)
    // return action.text
  }

  return state
}