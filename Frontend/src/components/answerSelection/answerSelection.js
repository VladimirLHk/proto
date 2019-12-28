import React from 'react';
import Button from '../button/button';

const BUTTON_PREFIX = 'answerSelection';

const AnswerSelection = ({title, question, answers, choice}) => {
  return (
    <div className={"row"}>
      <div>
        <h4>{title}</h4>
        <div className={"border-bottom mb-2"}>{question.map((line, index) => <p key={'Q'+index}>{line}</p>)}</div>
        {answers.map((name, index) => {
          let id = BUTTON_PREFIX+index;
          return(
            <Button
              key={id}
              id={id}
              className = {"my-1 mx-1"}
              onClick={e => {
                choice(e.target.id.replace(BUTTON_PREFIX,''))
              }}
              name={name}/>
          )
        })}
      </div>
    </div>
  )
}

export default AnswerSelection;