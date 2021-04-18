import React, { Component } from 'react';

import './input.css';

class Input extends Component {
  render() {
    return (
      <div>
        <label className="boardContainer_inputs-label" htmlFor="hintCheckbox">
          Hint?
        </label>
        <input
          className="boardContainer_inputs-checkbox"
          type="checkbox"
          id="hintCheckbox"
          onChange={this.props.handleChecked}
          checked={this.props.showHint}
        />
      </div>
    );
  }
}

export default Input;
