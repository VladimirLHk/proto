import React from 'react';
import PropType from 'prop-types';
import Button from "../../components/button/button";
import {moveBlocksCursor} from "../../Redux/actions";
import {connect} from "react-redux";

const markedTextBlockJumper = ({clickNext, clickPrev,  blocksAmount, cursorIndex}) => {
  return (
    <div className={"markedTextBlockJumper"}>
      <Button onClick={()=>clickPrev(blocksAmount, cursorIndex)} name={"Пред."} className={"btn btn-outline-info"}/>
      <Button onClick={()=>clickNext(blocksAmount, cursorIndex)} name={"След."} className={"btn btn-outline-info"}/>
    </div>
  )
};

markedTextBlockJumper.propTypes = {
  clickNext: PropType.func.isRequired,
  clickPrev: PropType.func.isRequired,
};

const mapStateToProps = state => {
  return{
    blocksAmount: state.currentText.length,
    cursorIndex: state.cursorIndex,
  }
}

// rowIndex < 0 ? blocksAmount-1 : rowIndex % blocksAmount
const mapDispatchToProps = (dispatch) => {
  return {
    clickNext: (blocksAmount, cursorIndex) => {
      cursorIndex = (cursorIndex + 1) % blocksAmount;
      dispatch(moveBlocksCursor({cursorIndex}))
    },
    clickPrev: (blocksAmount, cursorIndex) => {
      cursorIndex = (cursorIndex + blocksAmount - 1) % blocksAmount;
      dispatch(moveBlocksCursor({cursorIndex}))}
  }
};

const MarkedTextBlockJumperGroup = connect(
  mapStateToProps,
  mapDispatchToProps
)(markedTextBlockJumper);

export default MarkedTextBlockJumperGroup;