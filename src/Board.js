import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';


class Board extends Component {

  static defaultProps = {
    nrows: 5,
    ncols: 5,
  };

  constructor(props) {
    super(props);
    this.state = { hasWon: false, board: this.setInitialBoardState(), }
    this.flipCellsAround = this.flipCellsAround.bind(this)
  };

  // Sets winnable board from 10 random moves

  setInitialBoardState() {
    let initialBoard = [];

    while (initialBoard.length < this.props.nrows) {
      initialBoard.push(Array(this.props.ncols).fill(false))
    };

    this.initialShuffle(initialBoard);

    return initialBoard;
  };

  initialShuffle(board) {
    let count = 0;
    const randomNumber = () => Math.floor(Math.random() * this.props.nrows);

    while (count < 10) {
      const x = randomNumber();
      const y = randomNumber();

      this.flipCell(y, x, board);
      count = count + 1;
    };
  };

  // render board
  createBoard() {

    let board = [];
    let rowKey = 0;
    let cellKey = 0;

    for (let row of this.state.board) {
      let rows = [];

      for (let cell of row) {
        rows.push(
          <Cell isLit={cell} key={`${rowKey}-${cellKey}`} board={this.state.board}
            id={`${rowKey}-${cellKey}`} flipCellsAroundMe={this.flipCellsAround} />
        );
        cellKey++;
      };

      board.push(<tr key={rowKey}>{rows}</tr>);
      rowKey++;
      cellKey = 0;
    };

    return (
      <table>
        <tbody>
          {board}
        </tbody>
      </table>
    )
  };

  //flip clicked cell, and cells around
  flipCellsAround(coord, brd) {
    let board = brd
    let [y, x] = coord.split("-").map(Number);

    board = this.flipCell(y, x, brd);
    board = this.flipCell(y - 1, x, brd);
    board = this.flipCell(y + 1, x, brd);
    board = this.flipCell(y, x - 1, brd);
    board = this.flipCell(y, x + 1, brd);

    this.setState(() => ({
      board: board
    }));


    // win when every cell is turned off
    this.checkIfWin()

  }

  flipCell(y, x, brd) {
    let board = brd
    let { ncols, nrows } = this.props;

    // if this coord is actually on board, flip it

    if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
      board[y][x] = !board[y][x];
    }
    return board
  }

  checkIfWin() {
    if (this.state.board.every(row => row.every(cell => !cell))) {
      this.setState(() => ({ hasWon: true }))
    }
  };

  render() {

    return (

      <div>
        <div className="container">
          <div className="neon">Lights </div>
          <div className="flux">Out </div>
        </div>

        {this.state.hasWon ?
          <div className='container'><div className='neon'>You</div> <div className='flux'> Win! </div></div> :
          <div className='Board'>{this.createBoard()}</div>}
        <h3>Turn off the lights {`:)`}</h3>
      </div>
    )

  };
};

export default Board;
