import React from 'react';
import PropType from 'prop-types';

const Button = ({name, className, onClick, id}) => {
  return (<button className={className} id={id} onClick = {onClick}> {name} </button>)
};

Button.propTypes = {
  name: PropType.string.isRequired,
  className: PropType.string,
  id: PropType.string,
  onClick: PropType.func.isRequired,
};

export default Button;