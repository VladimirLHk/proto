import {EDIT_NOTE_BUTTON_PRESSED, SAVE_NOTE_BUTTON_PRESSED, UPDATE_LEXICON, LEXICON_UPDATED} from './actionsNames';
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

export const updateLexiconEverywhere = ({text}) => {
  return dispatch => {
    dispatch(updateLexicon({text}));
    let lexicon ="test lexicon";
    return axios.post(`http://localhost:3333/file`, {test: lexicon}).then(res => console.log(res)).catch(res => console.log(res))
    // return sendLexiconToServer({lexicon}).then(res => console.log(res))
  }
};



// import reposService from "../services/repos";
// import {
//   REPOS_REQUEST,
//   REPOS_EMPTY,
//   REPOS_SUCCESS,
//   REPOS_NOT_FOUND,
//   REPOS_ERROR
// } from "../constants/ActionTypes";
//
// export const getReposByUsername = async (dispatch, reposService, username) => {
//   //Set the applications to a "Loading" state
//   dispatch({ type: REPOS_REQUEST });
//
//   try {
//     const response = await reposService.getResposByUserName(username);
//     const repos = response.data;
//     const isReposEmpty = repos.length === 0;
//     if (isReposEmpty) dispatch({ type: REPOS_EMPTY });
//     else
//       dispatch({
//         type: REPOS_SUCCESS,
//         repos
//       });
//   } catch (error) {
//     const isError404 = error.response && error.response.status === 404;
//     if (isError404) dispatch({ type: REPOS_NOT_FOUND });
//     else dispatch({ type: REPOS_ERROR });
//   }
// };
//
// export const getReposByUsernameInjector = dispatch => {
//   return username => {
//     getReposByUsername(dispatch, reposService, username);
//   };
// };
