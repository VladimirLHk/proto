import React from 'react';
import {connect} from "react-redux";
import TreeStructure from "../../components/treeStructure/treeStructure";
import AnswerSelection from "../../components/answerSelection/answerSelection";
import {basketAdd, cancelBasketAdd, changeBasketsSetView, changeTagStatus, tagAdd} from "../../Redux/actions";
import TagsList from "../../components/tagsList/tagsList";
import symbolBlocksQuestionGenerator from "../../TextLib/symbolBlocksQuestionGenerator";

const ClassificationsCard = ({questionStructure, basketStructure, tagsStructure, basketStructureFuncs, tagsStructureFuncs}) => {
  console.log('ClassificationsCard', questionStructure);
  let answerBlockParams = symbolBlocksQuestionGenerator(questionStructure);
  return(
    <div className={"row"}>
      <div className={"col-3"}>
        <AnswerSelection
          question={answerBlockParams.question}
          answers={answerBlockParams.answers ? answerBlockParams.answers : []}
          choice={(num) => console.log(['Да', 'Нет', 'Не знаю'][num])}
        />
      </div>
      <div className={"col-5"}>
        <TreeStructure
          {...Object.assign({}, basketStructure, basketStructureFuncs)} />
      </div>
      <div className={"col-4"}>
        <TagsList {...Object.assign({}, tagsStructure, tagsStructureFuncs)}/>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return{
    questionStructure: {
      blocks: state.currentText,
      basketsSet: state.basketsOperation.basketsSet,
      currentBasketId: state.basketsOperation.currentBasket,
      tagsSet: state.tagsOperations.tagsSet,
    },
    basketStructure: {
      title: "Структура классов",
      levelMark: "---",
      treeElements: state.basketsOperation.basketsSetView,
    },
    tagsStructure: {
      title: "Список признаков",
      tagsList: state.tagsOperations.tagsSet,
    }
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    answerChoiceDone: (id) => {dispatch(id)},
    basketStructureFuncs: {
      newNodeOkOnClick: (e) => {
        let newBasketName = document.getElementById('newBasketName').value;
        if (!newBasketName) {
          return
        }
        let parentId = e.target.id.replace("newBasketCreate", "");
        dispatch(basketAdd({newBasketName, parentId}))
      },
      newNodeCancelOnClick: (e) => {
        let parentId = e.target.id.replace("newBasketCancel", "");
        dispatch(cancelBasketAdd({parentId}))
      },
      nodeOnClick: (e) => {
        let basketPressedId = e.target.id;
        dispatch(changeBasketsSetView({basketPressedId}))
      },
    },
    tagsStructureFuncs:{
      okOnClick: ()=>{
        let newTagName = document.getElementById('newTagName').value;
        if (!newTagName) {
          return
        }
        dispatch(tagAdd({newTagName}))
      },
      cancelOnClick: ()=>{},
      changeTagStatus: (e)=>{
        let tagId = e.target.id;
        dispatch(changeTagStatus({tagId}))
      },
    },
  }
}

const Classifications = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClassificationsCard);

export default Classifications;


// <AnswerSelection
//   question={'Вот такой вот очень-очень-очень важный вопрос.'}
//   answers={['Да', 'Нет', 'Не знаю']}
//   choice={(num) => console.log(['Да', 'Нет', 'Не знаю'][num])}
// />
