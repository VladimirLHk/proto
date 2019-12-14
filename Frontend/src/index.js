import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import complexReducer from "./Redux/reducers"
import './index.css';
import App from "./App";

let store = createStore(
  complexReducer,
  applyMiddleware(thunkMiddleware)
  );

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'));

