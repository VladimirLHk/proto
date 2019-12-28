import {connect} from 'react-redux';
import React from "react";
import MarkedTextBlock from "../../components/markedTextBlock/markedTextBlock";
import './noteMarkedText.css';

const spanIdPrefix = 'spanText';
const fcClassName = 'properNoun';
const cursorClassName = 'markedBlockCursor';
const cursorSelector = 'span.' + cursorClassName;
const CURSOR_ELEMENT_ID = 'CURSOR_ELEMENT_ID';

const convertSymbolBlocksToMarkedBlocksTextFormat = (blocks =>
    blocks.map((item, index) => {
      return {text: String.fromCharCode(item.csId), questId: item.status, id: ''+item.csId+'id-'+index}
    })
);

// TODO Вероятно, стоит перенести эту функцию из компонента:
//  снять ответственность за разбиение на абзацы.
const makeMultiLineMarkedText = textBlocks => {
  let result = [];
  let line = [];
  const switchOnParagraphFirstSpace = paragraph => {
    return paragraph[0] === ' ' ? '\u00A0'+paragraph.slice(1) : paragraph
  };

  textBlocks.forEach(({text, questId, id}) => {
    //попался блок-пустышка ==>
    if (text.length === 0) {
      line.push({text: "[Пустой блок]", questId, id});
    }
    //попался блок из одного конца абзаца
    if (text === '\n') {
      line.push({text: "[Конец абзаца]", questId, id});
      result.push(line);
      line = [];
      return
    }
    //попался блок из нескольких абзацев
    if (text.indexOf('\n') !== -1) {
      let blockPerStatements = text.split('\n');
      let firstStatement = blockPerStatements.shift();
      if (line.length === 0) {
        firstStatement = switchOnParagraphFirstSpace(firstStatement)
      }
      line.push({text: firstStatement, questId, id});
      result.push(line);
      line = [];
      blockPerStatements.forEach((statement) => {
        result.push([{
          text: statement,
          questId,
          id
        }]);
      });
      return
    }
    if (line.length === 0) {
      text = switchOnParagraphFirstSpace(text)
    }
    line.push({text, questId, id});
  });
  if (line.length > 0) {
    result.push(line);
  }
  return result;
};

//TODO Это может быть компонент, который визуализирует текст, разбитым на блоки, и позволяет перемещаться курсору по тексту
// по каждому блоку, который есть в тексте или по определенному подмножетсву блоков;
// Сюда надо передавать функцию, которая будет выдавать, учитывать ли очередной блок при вычислении значения,
// с которым сравнивать переданный целевой номер курсора.

class MarkedText extends React.Component {
  componentDidMount() {
    this.scrollToCursor();
  }

  componentDidUpdate() {
    this.scrollToCursor();
  }

  scrollToCursor() { //TODO Scroll не работает!!!
    // let cursorElement = document.querySelector(cursorSelector).parentNode;
    // cursorElement && cursorElement.scrollIntoView({ behavior: 'smooth',  block: "center" });
  }

  render () {
    let {className = "row markedTextWrapper", textBlocks, cursorIndex} = this.props;
    // let {className = "markedTextWrapper", textBlocks, cursorIndex} = this.props;
    let linedText = makeMultiLineMarkedText(convertSymbolBlocksToMarkedBlocksTextFormat(textBlocks));
    // let linedText = [textBlocks];
    let blockNum = -1;
    return (
      <div className={className}>
        <div>
          {linedText.map((line, index) => {
            return (
              <p className="lineBlock" key={'line' + index}>
                {line.map(({text, questId, id}, index) => {
                  // if (text.length === 0) {
                  //   return null
                  // }
                  questId && blockNum++;
                  let key = spanIdPrefix + index;
                  return <MarkedTextBlock
                    key = {key}
                    id = {'MarkedTextBlock'+id}
                    className = {questId ? (blockNum === cursorIndex ? cursorClassName : fcClassName) : ''}
                    text = {text}
                  />
                })}
              </p>
            )
          })}
        </div>
      </div>
    )
  }
}

const NoteMarkedText = connect(
  (state) =>
  {return {
    textBlocks: state.blocksOperations.blocks, //state.currentText,
    cursorIndex: state.cursorIndex,
  }}
  )(MarkedText);

export default NoteMarkedText;