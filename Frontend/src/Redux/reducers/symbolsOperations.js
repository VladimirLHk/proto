import {SYMBOL_ADD} from '../actionsNames';
import {getNewId} from '../../TextLib/getNewId';

const SYMBOL_ID_FACTOR = 4;
const initState = {symbolsSet: [], lastAddedSymbol:null};

const createSymbol = (symbolsSet, {csId, basketId, tags}) => {
  let newSymbolId = getNewId(SYMBOL_ID_FACTOR);
  for (
    let attempt=0;
    symbolsSet.findIndex(item => item.id === newSymbolId) !== -1, attempt < 50;
    attempt++
  ) {
    newSymbolId = getNewId(SYMBOL_ID_FACTOR);
  };

  return {id: newSymbolId, csId, basketId, tags}
};

export default (state = initState, action) => {
  if (action.type === SYMBOL_ADD) {
    let newSymbolSet = state.symbolsSet.slice();
    let {symbolId, csId, basketId, tags} = action;
    tags = tags.reduce((selectedTags, tag) => {
      if (tag.switchOn) {
        selectedTags.push(tag)
      }
      return selectedTags
    }, []);
    let newSymbol = {id: symbolId, csId, basketId, tags};
    newSymbolSet.push(newSymbol);
    console.log('SYMBOL_ADD:', newSymbolSet);
    return {
      symbolsSet: newSymbolSet,
      lastAddedSymbol: newSymbol,
    }
  }
  return state

}