import {SPLIT_SEPARATORS, MATH_SYMBOLS, SPACE_SYMBOLS} from './mainParams'

const separatorsRegExp = new RegExp('(['+SPLIT_SEPARATORS+'])');

//TODO Переписать на проверку заглавной буквы через Unicode
const isCapital = letter => {
  return SPLIT_SEPARATORS.indexOf(letter) === -1 && MATH_SYMBOLS.indexOf(letter) === -1 && letter === letter.toUpperCase()
};

//
const isTheSameType = (isCandidate, word) => {
  return word.length === 0 || (isCandidate ?
    (SPACE_SYMBOLS.indexOf(word) !== -1 || isCapital(word[0])) :
    !isCapital(word[0]))
};

const checkAndCorrectBufferAndWord = (buffer, word) => {
  while (buffer.length !== 0 && buffer[buffer.length-1].length === 0 || SPACE_SYMBOLS.indexOf(buffer[buffer.length-1]) !== -1){
    word = buffer.pop() + word;
  }
  return {buffer, word}
};

const makeTextNode = (isCandidate, buffer) => {
  return {
    text: buffer.join(''),
    questId: +isCandidate
  }
};

export default text => {
  let {isCandidate, result, buffer} = text.split(separatorsRegExp).reduce(({isCandidate, result, buffer}, word) => {
    if (isTheSameType(isCandidate, word)) {
      buffer.push(word)
    } else {
      ({buffer, word} = isCandidate ? checkAndCorrectBufferAndWord(buffer, word) : {buffer, word});
      result.push(makeTextNode(isCandidate, buffer));
      buffer = [word];
      isCandidate = !isCandidate
    }
    return {isCandidate, result, buffer}
  }, {
        isCandidate:false,
        result: [],
        buffer: []
      });

  result.push(makeTextNode(isCandidate, buffer));
  return result

};

