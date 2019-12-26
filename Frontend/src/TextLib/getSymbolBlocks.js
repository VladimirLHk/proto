//пока рассматриваем только одиночные символы; не рассматриваем составные, например, перенос: "дефис"+"конец строки/абзаца"
const getSymbolBlocks = ({text = '', symbolsSet = [], isAutoApprove = symbol => false}) => {
  isAutoApprove = typeof isAutoApprove === 'function' ? isAutoApprove : () => false;
  return text.split('').map(symbol => {
    let csId = symbol.codePointAt(0);
    let symbols = symbolsSet.filter(item => item.csId === csId);
    let status = Math.min(symbols.length+1, 3);
    //status
    // 0 - символ классифицирован,
    // 1 - символ неизвестен (не принадлежит ни одному из классов),
    // 2 - символ принадлежит к единственному классу,
    // 3 - символ принадлежит к нескольким классам.
    // if (status === 2 && isAutoApprove(symbol)) {
    //   return {
    //     csId,
    //     status: 0,
    //     symbols: symbols[0]
    //   }
    // }
    // return {csId, status, basketId}
    return {csId, status, symbols}
  });
};

export default getSymbolBlocks;
//
// import {getNewId} from "./getNewId";
//
// const CS_ID_FACTOR = 3;
// const MAX_NEW_CS_ID_ATTEMPTS = 100;
// if (!csId) {
//   csId = getNewId(CS_ID_FACTOR);
//   for (
//     let attempt = 0;
//     attempt < MAX_NEW_CS_ID_ATTEMPTS, codesSet.find(item => item.id === csId);
//     attempt++, csId = getNewId(CS_ID_FACTOR);
// )
// }
