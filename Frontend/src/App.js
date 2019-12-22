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

class AppCard extends React.Component {

  componentDidMount() {
    console.log("component App DidMount: ", this.props);
    this.props.loadLexicon();
  }


  render() {
    let {isEdit} = this.props;
    return(
      <div className="container">
        <div className={"row"}>
          <h3>{isEdit ? "Результаты обработки текста:" : "Введите текст:" }</h3>
          {!isEdit && <div className={"col-12"}><h3></h3><NoteTextInputHandle/></div>}
          {isEdit &&
            <>
              <div className={"col-8"}><NoteMarkedText/></div>
              <div className={"col-4"}>Кое-что</div>
            </>
          }
        </div>
        <NoteSaveEditButton/>
        {isEdit && <MarkedTextBlockJumperGroup/>}
        <div className={"row"}>
          <div className={"col-3"}>
            <AnswerSelection
              question={'Вот такой вот очень-очень-очень важный вопрос.'}
              answers={['Да', 'Нет', 'Не знаю']}
              choice={(num) => console.log(['Да', 'Нет', 'Не знаю'][num])}
            />
          </div>
          <div className={"col-5"}>
              <BasketStructure/>
          </div>
          <div className={"col-4"}>
            <TagsStructure/>
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return{
    isEdit: state.buttonState,
    questionInWork: state.questionInWork,
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
