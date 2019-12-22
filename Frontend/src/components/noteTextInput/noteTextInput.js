import React from 'react';
import PropType from 'prop-types';
import './noteTextInput.css'

const NoteTextInput = ({text, className = "textareaMain"}) => {
  return (
    <textarea
      className={className}
      id="textarea"
      rows={'10'}
      defaultValue={text}
    />
  )
};

NoteTextInput.propTypes = {
  text: PropType.string.isRequired,
  className: PropType.string,
};

export default NoteTextInput;