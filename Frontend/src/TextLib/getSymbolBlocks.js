//пока рассматриваем только одиночные символы; не рассматриваем составные, например, перенос: "дефис"+"конец строки/абзаца"
const getSymbolBlocks = (text = '', basketsSet = [], isAutoApprove = symbol => false) => {
  basketsSet = basketsSet ? basketsSet : [];
  isAutoApprove = typeof isAutoApprove === 'function' ? isAutoApprove : () => false;
  let a = text.split('').map(symbol => {
    let csId = symbol.codePointAt(0);
    let basketId = [];
    basketsSet.forEach(basket => {
      if (basket.items.contains(csId)) {
        basketId.push(basket.id);
      }
    });
    let status = Math.min(basketId.length+1, 3);
    //status
    // 0 - символ классифицирован,
    // 1 - символ неизвестен (не принадлежит ни одному из классов),
    // 2 - символ принадлежит к единственному классу,
    // 3 - символ принадлежит к нескольким классам.
    if (status === 2 && isAutoApprove(symbol)) {
      return {
        csId,
        status: 0,
        basketId: basketId[0]
      }
    }
    return {csId, status, basketId}
  });
  console.log('SymBlocks=', a);
  return a
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
