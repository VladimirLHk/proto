import React from 'react'
import $ from 'jquery';
import Button from "../button/button";
import './nameInput.css';

class NameInput extends React.Component {
  componentDidMount() {
    // document.getElementById(this.props.inputButton.id).focus();
  }

  componentDidUpdate() {
    // document.getElementById(this.props.inputButton.id).focus();
  }

  render () {
    let {groupWrapClass, inputButton, okButton, cancelButton} = this.props;
    return (
      <div className={groupWrapClass}>
        <input
          id={inputButton.id}
          className={inputButton.className}
          onInput={inputButton.onInput}
          placeholder={inputButton.placeholder}
        />
        <Button
          id={okButton.id}
          className={okButton.className ? okButton.className : " btn btn-success btn-sm mx-1"}
          onClick={okButton.onClick}
          name={'OK'}
        />
        {cancelButton.id && <Button
          id={cancelButton.id}
          className={cancelButton.className ? cancelButton.className : " btn btn-danger btn-sm "}
          onClick={cancelButton.onClick}
          name={'X'}
        />}
      </div>
    )
  }
}

export default NameInput;