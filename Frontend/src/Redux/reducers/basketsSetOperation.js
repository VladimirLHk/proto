import {BASKET_ADD, BASKET_PRESSED, SET_BASKETS_SET, NOT_CREATE_BASKET, SAVE_NOTE_BUTTON_PRESSED} from "../actionsNames";
import {getNewId} from "../../TextLib/getNewId";
import truncateString from "../../TextLib/truncateString";

const TREE_ROOT_ID = "0";
const EXIST_BASKET_CLASS_NAME = "btn btn-outline-success btn-sm ";
const NEW_BASKET_CLASS_NAME = "btn btn-primary btn-sm ";
const NAME_INPUT_CLASS_NAME = '';
const OK_INPUT_CLASS_NAME = '';
const CANCEL_INPUT_CLASS_NAME = '';
const ADD_BASKET_NAME = "СОЗДАТЬ";
const ADD_BASKET_ID_PREFIX = "new_basket";
const NAME_MAX_LENGTH = 15;

//формироваине подсказки для узла
const getToolTip = (name, children, items, addTip) => {
  let result = '';
  if (name.length > NAME_MAX_LENGTH) {
    result = name;
  }
  if (children && Array.isArray(children) && children.length > 0) {
    result += result !== "" ? '\n' : "";
    result += "Количество потомков: "+children.length;
  }
  if (items && Array.isArray(items) && items.length > 0) {
    result += result !== "" ? '\n' : "";
    result += "Содержит элементы: "+items.length + "шт.";
  }
  if (addTip && typeof addTip === 'string') {
    result += result !== "" ? '\n' : "";
    result += addTip;
  }
  return result
};

//создание узла "Корзина" или "Добавить корзину"
const getBasketViewNode = (level, name, id, className, tip) => {
  return {
    level,
    name: truncateString(name, NAME_MAX_LENGTH),
    id,
    className,
    tip,
  }
};

//создание узла ввода имени новой корзины
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
      onClick: () => {},
      className: OK_INPUT_CLASS_NAME,
    },
    cancelButton: {
      id: "newBasketCancel"+parentId,
      onClick: () => {},
      className: CANCEL_INPUT_CLASS_NAME,
    },
  }
};

