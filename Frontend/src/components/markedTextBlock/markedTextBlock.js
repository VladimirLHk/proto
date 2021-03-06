import React from 'react';
import PropType from 'prop-types';
import './markedTextBlock.css'

const MarkedTextBlock = ({text, id, className}) => {
  return (<span id = {id} className={"textBlock " + className}>{text}</span>)
};

MarkedTextBlock.propTypes = {
  text: PropType.string.isRequired,
  className: PropType.string,
  id: PropType.string,
};

export default MarkedTextBlock;