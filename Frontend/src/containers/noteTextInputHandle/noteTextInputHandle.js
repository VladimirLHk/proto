import {connect} from 'react-redux';
import noteTextInput from "../../components/noteTextInput/noteTextInput";
import getTextFromBlocks from "../../TextLib/getTextFromBlocks";

const mapStateToProps = (state) => {
  console.log('noteTextInputHandle: ', state.currentText);
  return {
    text: getTextFromBlocks(state.currentText),
  }
};

const NoteTextInputHandle = connect(
  mapStateToProps
)(noteTextInput);

export default NoteTextInputHandle;