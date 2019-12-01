import {connect} from 'react-redux';
import noteTextInput from "../../components/noteTextInput/noteTextInput";

// className: "textareaMain" + (state.buttonState ? " hidden" : ""),
const mapStateToProps = (state) => {
  return {
    text: state.currentText,
    className: "row textareaMain" + (state.buttonState ? " hidden" : ""),
  }
};

const NoteTextInputHandle = connect(
  mapStateToProps
)(noteTextInput);

export default NoteTextInputHandle;