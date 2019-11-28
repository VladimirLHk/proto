import React from 'react';
import './FCMarker.css'

class FCMarker extends React.Component {

  render () {
    let text = (this.props.text === '\n') ? <br /> : this.props.text;
    return (
      <span
        id = {this.props.id}
        className={this.props.className}
      > {text} </span>
    )
  }
}

export default FCMarker;