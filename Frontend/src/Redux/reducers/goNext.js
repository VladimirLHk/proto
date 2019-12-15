import {CHOICE_DONE} from "../actionsNames";

const initialState = 0;

export default (state = initialState, action) => {
  if (action.type === CHOICE_DONE) {
    return action.choiceNum
  }

  return state
}