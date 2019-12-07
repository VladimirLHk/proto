import {connect} from 'react-redux';
import React from "react";
import MarkedTextBlock from "../../components/markedTextBlock/markedTextBlock";
import './noteMarkedText.css'
import testFunc from "../../TextLib/properNounFilter";

const spanIdPrefix = 'spanText';
const fcClassName = 'properNoun';

// const splitSeparators = '\n !,.:?";\u00A0';
// const mathSymbols = '0123456789+-*/@#%^&';
// const separatorsRegExp = new RegExp('(['+splitSeparators+'])');

// const isCapital = letter => {
//   return splitSeparators.indexOf(letter) === -1 && mathSymbols.indexOf(letter) === -1 && letter === letter.toUpperCase()
// };

// const splitText = (text) => {
//   let result = [];
//   let buffer = [];
//   text.split(separatorsRegExp).forEach(word => {
//     if (word.length > 0 && (word === '\n' || isCapital(word[0]))) {
//       if (buffer.length > 0) {
//         result.push(buffer.join(''));
//         buffer = [];
//       }
//       result.push(word)
//     } else {
//       buffer.push(word)
//     }
//   });
//   if (buffer.length > 0) {
//     result.push(buffer.join(''));
//   }
//   return result
// };

const makeMultiLineMarkedText = textBlocks => {
  let result = [];
  let line = [];
  textBlocks.forEach(({text, questId}) => {
    // console.log(text);
    //попалась пустышка
    if (text.length === 0) {
      return
    }
    //попался конец абзаца или несколько абзацев "без вопросов"
    if (text.indexOf('\n') !== -1) {
      let blockPerStatements = text.split('\n');
      line.push({text: blockPerStatements.shift()+'\n', questId});
      result.push(line);
      line = [];
      blockPerStatements.forEach((statement) => {
        result.push([{
          text: statement+'\n',
          questId
        }]);
      });
      return
    }
    line.push({text, questId});
  });
  if (line.length > 0) {
    result.push(line);
  }
  // console.log('makeMultiLineMarkedText:');
  // console.log(result);
  return result;
};

// className = {isCapital(text[0]) ? fcClassName : ''}

const MarkedText = ({className = "row markedTextWrapper", textBlocks}) => {
  let linedText = makeMultiLineMarkedText(textBlocks);
  return (
    <div className={className}>
        {linedText.map((line, index) => {
          return (
            <p className="lineBlock" key={'line' + index}>
              {line.map(({text, questId}, index) => {
                if (text.length === 0) {
                  return
                }
                let key = spanIdPrefix + index;
                return <MarkedTextBlock
                  key = {key}
                  id = {key}
                  className = {questId ? fcClassName : ''}
                  text = {text}
                />
              })}
            </p>
          )
        })}
    </div>
  )
};

// className: "row markedTextWrapper" + (!state.buttonState ? " hidden" : ""),

// const mapStateToProps = (state) => {
//   console.log(testFunc(state.currentText));
//   return {
//     textBlocks: splitText(state.currentText),
//   }
// };


// mapStateToProps

const NoteMarkedText = connect(
  (state) => {return {textBlocks: state.currentText}}
  )(MarkedText);

export default NoteMarkedText;