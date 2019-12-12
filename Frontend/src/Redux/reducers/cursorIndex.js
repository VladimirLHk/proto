import {MOVE_BLOCKS_CURSOR} from "../actionsNames";

const initialState = 0;

export default (state = initialState, action) => {
  if (action.type === MOVE_BLOCKS_CURSOR) {
    console.log('from cursorIndex', state, action);
    let rowIndex = state + action.moving;
    let blocksAmount = 11;
    return rowIndex < 0 ? blocksAmount-1 : rowIndex % blocksAmount
  }

  return state
}