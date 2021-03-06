import {connect} from 'react-redux';
import React from "react";
import TreeStructure from "../../components/treeStructure/treeStructure";
import {TEST_TREE_STRUCTURE} from "../../constants";
import {basketAdd, changeBasketsSetView, cancelBasketAdd} from '../../Redux/actions';

const mapStateToProps = (state) => {
 return {
   title: "Структура классов",
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
    newNodeCancelOnClick: (e) => {
      let parentId = e.target.id.replace("newBasketCancel", "");
      dispatch(cancelBasketAdd({parentId}))
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


