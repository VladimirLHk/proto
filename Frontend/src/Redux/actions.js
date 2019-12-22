import {
  EDIT_NOTE_BUTTON_PRESSED,
  SAVE_NOTE_BUTTON_PRESSED,
  UPDATE_LEXICON,
  LEXICON_UPDATED,
  LEXICON_LOADING,
  LEXICON_LOAD_SUCCESS,
  LEXICON_LOAD_ERROR,
  MOVE_BLOCKS_CURSOR,
  CHOICE_DONE,
  TASK_SET,
  BASKET_PRESSED,
  BASKET_ADD,
  SET_BASKETS_SET,
  NOT_CREATE_BASKET,
  TAG_ADD,
  TAG_TOGGLE,
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

export const choiceDone = ({choiceNum}) => {
  return {
    type: CHOICE_DONE,
    choiceNum
  }
};

export const taskSet = ({taskNum}) => {
  return {
    type: TASK_SET,
    taskNum
  }
};

export const basketAdd = ({newBasketName, parentId}) => {
  return {
    type: BASKET_ADD,
    newBasketName,
    parentId
  }
};

export const cancelBasketAdd = ({parentId}) => {
  return {
    type: NOT_CREATE_BASKET,
    parentId
  }
};

export const changeBasketsSetView = ({basketPressedId}) => {
  return {
    type: BASKET_PRESSED,
    basketPressedId
  }
};

export const setBasketsSetView = ({basketsSet}) => {
  return {
    type: SET_BASKETS_SET,
    basketsSet
  }
};

export const tagAdd = ({newTagName}) => {
  return {
    type: TAG_ADD,
    newTagName
  }
};

export const changeTagStatus = ({tagId}) => {
  return {
    type: TAG_TOGGLE,
    tagId
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


