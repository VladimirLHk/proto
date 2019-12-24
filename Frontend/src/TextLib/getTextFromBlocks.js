export default textBlocks => {

  return textBlocks.reduce((text, block) => {
    return text + String.fromCharCode(block.csId)
  }, '');
}