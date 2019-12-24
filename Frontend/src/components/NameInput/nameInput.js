import React from 'react'
import $ from 'jquery';
import Button from "../button/button";

// const NameInput = ({groupWrapClass, inputButton, okButton, cancelButton}) => {
//   return (
//     <div className={groupWrapClass}>
//       <input
//         id={inputButton.id}
//         className={inputButton.className}
//         onInput={inputButton.onInput}
//         placeholder={inputButton.placeholder}
//       />
//       <Button
//         id={okButton.id}
//         className={okButton.className}
//         onClick={okButton.onClick}
//         name={'OK'}/>
//       <Button
//         id={cancelButton.id}
//         className={cancelButton.className}
//         onClick={cancelButton.onClick}
//         name={'X'}/>
//     </div>
//   )
// };

class NameInput extends React.Component {
  componentDidMount() {
    console.log('focus on:', this.props.inputButton.id);
    document.getElementById(this.props.inputButton.id).focus();
  }

  componentDidUpdate() {
    console.log('focus on:', this.props.inputButton.id);
    document.getElementById(this.props.inputButton.id).focus();
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
          className={okButton.className}
          onClick={okButton.onClick}
          name={'OK'}/>
        <Button
          id={cancelButton.id}
          className={cancelButton.className}
          onClick={cancelButton.onClick}
          name={'X'}/>
      </div>
    )
  }
}

export default NameInput;