import React from 'react';

function TimeScaleChoice(props) {
  return (
    <div className="">
      <p> Выберите систему летоисчисления:</p>
      {props.timeScales.map( scale => {
        return (
        <div onClick = {props.changeScale}> {scale} </div>
        )
      })
      }
    </div>
  );
}

export default TimeScaleChoice;
