import {SAVE_NOTE_BUTTON_PRESSED, CLASSIFIED_BLOCK} from "../actionsNames";
import {TEST_TEXT} from "../../constants";
import getProperNounCandidates from "../../TextLib/properNounFilter";
import getSymbolBlocks from "../../TextLib/getSymbolBlocks";

const updateBlocks = (blocks, {csId, symbolId}) => {
  return blocks.map(block => {
    if (block.csId === csId) {
      block.symbolId = symbolId;
      block.status = 0;
      delete block.basketId;
    }
    return block
  });
};

// const initialState = getProperNounCandidates(TEST_TEXT);
const initialState = getSymbolBlocks({text: TEST_TEXT});

export default (state = initialState, action) => {

  switch (action.type) {
    case SAVE_NOTE_BUTTON_PRESSED:
      return getSymbolBlocks(action);
    case CLASSIFIED_BLOCK:
      return updateBlocks(state.slice(), action);
    default: return state;
  }
  // if (action.type === SAVE_NOTE_BUTTON_PRESSED) {
  //   // return getProperNounCandidates(action.text)
  //   return getSymbolBlocks(action.text, action.basketsSet)
  // }
  //
  // return state
}