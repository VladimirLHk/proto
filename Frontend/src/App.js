import React from 'react';
import NoteSaveEditButton from "./containers/noteSaveEditButton/noteSaveEditButton";
import './App.css';
import NoteTextInputHandle from "./containers/noteTextInputHandle/noteTextInputHandle";
import NoteMarkedText from "./containers/noteMarkedText/noteMarkedText";
import {loadLexicon} from "./Redux/actions";
import {connect} from "react-redux";
import MarkedTextBlockJumperGroup from "./containers/markedTextBlockJumper/markedTextBlockJumper";
import TreeStructure from "./components/treeStructure/treeStructure";
import {TEST_TREE_STRUCTURE} from "./constants";

class AppCard extends React.Component {

  componentDidMount() {
    console.log("component App DidMount: ", this.props);
    this.props.loadLexicon();
  }

  render() {
    let {isEdit} = this.props;
    return(
      <div className="container">
        {!isEdit && <NoteTextInputHandle/>}
        {isEdit && <NoteMarkedText/>}
        <NoteSaveEditButton/>
        {isEdit && <MarkedTextBlockJumperGroup/>}
        <TreeStructure
          treeElements={TEST_TREE_STRUCTURE}
          levelMark={"---"}
          className={"btn btn-outline-success btn-sm "}
          nameMaxLength={7}
        />
      </div>
    )
  }

}

const App = connect(
  (state) => {return {isEdit: state.buttonState}},
  (dispatch) => {return {loadLexicon: () => dispatch(loadLexicon())}}
)(AppCard);

export default App;
