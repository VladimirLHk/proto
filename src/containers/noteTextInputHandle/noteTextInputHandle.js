import {connect} from 'react-redux';
import noteTextInput from "../../components/noteTextInput/noteTextInput";

const mapStateToProps = (state) => {
  return {
    text: state.currentText,
    className: "textareaMain" + (state.buttonState ? " hidden" : ""),
  }
};

const NoteTextInputHandle = connect(
  mapStateToProps
)(noteTextInput);

export default NoteTextInputHandle;