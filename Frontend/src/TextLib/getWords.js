import {SPLIT_SEPARATORS, SPACE_SYMBOLS} from './mainParams'

const separatorsRegExp = new RegExp('(['+SPLIT_SEPARATORS+'])');
const serviceSymbolsRegExp = new RegExp('(['+SPLIT_SEPARATORS+SPACE_SYMBOLS+'])', 'g');

export default text => {
  return text.split(separatorsRegExp).map(word => {
    return word.replace(serviceSymbolsRegExp, '')
  }).filter(word => {
    return word.length > 0
  });
};
