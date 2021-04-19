import React, { Component } from 'react';

import './button.css';

class Button extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.restart();
  }

  render() {
    return (
      <button
        className={this.props.hasWon ? 'winButton' : ''}
        onClick={this.handleClick}>
        Restart
      </button>
    );
  }
}

export default Button;
