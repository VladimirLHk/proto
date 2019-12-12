import React from 'react';
import PropType from 'prop-types';
import Button from "../../components/button/button";
import {moveBlocksCursor} from "../../Redux/actions";
import {connect} from "react-redux";

const markedTextBlockJumper = ({clickNext, clickPrev}) => {
  return (
    <div className={"markedTextBlockJumper"}>
      <Button onClick={clickPrev} name={"Пред."} className={"btn btn-outline-info"}/>
      <Button onClick={clickNext} name={"След."} className={"btn btn-outline-info"}/>
    </div>
  )
};

markedTextBlockJumper.propTypes = {
  clickNext: PropType.func.isRequired,
  clickPrev: PropType.func.isRequired,
};


const mapDispatchToProps = (dispatch) => {
  return {
    clickNext: () => {console.log('clickNext'); dispatch(moveBlocksCursor({moving: 1}))},
    clickPrev: () => {console.log('clickPrev'); dispatch(moveBlocksCursor({moving:-1}))}
  }
};

const MarkedTextBlockJumperGroup = connect(
  null,
  mapDispatchToProps
)(markedTextBlockJumper);

export default MarkedTextBlockJumperGroup;