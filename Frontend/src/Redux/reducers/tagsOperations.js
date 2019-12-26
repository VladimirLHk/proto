import {TAG_ADD, TAG_TOGGLE} from "../actionsNames";
import {getNewId} from "../../TextLib/getNewId";

const TAG_FACTOR = 3;

const crateNewTag = (newTagName, tagsSet) => {
  let newTagId = getNewId(TAG_FACTOR);
  for (
    let attempt=0;
    tagsSet.findIndex(item => item.id === newTagId) !== -1, attempt < 50;
    attempt++
  ) {
    newTagId = getNewId(TAG_FACTOR);
  };
  tagsSet.push({
    id: newTagId,
    name: newTagName,
    switchOn: true,
  })
  return tagsSet.sort((a,b) => {return a.name>b.name ? 1 : -1}).slice()
};

const toggleTag = (tagId, tagsSet) => {
  let tag = tagsSet.find(tag => tag.id === tagId);
  tag.switchOn = !tag.switchOn;
  return tagsSet.sort((a,b) => {return a.name>b.name ? 1 : -1}).slice()
};

const initState = {
  tagsSet: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case TAG_TOGGLE:
      return {
        ...state,
        tagsSet: toggleTag(action.tagId, state.tagsSet),
      };
    case TAG_ADD:
      return {
        ...state,
        tagsSet: crateNewTag(action.newTagName, state.tagsSet),
      };
    default: return state;
  }

}