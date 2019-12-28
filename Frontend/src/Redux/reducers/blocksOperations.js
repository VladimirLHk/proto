import {SAVE_NOTE_BUTTON_PRESSED, CLASSIFIED_BLOCK, SKIP_QUESTION} from "../actionsNames";
import {TEST_TEXT} from "../../constants";
import getProperNounCandidates from "../../TextLib/properNounFilter";
import getSymbolBlocks from "../../TextLib/getSymbolBlocks";

const updateBlocks = (blocks, {csId, symbolId}) => {
  return blocks.map(block => {
    if (block.csId === csId) {
      block.symbolId = symbolId;
      block.status = 0;
      delete block.symbols;
    }
    return block
  });
};

// const initialState = getProperNounCandidates(TEST_TEXT);
const initialState = {
  blocks: getSymbolBlocks({text: TEST_TEXT}),
  skipped: {blockId: [], csId: []},
  isForAll: true,
  isAutoApprove: false,
};

export default (state = initialState, action) => {

  switch (action.type) {
    case SAVE_NOTE_BUTTON_PRESSED:
      return {...state, blocks: getSymbolBlocks(action)};
    case CLASSIFIED_BLOCK:
      return {...state, blocks: updateBlocks(state.blocks.slice(), action)};
    case SKIP_QUESTION:
      let skipped = state.skipped.slice;

    default: return state;
  }
  // if (action.type === SAVE_NOTE_BUTTON_PRESSED) {
  //   // return getProperNounCandidates(action.text)
  //   return getSymbolBlocks(action.text, action.basketsSet)
  // }
  //
  // return state
}