import React from 'react';
import TimeScaleChoice from './TimeScaleChoice';
import DateFrame from './dateFrame';
import './App.css';

const dataset =  [
  {
    day: 10,
    month: 4,
    year: 300,
    timeScale: 'grigorian'
  },
  {
    day: 16,
    month: 2,
    year: 560,
    timeScale: 'grigorian'
  },
  {
    day: 28,
    month: 5,
    year: 1996,
    timeScale: 'julian'
  },
];

const timeScales = ['julian', 'grigorian'];

class ExperimentFramework extends React.Component {
  constructor (props) {
    super(props);
    this.dataset = dataset;
    this.state = {currentTimeScale: 'julian'}
  }

  render() {
    let dateFramesCollection = dataset.map(item => {
      return (<DateFrame
        date = {item}
        currentTimeScale = {this.state.currentTimeScale}
      />)
    });
    return (
      <div className="App">
        <TimeScaleChoice
          currentTimeScale = {this.state.currentTimeScale}
          timeScales = {timeScales}
          changeScale = {state => {this.setState ({currentTimeScale: state.target.innerHTML}); console.log(state.target.innerHTML)}}
        />
        {dateFramesCollection}
        {'Hi'}
      </div>
    );
  }
}

export default ExperimentFramework;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

