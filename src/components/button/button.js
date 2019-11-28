import React from 'react';
import PropType from 'prop-types';

const Button = ({name, className, onClick}) => {
  return (<button className={className} onClick = {onClick}> {name} </button>)
};

Button.propTypes = {
  name: PropType.string.isRequired,
  className: PropType.string,
  onClick: PropType.func.isRequired,
};

export default Button;