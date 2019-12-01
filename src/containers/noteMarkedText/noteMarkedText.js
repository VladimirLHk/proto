import {connect} from 'react-redux';
import React from "react";
import MarkedTextBlock from "../../components/markedTextBlock/markedTextBlock";
import './noteMarkedText.css'

const spanIdPrefix = 'spanText';
const fcClassName = 'properNoun';

const splitSeparators = '\n !,.:?";\u00A0';
const mathSymbols = '0123456789+-*/@#%^&';
const separatorsRegExp = new RegExp('(['+splitSeparators+'])');

const isCapital = letter => {
  return splitSeparators.indexOf(letter) === -1 && mathSymbols.indexOf(letter) === -1 && letter === letter.toUpperCase()
};

const splitText = (text) => {
  let result = [];
  let buffer = [];
  text.split(separatorsRegExp).forEach(word => {
    if (word.length > 0 && (word === '\n' || isCapital(word[0]))) {
      if (buffer.length > 0) {
        result.push(buffer.join(''));
        buffer = [];
      }
      result.push(word)
    } else {
      buffer.push(word)
    }
  });
  if (buffer.length > 0) {
    result.push(buffer.join(''));
  }
  return result
};

const makeMultiLineMarkedText = textBlocks => {
  let result = [];
  let line = [];
  textBlocks.forEach((text) => {
    //попалась пустышка
    if (text.length === 0) {
      return
    }
    //попался конец строки
    if (text === '\n') {
      result.push(line);
      line = [];
      return
    }
    line.push(text);
  });
  if (line.length > 0) {
    result.push(line);
  }
  console.log(result);
  return result;
};

const MarkedText = ({className, textBlocks}) => {
  let linedText = makeMultiLineMarkedText(textBlocks);
  return (
    <div className={className}>
        {linedText.map((line, index) => {
          return (
            <p className="lineBlock" key={'line' + index}>
              {line.map((text, index) => {
                if (text.length === 0) {
                  return
                }
                let key = spanIdPrefix + index;
                return <MarkedTextBlock
                  key = {key}
                  id = {key}
                  className = {isCapital(text[0]) ? fcClassName : ''}
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

const mapStateToProps = (state) => {
  return {
    textBlocks: splitText(state.currentText),
    className: "row markedTextWrapper" + (!state.buttonState ? " hidden" : ""),
  }
};

const NoteMarkedText = connect(
  mapStateToProps
)(MarkedText);

export default NoteMarkedText;