import React, { Component } from 'react';

import './Cell.css';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // flip this cell, cells around and flips cell in hintBoard
    this.props.flipCellsAround(this.props.x, this.props.y, this.props.board);
    this.props.flipCell(this.props.x, this.props.y, this.props.hintBoard);
  }

  render() {
    let mainBoardClasses = `board_cell ${
      this.props.isLit ? 'board_cell-lit' : ''
    } ${
      this.props.showHint && this.props.hintBoard[this.props.x][this.props.y]
        ? 'board_cell-hint'
        : ''
    }`;
    return <td className={`${mainBoardClasses}`} onClick={this.handleClick} />;
  }
}

export default Cell;
