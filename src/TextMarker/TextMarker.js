import React from 'react';
import './TextMarker.css';
import FCMarker from "../FCMarker/FCMarker";

const spanIdPrefix = 'spanText';
const fcClassName = 'properNoun';
const buttonName = ['Сохранить', 'Заменить'];

const splitSeparators = '\n !,.:?";';
const mathSymbs = '0123456789+-*/@#%^&';
const separatorsRegExp = new RegExp('(['+splitSeparators+'])');

let isCapital = letter => {
  return splitSeparators.indexOf(letter) === -1 && mathSymbs.indexOf(letter) === -1 && letter === letter.toUpperCase()
};

let splitText = (text) => {
  let result = [];
  let buffer = [];
  // console.log(text.split(/([\n !,.:?])/));
  text.split(separatorsRegExp).forEach(word => {
    // console.log(word, ': ', splitSeparators.indexOf(word));
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
  if (result.length === 0) {
    result.push('')
  }
  // console.log("result", result);
  return result
};

class TextMarker extends React.Component {
  constructor (props)  {
    super(props);
    this.buttonClickHandle = this.buttonClickHandle.bind(this);
    this.state =
      {
        text: splitText(props.initText),
        buttonNameIndex: 0,
      }
  }

  buttonClickHandle () {
    let currentButtonNameIndex = this.state.buttonNameIndex;
    switch (currentButtonNameIndex) {
      case 0:
        let changedText = document.getElementById('textarea').value;
        this.setState({
          text: splitText(changedText).slice(),
          buttonNameIndex: 1,
        });
        break;
      case 1:
        this.setState({buttonNameIndex: 0});
        break;
      default:
    };
  }

  render () {
    return (
      <div className="textWrapper">
        <textarea
          className={"textareaMain" + (!!this.state.buttonNameIndex ? " hidden" : "")}
          id="textarea"
          rows={'10'}
          cols={'60'}
          resi
        >
          {this.state.text.join('')}
        </textarea>
        <div className={"markedTextWrapper"+(!this.state.buttonNameIndex ? " hidden" : "")}>
          {this.state.text.map((text, index) => {
            let key = spanIdPrefix + index;
            return <FCMarker
              key = {key}
              id = {key}
              className = {(text.length > 0 && isCapital(text[0])) ? fcClassName : ''}
              text = {text}
            />
          })}
        </div>
        <button
          className="buttonSaveOrEdit"
          onClick = {this.buttonClickHandle}
        >{buttonName[this.state.buttonNameIndex]}</button>
      </div>
    )
  }
}

export default TextMarker;