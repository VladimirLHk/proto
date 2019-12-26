const ALL_BLOCKS_CLASSIFIED = 'Все символы в тексте классифицированы.';
const NEW_SYMBOL = 'Новый символ: "';
const KNOWN_SYMBOL = 'Символ: "';
const NEW_SYMBOL_NO_BASKETS = 'Нет ни одного класса. Символ некуда включить.';
const KNOWN_SYMBOL_IN_ONE_BASKET = 'Этот символ ранее был приписан к классу: "';
const KNOWN_SYMBOL_IN_SOME_BASKETS = 'Этому символу ранее присваивались разные значения: "';
const NO_SELECTED_BASKETS = 'Не выбран класс.';
const BASKET_SELECTED = 'Выбран класс: "';
const NO_SELECTED_TAGS = 'Дополнительных признаков нет.';
const SELECTED_TAGS = 'Выбраны признаки: "';
const KNOWN_SYMBOL_SELECTED_TAGS = 'Установлены признаки: "';
const SELECTED_BASKETS_HAS_CHILDREN = 'У этого класса есть подклассы. Необходимо выбрать другой класс.';

const SET_PREVIOUS_PARAMS = 'Сохранить как в прошлый раз';
const SAVE_SELECTED_PARAMS = 'Сохранить с выбранными настройками';
const SKIP = 'Перейти к следующему решению';

let baskets_set, current_basket_id, tag_names, tags_set, symbols_set;

const getTagsLine = (title, tagNames) => {
  let tagLine = title;
  tagNames.forEach(tagName => {
    tagLine += tagName + '" , "'
  });
  return tagLine.slice(0, tagLine.length-4) + '.'
}

const getParamsForNewSymbol = questBlock => {
  let question = [NEW_SYMBOL + String.fromCharCode(questBlock.csId) + '".'];
  if (baskets_set.length === 0) {
    question.push(NEW_SYMBOL_NO_BASKETS);
  }
  return {question}
};

const getParamsForSingleClassSymbol = questBlock => {
  let question = [KNOWN_SYMBOL + String.fromCharCode(questBlock.csId) + '".'];
  let existSymbol = symbols_set.find(item => item.id === questBlock.symbols[0].id);
  let basketIndex = baskets_set.findIndex(item => item.id === existSymbol.basketId);
  let symbolDescription = KNOWN_SYMBOL_IN_ONE_BASKET + baskets_set[basketIndex].name + '". ';
  symbolDescription += (existSymbol.tags && existSymbol.tags.length > 0) ?
    getTagsLine(
      KNOWN_SYMBOL_SELECTED_TAGS,
      existSymbol.tags.map(tagId => {
        let tag = tags_set.find(tag => tag.id === tagId);
        if (tag) {
          return tag.name}
        return 'Не нашел признак по ID :('
      })
    ) :
    NO_SELECTED_TAGS;
  question.push(symbolDescription);
  return {question, answers: [SET_PREVIOUS_PARAMS]}
};

const getParamsAboutCurrentBasketAndTags = () => {
  if (baskets_set.length === 0) {
    return {answers: [SKIP]}
  }
  let question = [];
  let basketIndex = baskets_set.findIndex(item => item.id === current_basket_id);
  if (basketIndex === -1) {
    question.push(NO_SELECTED_BASKETS);
    return {question, answers: [SKIP]}
  }
  question.push(BASKET_SELECTED + baskets_set[basketIndex].name + '".');
  if (
    baskets_set[basketIndex].children &&
    Array.isArray(baskets_set[basketIndex].children) &&
    baskets_set[basketIndex].children.length > 0
  ) {
    question.push(SELECTED_BASKETS_HAS_CHILDREN);
    return {question, answers: [SKIP]}
  }
  if (tag_names.length === 0) {
    question.push(NO_SELECTED_TAGS);
    return {question, answers: [SAVE_SELECTED_PARAMS, SKIP]}
  }

  // let tagLine = SELECTED_TAGS;
  //   tag_names.forEach(tagName => {
  //     tagLine += tagName + '" , "'
  //   });
  // question.push(tagLine.slice(0, tagLine.length-4) + '.');
  question.push(getTagsLine(SELECTED_TAGS, tag_names));
  return {question, answers: [SAVE_SELECTED_PARAMS, SKIP]}

}

const symbolBlocksQuestionGenerator = ({blocks, basketsSet, currentBasketId, tagsSet, symbolsSet}) => {
  symbols_set = symbolsSet;
  baskets_set = basketsSet;
  current_basket_id = currentBasketId;
  tags_set = tagsSet;
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
      accrued[id] = accrued[id] ? ++accrued[id] : 1;
      if (!leader || accrued[id] > leader.count) {
        leader = {id, count: accrued[id]}
      }
    }
    return accrued;
  }, {});
  if (!leader) {
    return {question: [ALL_BLOCKS_CLASSIFIED]}
  }
  let questBlock = blocks.find(item => item.csId === leader.id);
  let {question = [], answers = []} = getParamsAboutCurrentBasketAndTags();
  let questParams = {
    question: [],
    answers: [],
  }
  switch (questBlock.status) {
    case 1:
      questParams = getParamsForNewSymbol(questBlock);
      break;
    case 2:
      questParams = getParamsForSingleClassSymbol(questBlock);
      break;
    case 3: break;
    default:;
  }

  questParams.question = questParams.question ? questParams.question.concat(question) : question;
  questParams.answers = questParams.answers ? questParams.answers.concat(answers) : answers;
  questParams.questBlock = questBlock;
  return questParams
};

export default symbolBlocksQuestionGenerator;