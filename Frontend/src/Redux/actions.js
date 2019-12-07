import {EDIT_NOTE_BUTTON_PRESSED, SAVE_NOTE_BUTTON_PRESSED, UPDATE_LEXICON, LEXICON_UPDATED} from './actionsNames';
export const saveNoteButtonPressed = ({text}) => {
  return {
    type: SAVE_NOTE_BUTTON_PRESSED,
    text,
  }
};

export const editNoteButtonPressed = () => {
  return {
    type: EDIT_NOTE_BUTTON_PRESSED,
  }
};

export const updateLexicon = ({text}) => {
  return {
    type: UPDATE_LEXICON,
    text
  }
};

export const lexiconUpdateOnBack = ({lexicon}) => {
  return dispatch => {

  }
};