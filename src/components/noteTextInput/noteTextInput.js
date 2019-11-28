import React from 'react';
import PropType from 'prop-types';
import './noteTextInput.css'

const NoteTextInput = ({text, className}) => {
  return (
    <textarea
      className={className}
      id="textarea"
      rows={'10'}
      cols={'60'}
    >
      {text}
    </textarea>
  )
};

NoteTextInput.propTypes = {
  text: PropType.string.isRequired,
  className: PropType.string.isRequired,
};

export default NoteTextInput;