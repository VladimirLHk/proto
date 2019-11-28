import React from 'react';


function DateFrame(props) {
  let dataItem = props.date;
  return (
    <div className="">
      <p> Дата записи: {dataItem.day}-{dataItem.month}-{dataItem.year} (по {dataItem.timeScale}-стилю )</p>
      <p> Установлена система летоисчисления: {props.currentTimeScale}</p>
    </div>
  );
}

export default DateFrame;
