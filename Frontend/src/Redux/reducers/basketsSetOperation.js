import {BASKET_ADD, BASKET_PRESSED, SET_BASKETS_SET, SAVE_NOTE_BUTTON_PRESSED} from "../actionsNames";
import {getNewId} from "../../TextLib/getNewId";

const EXIST_BASKET_CLASS_NAME = "btn btn-outline-success btn-sm ";
const NEW_BASKET_CLASS_NAME = "btn btn-primary btn-sm ";
const NAME_INPUT_CLASS_NAME = '';
const OK_INPUT_CLASS_NAME = '';
const CANCEL_INPUT_CLASS_NAME = '';
const ADD_BASKET_NAME = "СОЗДАТЬ";
const ADD_BASKET_ID_PREFIX = "new_basket";

const getBasketViewNode = (level, name, id, className) => {
  return {level, name, id, className}
};

const getNewBasketInputNode = (level, parentId) => {
  return {
    level,
    isInput: true,
    inputButton: {
      id: "newBasketName",
      onInput: () => {},
      placeholder: "Название группы",
      className: NAME_INPUT_CLASS_NAME,
    },
    okButton: {
      id: "newBasketCreate"+parentId,
      onClick: (e) => {
        let newBasketName = document.getElementById('newBasketName').value;
        if (!newBasketName) {
          return
        }
        let parentId = e.target.id.replace("newBasketCreate", "");
        return {newBasketName, parentId}
        // это "заготовка", она потом будет переопределяться в Арр
      },
      className: OK_INPUT_CLASS_NAME,
    },
    cancelButton: {
      id: "newBasketCancel",
      onClick: () => {},
      className: CANCEL_INPUT_CLASS_NAME,
    },
  }
}

const setParamsForView = (basketsSet, currentViewParams, pressedNodeId) => {
  console.log('from setParamsForView:', basketsSet, currentViewParams, pressedNodeId);

  const REMOVE_INPUT_NODE = inputIndex => {
    //в представлении есть узел ввода имени ==> закрываем его и заменяем на кнопку создания нового узла
    if (inputIndex !== -1) {
      let level = currentViewParams[inputIndex].level;
      let parentId = currentViewParams[inputIndex].okButton.id.replace("newBasketCreate", "");
      currentViewParams[inputIndex] = getBasketViewNode(level, ADD_BASKET_NAME, ADD_BASKET_ID_PREFIX+parentId, NEW_BASKET_CLASS_NAME)
    }
  }
  //создание набора корзин
  if (basketsSet === undefined || !Array.isArray(basketsSet)) {
    basketsSet = [];
  };

  //начальное заполнение представления
  if (currentViewParams === undefined || !Array.isArray(currentViewParams) || currentViewParams.length === 0) {
    let newViewParams = basketsSet.reduce((prevResult, item, index) => {
      if (item.parent === null) {
        prevResult.push(getBasketViewNode(0, item.name, item.id, EXIST_BASKET_CLASS_NAME))
      }
    },[]);
      newViewParams.push(getBasketViewNode(0, ADD_BASKET_NAME, ADD_BASKET_ID_PREFIX+'0', NEW_BASKET_CLASS_NAME));
    return newViewParams;
  }

  //модификация существующего представления
  //проверяем, есть ли в представлении узел ввода имени нового узла
  let inputIndex = currentViewParams.findIndex(item => item.isInput);

  //ищем в представлении индекс преданного узла
  let index = currentViewParams.findIndex(item => item.id === pressedNodeId);

  //нажата кнопка создания
  if (pressedNodeId.indexOf(ADD_BASKET_ID_PREFIX) === 0){
    //если в представлении есть узел ввода имени ==> закрываем его и заменяем на кнопку создания нового узла
    REMOVE_INPUT_NODE(inputIndex);
    //создаем новый узел ввода имена на месте нажатой кнопки добавления
    currentViewParams[index] = getNewBasketInputNode(currentViewParams[index].level, pressedNodeId.replace(ADD_BASKET_ID_PREFIX,''));
    return currentViewParams.slice();
  }

  //передано ID корзины
  let basketSetIndex = basketsSet.findIndex(item => item.id === pressedNodeId);
  //Это какая-то ошибка: передан id корзины, которой нет в наборе!!!!!
  if (basketSetIndex === -1) {
    return
  }

  //в представлении есть узел ввода имени
  if (inputIndex !== -1) {
    //переданного ID узла нет в представлении ==>
    // на месте узла ввода имени вставляем кнопку этого нового узла и добавляем после него кнопку создания нового узла
    if (index === -1) {
      let level = currentViewParams[inputIndex].level;
      currentViewParams[inputIndex] = getBasketViewNode(level, basketsSet[basketSetIndex].name, pressedNodeId, EXIST_BASKET_CLASS_NAME);
      currentViewParams.splice(
        inputIndex+1,
        0,
        getBasketViewNode(level, ADD_BASKET_NAME, ADD_BASKET_ID_PREFIX+basketsSet[basketSetIndex].parent, NEW_BASKET_CLASS_NAME)
      );
      return currentViewParams.slice();
    } else {
      REMOVE_INPUT_NODE(inputIndex);
    }
  }

  let level = currentViewParams[index].level;
  //нажата кнопка существующей корзины без "потомков"
  if (basketsSet[basketSetIndex].children === undefined || !basketsSet[basketSetIndex].children.length) {
    currentViewParams.splice(
      index+1,
      0,
      getBasketViewNode(level+1, ADD_BASKET_NAME, ADD_BASKET_ID_PREFIX+pressedNodeId, NEW_BASKET_CLASS_NAME)
    );
    return currentViewParams.slice();
  }

  //нажата кнопка существующей корзины c "потомками" и его ветвь ранее была открыта ==> ветвь надо закрыть
  if (basketsSet[basketSetIndex].children.contains(currentViewParams[index+1].id)) {
    for (
      let i=index+1;
      i < currentViewParams.length, currentViewParams[i].level > level;
      ) {
      currentViewParams.splice(i, 1);
    }
    return currentViewParams.slice();
  }

  //нажата кнопка существующей корзины c "потомками" и его ветвь ещё не открыта ==> ветвь надо открыть
  basketsSet[basketSetIndex].children.forEach((id, childrenIndex) => {
    let child = basketsSet.find(item => item.id === id);
    currentViewParams.splice(
      index+1+childrenIndex,
      0,
      getBasketViewNode(level+1, child.name, child.id, EXIST_BASKET_CLASS_NAME)
    );
  });
  currentViewParams.splice(
    index+1+basketsSet[basketSetIndex].children.length,
    0,
    getBasketViewNode(level+1, ADD_BASKET_NAME, ADD_BASKET_ID_PREFIX+pressedNodeId, NEW_BASKET_CLASS_NAME)
  );
  return currentViewParams.slice();
};

