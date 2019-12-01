import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {createStore} from "redux";
import complexReducer from "./Redux/reducers"
import './index.css';
import App from "./App";
import initialState from './data';
const fs = require('fs');
console.log(fs);


let store = createStore(complexReducer);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'));

let a = {a:1, b:2, c:3};
fs.writeFile('message.txt', a, 'utf8', (err) => {console.log(err)});