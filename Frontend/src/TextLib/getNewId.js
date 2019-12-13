const BASE = 62;

const getSymbolByNum = num => {
  num = Math.abs(num) % BASE;
  let shift = num <= 9 ? 48 : (num <= 35 ? 55 : 61);
  return String.fromCodePoint(num + shift);
};

export const getNewId = factor => {
  factor = Math.abs(factor) % 100;
  let newId = '';
  for (let i=0; i<factor; i++) {
    newId += getSymbolByNum(Math.floor((BASE+1) * Math.random())-1);
  }
  return newId;
};

export const getNewDigitalId = factor => {

}