import {addSymbol, classifiedBlock, includeToBasket} from "../Redux/actions";
import index from "../Redux/reducers";

const ALL_BLOCKS_CLASSIFIED = 'Все символы в тексте классифицированы.';
const NEW_SYMBOL = 'Новый символ: "';
const KNOWN_SYMBOL = 'Символ: "';
const NEW_SYMBOL_NO_BASKETS = 'Нет ни одного класса. Символ некуда включить.';
const KNOWN_SYMBOL_IN_ONE_BASKET = 'Этот символ ранее был приписан к классу: "';
const KNOWN_SYMBOL_IN_SOME_BASKETS = 'Этому символу ранее присваивались разные значения:';
const NO_SELECTED_BASKETS = 'Не выбран класс.';
const BASKET_SELECTED = 'Выбран класс: "';
const NO_SELECTED_TAGS = 'Дополнительных признаков нет.';
const SELECTED_TAGS = 'Выбраны признаки: "';
const KNOWN_SYMBOL_SELECTED_TAGS = 'Установлены признаки: "';
const SELECTED_BASKETS_HAS_CHILDREN = 'У этого класса есть подклассы. Необходимо выбрать другой класс.';
const SELECTIONS_WAS_SET_BEFORE = 'Этот выбор есть в числе присвоенных вариантов';

const BUTTON_PREFIX = 'В-';

const SET_PREVIOUS_PARAMS = 'Сохранить как в прошлый раз';
const SAVE_SELECTED_PARAMS = 'Сохранить с выбранными настройками';
const SKIP = 'Перейти к следующему решению';

const skipAction = () => {return {type: '', action: {}}};
const classifiedAsBeforeActionGenerator = (symbolId, csId) => {
  return () => classifiedBlock({symbolId, csId})
};

let baskets_set, current_basket_id, tag_names, tags_set, symbols_set;

const isCurrentSelectionsSetBefore = questBlock => {
  if (questBlock.status === 1) {
    return false
  }
  return questBlock.symbols.some(symbol => {
    if (symbol.basketId !== current_basket_id || symbol.tags.length !== tag_names.length) {
      return false
    }
    return symbol.tags.every(tagId => {
      let tag = tags_set.find(tag => tag.id === tagId);
      return tag_names.includes(tag.name);
    })
  })
}

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

// const getParamsForSingleClassSymbol = questBlock => {
//   let question = [KNOWN_SYMBOL + String.fromCharCode(questBlock.csId) + '".'];
//   let existSymbol = questBlock.symbols[0];
//   let basketIndex = baskets_set.findIndex(item => item.id === existSymbol.basketId);
//   let symbolDescription = KNOWN_SYMBOL_IN_ONE_BASKET + baskets_set[basketIndex].name + '". ';
//   symbolDescription += (existSymbol.tags && existSymbol.tags.length > 0) ?
//     getTagsLine(
//       KNOWN_SYMBOL_SELECTED_TAGS,
//       existSymbol.tags.map(tagId => {
//         let tag = tags_set.find(tag => tag.id === tagId);
//         if (tag) {
//           return tag.name}
//         return 'Не нашел признак по ID :('
//       })
//     ) :
//     NO_SELECTED_TAGS;
//   question.push(symbolDescription);
//   return {
//     question,
//     answers: [SET_PREVIOUS_PARAMS],
//     actionsSet: [[classifiedAsBeforeActionGenerator(existSymbol.id, questBlock.csId)]]
//   }
// };

