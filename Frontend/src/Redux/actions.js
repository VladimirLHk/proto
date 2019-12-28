import {
  EDIT_NOTE_BUTTON_PRESSED,
  SAVE_NOTE_BUTTON_PRESSED,
  CLASSIFIED_BLOCK,
  SKIP_QUESTION,
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
  INCLUDE_TO_BASKET,
  TAG_ADD,
  TAG_TOGGLE,
  GET_QUESTION,
  SYMBOL_ADD,
} from './actionsNames';
import sendLexiconToServer from '../Api/lexicon';
import axios from "axios";

export const saveNoteButtonPressed = ({text, basketsSet, symbolsSet}) => {
  return {
    type: SAVE_NOTE_BUTTON_PRESSED,
    text,
    basketsSet,
    symbolsSet,
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

export const classifiedBlock = ({csId, symbolId, isForAll}) => {
  return {
    type: CLASSIFIED_BLOCK,
    csId,
    symbolId,
    isForAll,
  }
};

export const skipQuestion = ({csId, symbolId, isForAll}) => {
  return {
    type: SKIP_QUESTION,
    csId,
    symbolId,
    isForAll,
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

export const includeToBasket = ({basketId, symbolId}) => {
  return {
    type: INCLUDE_TO_BASKET,
    basketId,
    symbolId,
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

export const getQuestion = ({blocks, currentBasket, tagsSet}) => {
  return {
    type: GET_QUESTION,
    blocks,
    currentBasket,
    tagsSet,
  }
};

export const addSymbol = ({symbolId, csId, basketId, tags=[]}) => {
  return {
    type: SYMBOL_ADD,
    symbolId,
    csId,
    basketId,
    tags,
  }
};


export const updateLexiconEverywhere = ({text}) => {
  return (dispatch, getState) => {
    dispatch(updateLexicon({text}));
    // let lexicon = [...getState().lexicon]; //это работает, когда lexicon - интерируемый объект: массив или Set/Map
    let lexicon = JSON.stringify(getState().lexicon);
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
        console.log('loadLexicon:', text);
        dispatch(updateLexicon({text}))
      })
      .catch(res => console.log(res))
  }
});


