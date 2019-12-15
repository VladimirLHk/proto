import React from 'react';
import Button from '../button/button';

const BUTTON_PREFIX = 'answerSelection';

const AnswerSelection = ({question, answers, choice}) => {
  return (
    <div className={"row"}>
      <div>
        <div>{question}</div>
        {answers.map((name, index) => {
          let id = BUTTON_PREFIX+index;
          return(
            <Button
              key={id}
              id={id}
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