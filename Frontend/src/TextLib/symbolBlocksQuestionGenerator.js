const NEW_SYMBOL = 'Новый символ: "';
const NEW_SYMBOL_NO_BASKETS = 'Нет ни одного класса. Символ некуда включить.';
const NEW_SYMBOL_NO_SELECTED_BASKETS = 'Не выбран класс.';
const BASKET_SELECTED = 'Выбран класс: "';
const NO_SELECTED_TAGS = 'Дополнительных признаков нет.';
const SELECTED_TAGS = 'Выбраны признаки: "';
const SELECTED_BASKETS_HAS_CHILDREN = 'У этого класса есть подклассы. Необходимо выбрать другой класс.';

const SAVE_SELECTED_PARAMS = 'Сохранить с выбранными настройками';
const SKIP = 'Перейти к следующему решению';

let baskets_set, current_basket_id, tag_names;

const getParamsForNewSymbol = (questBlock) => {
  let question = [NEW_SYMBOL + String.fromCharCode(questBlock.csId) + '".'];
  if (baskets_set.length === 0) {
    question.push(NEW_SYMBOL_NO_BASKETS);
    return {question}
  }
  let basketIndex = baskets_set.findIndex(item => item.id === current_basket_id);
  if (basketIndex === -1) {
    question.push(NEW_SYMBOL_NO_SELECTED_BASKETS);
    return {question}
  }
  question.push(BASKET_SELECTED + baskets_set[basketIndex].name + '".');
  if (
    baskets_set[basketIndex].children &&
    Array.isArray(baskets_set[basketIndex].children) &&
    baskets_set[basketIndex].children.length > 0
  ) {
    question.push(SELECTED_BASKETS_HAS_CHILDREN);
    return {question}
  }
  if (tag_names.length === 0) {
    question.push(NO_SELECTED_TAGS);
    return {question, answers: [SAVE_SELECTED_PARAMS, SKIP]}
  }

  let tagLine = SELECTED_TAGS;
    tag_names.forEach(tagName => {
      tagLine += tagName + '" , "'
    });
  question.push(tagLine.slice(0, tagLine.length-4) + '.');
  return {question, answers: [SAVE_SELECTED_PARAMS, SKIP]}

}

const symbolBlocksQuestionGenerator = ({blocks, basketsSet, currentBasketId, tagsSet}) => {
  console.log('symbolBlocksQuestionGenerator: ', blocks, basketsSet, currentBasketId, tagsSet);
  baskets_set = basketsSet;
  current_basket_id = currentBasketId;
  tag_names = tagsSet.reduce((prevResult, tag) => {
    if (tag.switchOn) {
      prevResult.push(tag.name)
    }
    return prevResult
  }, []);

  //находим блок с ненулевым статусом встречающимся больше всего раз
  let leader = undefined;
  blocks.reduce((accrued, block) => {
    if (block.status) {
      let id = block.csId;
      accrued[id] = accrued[id] ? accrued[id]++ : 1;
      if (!leader || accrued[id] > leader.count) {
        leader = {id, count: accrued[id]}
      }
    }
    return accrued;
  }, {});
  let questBlock = blocks.find(item => item.csId === leader.id);
  let questParams = {
    question: '',
    answers: [],
  }
  switch (questBlock.status) {
    case 1:
      questParams = getParamsForNewSymbol(questBlock);
      break;
    case 2: break;
    case 3: break;
    default:;
  }

  return questParams
}

export default symbolBlocksQuestionGenerator;