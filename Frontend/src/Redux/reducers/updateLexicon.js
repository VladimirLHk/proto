import {UPDATE_LEXICON} from "../actionsNames";
import getWords from "../../TextLib/getWords";

const initialState = new Set();

export default (state = initialState, action) => {
  if (action.type === UPDATE_LEXICON) {
    let resultLexicon = new Set(state);
    getWords(action.text).forEach( word => {
      resultLexicon.add(word)
    });
    console.log(resultLexicon);
    return resultLexicon
  }

  return state
}