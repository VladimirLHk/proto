import React from 'react';
import PropType from 'prop-types';
import './markedTextBlock.css'

const MarkedTextBlock = ({text, id, className}) => {
  if (text === '\n') {
    return <br/>
  }
  return (<span id = {id} className={className}>{text}</span>)
};

MarkedTextBlock.propTypes = {
  text: PropType.string.isRequired,
  className: PropType.string,
  id: PropType.string,
}

export default MarkedTextBlock;