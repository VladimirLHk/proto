import {connect} from 'react-redux';
import React from "react";
import MarkedTextBlock from "../../components/markedTextBlock/markedTextBlock";
import './noteMarkedText.css'

const spanIdPrefix = 'spanText';
const fcClassName = 'properNoun';

const makeMultiLineMarkedText = textBlocks => {
  let result = [];
  let line = [];
  textBlocks.forEach(({text, questId}) => {
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
  return result;
};


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

const NoteMarkedText = connect(
  (state) => {return {textBlocks: state.currentText}}
  )(MarkedText);

export default NoteMarkedText;