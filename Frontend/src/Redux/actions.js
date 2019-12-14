import {
  EDIT_NOTE_BUTTON_PRESSED,
  SAVE_NOTE_BUTTON_PRESSED,
  UPDATE_LEXICON,
  LEXICON_UPDATED,
  LEXICON_LOADING,
  LEXICON_LOAD_SUCCESS,
  LEXICON_LOAD_ERROR,
  MOVE_BLOCKS_CURSOR,
} from './actionsNames';
import sendLexiconToServer from '../Api/lexicon';
import axios from "axios";

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

export const moveBlocksCursor = ({cursorIndex}) => {
  return {
    type: MOVE_BLOCKS_CURSOR,
    cursorIndex
  }
};

export const updateLexiconEverywhere = ({text}) => {
  return (dispatch, getState) => {
    console.log('state: ', getState());
    dispatch(updateLexicon({text}));
    let lexicon = [...getState().lexicon];
    return axios.post(`http://localhost:3333/file`, {test: lexicon})
      .then(res => console.log(res))
      .catch(res => console.log(res))
  }
};

export const loadLexicon = (()=>{
  return (dispatch) => {
    dispatch({ type: LEXICON_LOADING });
    return axios.get(`http://localhost:3333/file`)
      .then(res => {
        let text = res.data.text;
        console.log(text);
        dispatch(updateLexicon({text}))
      })
      .catch(res => console.log(res))
  }
});


