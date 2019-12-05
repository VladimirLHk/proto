import {NOTE_BUTTON_PRESSED} from './actionsNames';
export const noteButtonPressed = ({text}) => {
  return {
    type: NOTE_BUTTON_PRESSED,
    text,
  }
};