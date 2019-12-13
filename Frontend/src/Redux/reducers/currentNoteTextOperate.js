import {SAVE_NOTE_BUTTON_PRESSED} from "../actionsNames";
import {TEST_TEXT} from "../../constants";
import getProperNounCandidates from "../../TextLib/properNounFilter";
import getSymbolBlocks from "../../TextLib/getSymbolBlocks";

const convertSymbolBlocksToMarkedBlocksTextFormat = (blocks =>
    blocks.map(item => {
      return {text: String.fromCharCode(item.csId), questId: item.status}
    })
);

// const initialState = getProperNounCandidates(TEST_TEXT);
const initialState = convertSymbolBlocksToMarkedBlocksTextFormat(getSymbolBlocks(TEST_TEXT));

export default (state = initialState, action) => {
  if (action.type === SAVE_NOTE_BUTTON_PRESSED) {
    // return getProperNounCandidates(action.text)
    return convertSymbolBlocksToMarkedBlocksTextFormat(getSymbolBlocks(action.text))
  }

  return state
}