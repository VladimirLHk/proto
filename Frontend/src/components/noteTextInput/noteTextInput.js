import React from 'react';
import PropType from 'prop-types';
import './noteTextInput.css'


// cols={'60'}

const NoteTextInput = ({text, className}) => {
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
  className: PropType.string.isRequired,
};

export default NoteTextInput;