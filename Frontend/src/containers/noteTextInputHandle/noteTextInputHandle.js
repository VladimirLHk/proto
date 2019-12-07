import {connect} from 'react-redux';
import noteTextInput from "../../components/noteTextInput/noteTextInput";
import getTextFromBlocks from "../../TextLib/getTextFromBlocks";

const mapStateToProps = (state) => {
  return {
    text: getTextFromBlocks(state.currentText),
  }
};

const NoteTextInputHandle = connect(
  mapStateToProps
)(noteTextInput);

export default NoteTextInputHandle;