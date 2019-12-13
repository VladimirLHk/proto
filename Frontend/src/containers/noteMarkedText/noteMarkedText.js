import {connect} from 'react-redux';
import React from "react";
import MarkedTextBlock from "../../components/markedTextBlock/markedTextBlock";
import './noteMarkedText.css';

const spanIdPrefix = 'spanText';
const fcClassName = 'properNoun';
const cursorClassName = 'markedBlockCursor';
const cursorSelector = 'span.' + cursorClassName;

// TODO Вероятно, стоит перенести эту функцию из компонента:
//  снять ответственность за разбиение на абзацы.
const makeMultiLineMarkedText = textBlocks => {
  let result = [];
  let line = [];
  textBlocks.forEach(({text, questId}) => {
    //попалась пустышка
    // if (text.length === 0) {
    //   return
    // }
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
  console.log('lined: ', result);
  return result;
};

//TODO Это может быть компонент, который визуализирует текст, разбитым на блоки и позволяет перемещаться курсору по тексту
// по каждому блоку, который есть в тексте или по определенному подмножетсву блоков;
// Сюда надо передавать функцию, которая будет выдавать, учитывать ли очередной блок при вычислении значения,
// с которым сравнивать переданный целевой номер курсора.

class MarkedText extends React.Component {
  componentDidMount() {
    this.scrollToCursor();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('from componentDidUpdate: ', prevProps, prevState, snapshot);
    this.scrollToCursor();
  }

  scrollToCursor() {
    let cursorElement = document.querySelector(cursorSelector);
    cursorElement && cursorElement.scrollIntoView({ behavior: 'smooth',  block: "center" });
  }

  render () {
    let {className = "row markedTextWrapper", textBlocks, cursorIndex} = this.props;
    let linedText = makeMultiLineMarkedText(textBlocks);
    // let linedText = [textBlocks];
    let blockNum = -1;
    return (
      <div className={className}>
        {linedText.map((line, index) => {
          return (
            <p className="lineBlock" key={'line' + index}>
              {line.map(({text, questId}, index) => {
                // if (text.length === 0) {
                //   return null
                // }
                questId && blockNum++;
                blockNum === cursorIndex && console.log(text.codePointAt(0));
                let key = spanIdPrefix + index;
                return <MarkedTextBlock
                  key = {key}
                  id = {key}
                  className = {questId ? (blockNum === cursorIndex ? cursorClassName : fcClassName) : ''}
                  text = {text}
                />
              })}
            </p>
          )
        })}
      </div>
    )
  }
}

const NoteMarkedText = connect(
  (state) =>
  {return {
    textBlocks: state.currentText,
    cursorIndex: state.cursorIndex,
  }}
  )(MarkedText);

export default NoteMarkedText;