const getParamsForMultiClassSymbol = (questBlock, symbolDescriptionTitle) => {
  let question = [KNOWN_SYMBOL + String.fromCharCode(questBlock.csId) + '".', symbolDescriptionTitle];
  let answers = [];
  let actionsSet = [];
  questBlock.symbols.forEach((symbol, index) => {
    let basketIndex = baskets_set.findIndex(item => item.id === symbol.basketId);
    let buttonName = BUTTON_PREFIX + (index+1);
    let symbolDescription = "Вариант "+ (index+1) + ' ('+ buttonName + ') "' + baskets_set[basketIndex].name + '". ';
    symbolDescription += (symbol.tags && symbol.tags.length > 0) ?
      getTagsLine(
        KNOWN_SYMBOL_SELECTED_TAGS,
        symbol.tags.map(tagId => {
          let tag = tags_set.find(tag => tag.id === tagId);
          if (tag) {
            return tag.name}
          return 'Не нашел признак по ID :('
        })
      ) :
      NO_SELECTED_TAGS;
    question.push(symbolDescription);
    answers.push(buttonName);
    actionsSet.push([classifiedAsBeforeActionGenerator(symbol.id, questBlock.csId)])
  });
  if (questBlock.symbols.length === 1) {
    question[1] += question[2].replace('Вариант 1 ('+ BUTTON_PREFIX + '1)', '');
    question.pop();
    answers[0] = SET_PREVIOUS_PARAMS;
  }
  return {question, answers, actionsSet}
};

const getParamsAboutCurrentBasketAndTags = (questBlock) => {
  if (baskets_set.length === 0) {
    return {answers: [SKIP], actionsSet: [[skipAction]]}
  }
  let question = [];
  let basketIndex = baskets_set.findIndex(item => item.id === current_basket_id);
  if (basketIndex === -1) {
    question.push(NO_SELECTED_BASKETS);
    return {question, answers: [SKIP], actionsSet: [[skipAction]]}
  }
  question.push(BASKET_SELECTED + baskets_set[basketIndex].name + '".');
  if (
    baskets_set[basketIndex].children &&
    Array.isArray(baskets_set[basketIndex].children) &&
    baskets_set[basketIndex].children.length > 0
  ) {
    question.push(SELECTED_BASKETS_HAS_CHILDREN);
    return {question, answers: [SKIP], actionsSet: [[skipAction]]}
  }
  if (tag_names.length === 0) {
    question.push(NO_SELECTED_TAGS);
  } else {
    question.push(getTagsLine(SELECTED_TAGS, tag_names));
  }
  if (isCurrentSelectionsSetBefore(questBlock)) {
    question.push(SELECTIONS_WAS_SET_BEFORE);
    return {question, answers: [SKIP], actionsSet: [[skipAction]]}
  } else {
    return {question, answers: [SAVE_SELECTED_PARAMS, SKIP], actionsSet: [[addSymbol, includeToBasket, classifiedBlock], [skipAction]]}
  }
}

const symbolBlocksQuestionGenerator = ({blocks, basketsSet, currentBasketId, tagsSet, symbolsSet, skipped}) => {
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
    return {question: [ALL_BLOCKS_CLASSIFIED], noQuestion: true}
  }
  let questBlock = blocks.find(item => item.csId === leader.id);
  let {question = [], answers = [], actionsSet=[]} = getParamsAboutCurrentBasketAndTags(questBlock);
  let questParams = {
    question: [],
    answers: [],
    actionsSet: [],
  }
  switch (questBlock.status) {
    case 1:
      questParams = getParamsForNewSymbol(questBlock);
      break;
    case 2:
      questParams = getParamsForMultiClassSymbol(questBlock, KNOWN_SYMBOL_IN_ONE_BASKET);
      break;
    case 3:
      questParams = getParamsForMultiClassSymbol(questBlock, KNOWN_SYMBOL_IN_SOME_BASKETS);
      break;
    default:;
  }

  questParams.question = questParams.question ? questParams.question.concat(question) : question;
  questParams.answers = questParams.answers ? questParams.answers.concat(answers) : answers;
  questParams.actionsSet = questParams.actionsSet ? questParams.actionsSet.concat(actionsSet) : actionsSet;
  questParams.questBlock = questBlock;
  return questParams
};

export default symbolBlocksQuestionGenerator;