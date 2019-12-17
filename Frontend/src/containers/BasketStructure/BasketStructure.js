import {connect} from 'react-redux';
import React from "react";
import TreeStructure from "../../components/treeStructure/treeStructure";
import {TEST_TREE_STRUCTURE} from "../../constants";
import basketsOperation from "../../Redux/reducers/basketsSetOperation";
import {basketAdd, changeBasketsSetView} from '../../Redux/actions';

// <TreeStructure
//   title={"Структура классов"}
//   treeElements={TEST_TREE_STRUCTURE}
//   levelMark={"---"}
//   className={"btn btn-outline-success btn-sm "}
//   nameMaxLength={15}
// />

const mapStateToProps = (state) => {
  console.log("BasketStructure. mapStateToProps:", state);
 return {
   title: "Структура классов",
   nameMaxLength: 15,
   levelMark: "---",
   treeElements: state.basketsOperation.basketsSetView
 }
};

const mapDispatchToProps = (dispatch) => {
  return {
    newNodeOkOnClick: (e) => {
      let newBasketName = document.getElementById('newBasketName').value;
      if (!newBasketName) {
        return
      }
      let parentId = e.target.id.replace("newBasketCreate", "");
      dispatch(basketAdd({newBasketName, parentId}))
    },
    nodeOnClick: (e) => {
      let basketPressedId = e.target.id;
      dispatch(changeBasketsSetView({basketPressedId}))
    },
  }
};

const BasketStructure = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TreeStructure);

export default BasketStructure;