//создание/обновление представления
const setParamsForView = (basketsSet, currentViewParams, pressedNodeId) => {
  // console.log('from setParamsForView:', basketsSet, currentViewParams, pressedNodeId);

  const CHANGE_INPUT_NODE_TO_ADD = inputIndex => {
    //в представлении есть узел ввода имени ==> закрываем его и заменяем на кнопку создания нового узла
    if (inputIndex !== -1) {
      let level = currentViewParams[inputIndex].level;
      let parentId = currentViewParams[inputIndex].okButton.id.replace("newBasketCreate", "");
      currentViewParams[inputIndex] = getBasketViewNode(level, ADD_BASKET_NAME, ADD_BASKET_ID_PREFIX+parentId, NEW_BASKET_CLASS_NAME)
    }
  };

  //ОСНОВНОЙ ПРОЦЕСС
  //1. Если массив представления пуст
  //создание набора корзин
  if (basketsSet === undefined || !Array.isArray(basketsSet)) {
    basketsSet = [];
  };
  //начальное заполнение представления
  if (currentViewParams === undefined || !Array.isArray(currentViewParams) || currentViewParams.length === 0) {
    let newViewParams = basketsSet.reduce((prevResult, item, index) => {
      if (item.parent === TREE_ROOT_ID) {
        prevResult.push(getBasketViewNode(0, item.name, item.id, EXIST_BASKET_CLASS_NAME, getToolTip(item.name)))
      }
    },[]);
    newViewParams.push(getBasketViewNode(0, ADD_BASKET_NAME, ADD_BASKET_ID_PREFIX+TREE_ROOT_ID, NEW_BASKET_CLASS_NAME));
    return newViewParams;
  }

  //2. модификация существующего представления
  //проверяем, есть ли в представлении узел ввода имени нового узла
  let inputIndex = currentViewParams.findIndex(item => item.isInput);
  //ищем в представлении индекс преданного узла
  let index = currentViewParams.findIndex(item => item.id === pressedNodeId);

  //2.1. нажата кнопка создания
  if (pressedNodeId.indexOf(ADD_BASKET_ID_PREFIX) === 0){
    //если в представлении есть узел ввода имени ==> закрываем его и заменяем на кнопку создания нового узла
    CHANGE_INPUT_NODE_TO_ADD(inputIndex);
    //создаем узел ввода имени новой корзины на месте нажатой кнопки добавления
    currentViewParams[index] = getNewBasketInputNode(currentViewParams[index].level, pressedNodeId.replace(ADD_BASKET_ID_PREFIX,''));
    return currentViewParams.slice();
  }

  //2.3. передан ID корня дерева === отменили создание корзины на 1-ом уровне ==> вернуть кнопку создания
  if (pressedNodeId === TREE_ROOT_ID) {
    CHANGE_INPUT_NODE_TO_ADD(inputIndex);
    return currentViewParams.slice();
  }

  //2.2. передано ID корзины
  let basketSetIndex = basketsSet.findIndex(item => item.id === pressedNodeId);
  //Это какая-то ошибка: передан id корзины, которой нет в наборе!!!!!
  if (basketSetIndex === -1) {
    return currentViewParams; //возвращаем БЕЗ изменений
  }

  //2.2.1. в представлении есть узел ввода имени
  if (inputIndex !== -1) {
    //2.2.1.1. переданного ID узла нет в представлении === Добавлен новый узел ==>
    // на месте узла ввода имени вставляем кнопку этого нового узла и добавляем после него кнопку создания нового узла
    if (index === -1) {
      let level = currentViewParams[inputIndex].level;
      let basket = basketsSet[basketSetIndex];
      currentViewParams[inputIndex] =
        getBasketViewNode(
          level,
          basket.name,
          pressedNodeId,
          EXIST_BASKET_CLASS_NAME,
          getToolTip(basket.name, basket.children, basket.items)
        );
      currentViewParams.splice(
        inputIndex+1,
        0,
        getBasketViewNode(level, ADD_BASKET_NAME, ADD_BASKET_ID_PREFIX+basket.parent, NEW_BASKET_CLASS_NAME)
      );
      return currentViewParams.slice();
    } else {
      //2.2.1.2. переданный ID узла есть в представлении  === от создания узла отказались ==>
      //перед скрытием/открытием ветки структуры нужно восстановить кнопку "Добавить" на месте узла ввода инмени новой корзины
      CHANGE_INPUT_NODE_TO_ADD(inputIndex);
      return currentViewParams.slice();
    }
  }

  //2.2.2. Скрытие/открытие ветки структуры
  //2.2.2.1. У нажатого узла есть элементы
  if (basketsSet[basketSetIndex].item && basketsSet[basketSetIndex].item.length > 0) {
    return currentViewParams //возвращаем БЕЗ изменений
  }
  //2.2.2.2. Нажатый узел не содержит элементы
  let level = currentViewParams[index].level;

  //2.2.2.2.1. ветка была ранее раскрыта ==> ветвь надо закрыть
  if (currentViewParams[index+1].level > level) {
    for (
      let i=index+1;
      i < currentViewParams.length, currentViewParams[i].level > level;
    ) {
      currentViewParams.splice(i, 1);
    }
    return currentViewParams.slice();
  }

  // 2.2.2.2.2. ветвь ещё не открыта ==> ветвь надо открыть
  if (!basketsSet[basketSetIndex].children) {
    basketsSet[basketSetIndex].children = []
  }
  basketsSet[basketSetIndex].children.forEach((id, childrenIndex) => {
    let child = basketsSet.find(item => item.id === id);
    currentViewParams.splice(
      index+1+childrenIndex,
      0,
      getBasketViewNode(
        level+1,
        child.name,
        child.id,
        EXIST_BASKET_CLASS_NAME,
        getToolTip(child.name, child.children, child.items)
      )
    );
  });
  currentViewParams.splice(
    index+1+basketsSet[basketSetIndex].children.length,
    0,
    getBasketViewNode(level+1, ADD_BASKET_NAME, ADD_BASKET_ID_PREFIX+pressedNodeId, NEW_BASKET_CLASS_NAME)
  );
  return currentViewParams.slice();
};

//"очистка" ID корзины для случаев неопределенности и когда перед id есть заданные префиксы
const setCurrentBasket = buttonId => {
  if (buttonId === undefined || buttonId === null) {
    return TREE_ROOT_ID
  }
  if (buttonId.indexOf(ADD_BASKET_ID_PREFIX) === 0) {
    return buttonId.replace(ADD_BASKET_ID_PREFIX, '');
  }
  return buttonId
};

//создание новой корзины
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
    parent: parentId,
    children: [],
    items: [],
  }
};

//добавление корзины в набор
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
  currentBasket: setCurrentBasket(TREE_ROOT_ID),
};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_BASKETS_SET:
      return {...state, basketsSet: action.basketsSet};
    case NOT_CREATE_BASKET:
      return {
        ...state,
        basketsSetView: setParamsForView(state.basketsSet, state.basketsSetView, action.parentId),
        currentBasket: setCurrentBasket(action.parentId),
      };
    case BASKET_PRESSED:
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