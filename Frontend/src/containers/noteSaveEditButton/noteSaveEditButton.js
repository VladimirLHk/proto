import {connect} from 'react-redux';
import {NOTE_BUTTON_NAMES} from "../../constants";
import {saveNoteButtonPressed, editNoteButtonPressed, updateLexicon, updateLexiconEverywhere} from "../../Redux/actions";
import Button from "../../components/button/button";

const mapStateToProps = (state) => {
  return {
    name: state.buttonState ? NOTE_BUTTON_NAMES.edit_note : NOTE_BUTTON_NAMES.save_note,
    className: "buttonSaveOrEdit",
  }
};
// basketsSet: state.basketsOperation.basketsSet,

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('NoteSaveEditButton', ownProps);
  return {
    onClick: () => {
      let textareaNode = document.getElementById('textarea');
      if (textareaNode) {
        let text = textareaNode.value;
        dispatch(saveNoteButtonPressed({text, basketsSet: ownProps.basketsSet, symbolsSet: ownProps.symbolsSet}));
        dispatch(updateLexiconEverywhere({text}));
      } else {
        dispatch(editNoteButtonPressed())
      }
    }
  }
};

const NoteSaveEditButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(Button);

export default NoteSaveEditButton;