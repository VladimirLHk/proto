import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ExperimentFramework from './App';
import TextMarker from "./TextMarker/TextMarker";

const textText = 'God buy, my Little Baby! Do you love me? I love you! Mary Christmas!!!';


// ReactDOM.render(<ExperimentFramework />, document.getElementById('root'));
ReactDOM.render(<TextMarker initText = {textText}/>, document.getElementById('root'));
