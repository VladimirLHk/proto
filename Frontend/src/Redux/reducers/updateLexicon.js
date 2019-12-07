import {UPDATE_LEXICON} from "../actionsNames";
import getWords from "../../TextLib/getWords";

const initialState = new Set();

export default (state = initialState, action) => {
  if (action.type === UPDATE_LEXICON) {
    // console.log(state);
    let resultLexicon = new Set(state);
    getWords(action.text).forEach( word => {
      resultLexicon.add(word)
    });
    return resultLexicon
    // return action.text
  }

  return state
}