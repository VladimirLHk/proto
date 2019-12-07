export default textBlocks => {

  return textBlocks.reduce((text, block) => {
    return text += block.text
  }, '');
}