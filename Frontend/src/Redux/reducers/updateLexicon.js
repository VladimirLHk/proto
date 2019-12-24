import {UPDATE_LEXICON} from "../actionsNames";
import getWords from "../../TextLib/getWords";

//вариант для символов
const initialState = {};

export default (state = initialState, action) => {
  if (action.type === UPDATE_LEXICON) {
    // console.log('state in start UPDATE_LEXICON:', state);
    let textLexicon = action.text.split('').reduce((prevRes, symbol,index) => {
      prevRes[symbol.codePointAt(0)] = symbol;
      return prevRes
    }, {});
    return Object.assign({}, state, textLexicon)
  }

  return state
}

// //вариант для слов
// const initialState = new Set();
//
// export default (state = initialState, action) => {
//   if (action.type === UPDATE_LEXICON) {
//     let resultLexicon = new Set(state);
//     getWords(action.text).forEach( word => {
//       resultLexicon.add(word)
//     });
//     console.log(resultLexicon);
//     return resultLexicon
//   }
//
//   return state
// }