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
import AnswerSelection from "./components/answerSelection/answerSelection";
import NameInput from "./components/NameInput/nameInput";
import BasketStructure from "./containers/BasketStructure/BasketStructure";
import TagsStructure from "./containers/TagsStructure/TagsStructure";
import Classifications from "./containers/Classifications/Classifications";
import symbolsOperations from "./Redux/reducers/symbolsOperations";

class AppCard extends React.Component {

  componentDidMount() {
    this.props.loadLexicon();
  }

  render() {
    let {isEdit, basketsOperation, symbolsSet} = this.props;
    return(
      <div className="container">
        <div className={"row"}>
          <h3>{isEdit ? "Результаты обработки текста:" : "Введите текст:" }</h3>
          {!isEdit && <div className={"col-12"}><NoteTextInputHandle/></div>}
          {isEdit &&
            <>
              <div className={"col-8"}><NoteMarkedText/></div>
              <div className={"col-4"}>Кое-что</div>
            </>
          }
        </div>
        <NoteSaveEditButton basketsOperation={basketsOperation} symbolsSet = {symbolsSet}/>
        <Classifications/>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return{
    isEdit: state.buttonState,
    questionInWork: state.questionInWork,
    basketsOperation: state.basketsOperation,
    symbolsSet: state.symbolsOperations.symbolsSet,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadLexicon: () => dispatch(loadLexicon()),
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppCard);

export default App;

// {isEdit && <MarkedTextBlockJumperGroup />}
