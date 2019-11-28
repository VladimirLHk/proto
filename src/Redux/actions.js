import {NOTE_BUTTON_PRESSED} from './actionsNames';
export const noteButtonPressed = ({buttonState, text}) => {
  console.log(buttonState, text);
  return {
    type: NOTE_BUTTON_PRESSED,
    buttonState,
    text,
  }
};