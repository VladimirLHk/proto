
const getSymbolBlocks = (text = '', basketsSet = [], codesSet = {}, isAutoApprove = symbol => false) => {
  let a = text.split('').map(symbol => {
    let csId = symbol.codePointAt(0);
    codesSet[csId] = symbol;
    // let status = 1;
    let basketId = [];
    basketsSet.forEach(item => {
      if (item.symbols.contains(csId)) {
        // status = status === 1 ? 2 : 3; //TODO устанавливать после заполнения массива basketId по его размеру
        basketId.push(item.id);
      }
    });
    let status = Math.min(basketId.length+1, 3);
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
