import {TASK_SET} from "../actionsNames";

const EXIT_OPTION = 'Пока отложим';
const QUESTION_END = '\n Что делаем?';

const initialState = [
  {
    id: 'LAST TRIGGER',
    question:'Что дальше?',
    answers:['Займемся следующим вопросом', 'Закончим'],
    nextStep:['NEXT', 'QUIT'],
  },
  {
    id: 'BASKETS SET EMPTY',
    question:'Нет ни одной группы. ',
    answers:['Создать новую', EXIT_OPTION],
    nextStep:['CREATE BASKET', 'LAST TRIGGER'],
  },
  {
    id: 'SINGLE BASKET IN SET',
    question:'Есть единственная группа.  '+QUESTION_END,
    answers:['Поместить в неё','Создать в ней подгруппу', 'Создать новую', EXIT_OPTION],
    nextStep:['PUT IN BASKET', 'CREATE IN BASKET', 'CREATE BASKET', 'LAST TRIGGER'],
  },
  {
    id: 'SEVERAL BASKETS IN SET',
    question:'Есть несколько групп.  '+QUESTION_END,
    answers:['Поместить в существующую', 'Создать новую', EXIT_OPTION],
    nextStep:['', 'LAST TRIGGER'],
  },
  {
    id: '',
    question:'',
    answers:['',''],
    nextStep:['',''],
  },
];

export default (state = initialState, action) => {
  if (action.type === TASK_SET) {
    return action.taskNum
  }

  return state
}