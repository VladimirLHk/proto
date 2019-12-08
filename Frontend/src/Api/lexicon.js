import axios from "axios";

export const updateLexiconServiceFunc = axios => ({
  updateLexiconOnServer: lexicon =>
    axios.post(`https://localhost:3333/files`, {lexicon})
});

export default updateLexiconServiceFunc(axios);