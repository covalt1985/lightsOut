import React, { Component } from 'react';

import './Cell.css';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // call up to the board to flip cells around this cell and flips cell in hintBoard
    this.props.flipCellsAround(this.props.x, this.props.y, this.props.board);
    this.props.flipCell(this.props.x, this.props.y, this.props.hintBoard);
  }

  render() {
    let mainBoardClasses = `Cell ${this.props.isLit ? ' Cell-lit' : ''} ${
      this.props.hintBoard[this.props.x][this.props.y] ? 'hint' : ''
    }`;
    return <td className={`${mainBoardClasses}`} onClick={this.handleClick} />;
  }
}

export default Cell;
