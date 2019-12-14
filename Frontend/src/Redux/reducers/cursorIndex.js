import {MOVE_BLOCKS_CURSOR} from "../actionsNames";

const initialState = 0;

export default (state = initialState, action) => {
  if (action.type === MOVE_BLOCKS_CURSOR) {
    return action.cursorIndex
  }

  return state
}