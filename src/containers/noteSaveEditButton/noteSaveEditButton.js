import {connect} from 'react-redux';
import {NOTE_BUTTON_NAMES} from "../../constants";
import {noteButtonPressed} from "../../Redux/actions";
import Button from "../../components/button/button";

const mapStateToProps = (state) => {
  return {
    name: state.buttonState ? NOTE_BUTTON_NAMES.edit_note : NOTE_BUTTON_NAMES.save_note,
    className: "buttonSaveOrEdit",
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (buttonState) => {
      let text = document.getElementById('textarea').value;
      console.log('onClick', buttonState, text);
      dispatch(noteButtonPressed({buttonState, text}))
    }
  }
};

const NoteSaveEditButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(Button);

export default NoteSaveEditButton;