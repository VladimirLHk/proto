import React from 'react';
import {connect} from "react-redux";
import TreeStructure from "../../components/treeStructure/treeStructure";
import AnswerSelection from "../../components/answerSelection/answerSelection";
import {
  basketAdd,
  cancelBasketAdd,
  changeBasketsSetView,
  changeTagStatus,
  tagAdd
} from "../../Redux/actions";
import TagsList from "../../components/tagsList/tagsList";
import symbolBlocksQuestionGenerator from "../../TextLib/symbolBlocksQuestionGenerator";
import {getNewId} from '../../TextLib/getNewId';

const SYMBOL_ID_FACTOR = 4;

const getNewSymbolId = (symbolsSet) => {
  let newSymbolId = getNewId(SYMBOL_ID_FACTOR);
  for (
    let attempt=0;
    symbolsSet.findIndex(item => item.id === newSymbolId) !== -1, attempt < 50;
    attempt++
  ) {
    newSymbolId = getNewId(SYMBOL_ID_FACTOR);
  }
  return newSymbolId;
};

const ClassificationsCard = (
  {
    questionStructure,
    basketStructure,
    tagsStructure,
    answerChoiceDone,
    basketStructureFuncs,
    tagsStructureFuncs}
    ) => {
  let answerBlockParams = symbolBlocksQuestionGenerator(questionStructure);
  return(
    <div className={"row mt-2"}>
      <div className={"col-4 " + (questionStructure.isShow ? " " : " invisible")}>
        <AnswerSelection
          title={"Решения:"}
          question={answerBlockParams.question}
          answers={answerBlockParams.answers ? answerBlockParams.answers : []}
          choice={(buttonNum) => {
              let symbolId = getNewSymbolId(questionStructure.symbolsSet);
              let csId = answerBlockParams.questBlock.csId;
              let basketId = questionStructure.currentBasketId;
              let tags = questionStructure.tagsSet;
              answerBlockParams.actionsSet[buttonNum].forEach(action => {
                answerChoiceDone(action({symbolId, csId, basketId, tags}))
              });
          }}
        />
      </div>
      <div className={"col-5 border-right border-left"}>
        <TreeStructure
          {...Object.assign({}, basketStructure, basketStructureFuncs)} />
      </div>
      <div className={"col-3 "}>
        <TagsList {...Object.assign({}, tagsStructure, tagsStructureFuncs)}/>
      </div>
    </div>
  )
}



const mapStateToProps = state => {
  console.log('Current state: ', state);
  return{
    questionStructure: {
      isShow: state.buttonState,
      blocks: state.blocksOperations.blocks, // blocks: state.currentText,
      basketsSet: state.basketsOperation.basketsSet,
      currentBasketId: state.basketsOperation.currentBasket,
      tagsSet: state.tagsOperations.tagsSet,
      symbolsSet: state.symbolsOperations.symbolsSet,
    },
    basketStructure: {
      title: "Структура классов",
      levelMark: "---",
      treeElements: state.basketsOperation.basketsSetView,
      className: " pl-3 "
    },
    tagsStructure: {
      title: "Список признаков",
      tagsList: state.tagsOperations.tagsSet,
    }
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    answerChoiceDone: (action) => {dispatch(action)},
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
};

const Classifications = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClassificationsCard);

export default Classifications;