const setCurrentBasket = buttonId => {
  if (buttonId === undefined) {
    return buttonId
  }
  if (buttonId.indexOf(ADD_BASKET_ID_PREFIX) === 0) {
    return buttonId.replace(ADD_BASKET_ID_PREFIX, '');
  }
  return buttonId
};

const createBasket = (basketsSet, newBasketName, parentId) => {
  let newBasketId = getNewId(2);
  for (
    let attempt=0;
    basketsSet.findIndex(item => item.id === newBasketId) !== -1, attempt < 50;
    attempt++
  ) {
    newBasketId = getNewId(2);
  };
  return {
    id: newBasketId,
    name: newBasketName,
    parent: parentId === "0" ? null : parentId,
    children: [],
    items: [],
  }
};

const addNewBasket = (basketsSet, newBasket) => {
  basketsSet.push(newBasket);
  let parentIndex = basketsSet.findIndex(item => item.id === newBasket.parent);
  if (parentIndex !== -1) {
    if (basketsSet[parentIndex].children) {
      basketsSet[parentIndex].children.push(newBasket.id)
    } else {
      basketsSet[parentIndex].children = [newBasket.id];
    }
  }
  return basketsSet.slice();
};

const initState = {
  basketsSet: [],
  basketsSetView: setParamsForView([]),
  currentBasket: setCurrentBasket(undefined),
};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_BASKETS_SET:
      return {...state, basketsSet: action.basketsSet};
    case BASKET_PRESSED:
      console.log("BASKET_PRESSED. State:", state);
      return {
        ...state,
        basketsSetView: setParamsForView(state.basketsSet, state.basketsSetView, action.basketPressedId),
        currentBasket: setCurrentBasket(action.basketPressedId),
      };
    case BASKET_ADD:
      let newBasket = createBasket(state.basketsSet, action.newBasketName, action.parentId);
      let basketsSet = addNewBasket(state.basketsSet, newBasket);
      return {
        currentBasket: newBasket.id,
        basketsSet,
        basketsSetView: setParamsForView(basketsSet, state.basketsSetView, newBasket.id)
      };
    default: return state;
  }

}