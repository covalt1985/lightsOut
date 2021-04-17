import React, { Component } from 'react';

import Cell from './Cell';
import './Board.css';
class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
  };

  constructor(props) {
    super(props);

    this.flipCellsAround = this.flipCellsAround.bind(this);
    this.restartBoard = this.restartBoard.bind(this);

    this.state = {
      hasWon: false,
      board: this.setInitialBoardState(),
    };
  }

  // Sets winnable board from 10 random moves

  setInitialBoardState() {
    let initialBoard = [];

    while (initialBoard.length < this.props.nrows) {
      initialBoard.push(Array(this.props.ncols).fill(true));
    }

    return initialBoard;
  }

  initialShuffle(board) {
    let count = 0;
    const randomNumber = () => Math.floor(Math.random() * this.props.nrows);

    while (count < 5) {
      let y = randomNumber();
      let x = randomNumber();

      this.flipCellsAround(y, x, board);
      count = count + 1;
    }
  }

  createBoard() {
    const board = [];
    let singleRow = [];

    this.state.board.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        singleRow.push(
          <Cell
            x={rowIndex}
            y={cellIndex}
            key={`${rowIndex}-${cellIndex}`}
            flipCellsAround={this.flipCellsAround}
            isLit={cell}
            board={this.state.board}
          />
        );
      });
      board.push(<tr key={rowIndex}>{singleRow}</tr>);
      singleRow = [];
    });

    return (
      <table>
        <tbody>{board}</tbody>
      </table>
    );
  }

  //flip clicked cell, and cells around
  flipCellsAround(y, x, board) {
    let newBoard = board;

    board = this.flipCell(y, x, board);
    board = this.flipCell(y - 1, x, board);
    board = this.flipCell(y + 1, x, board);
    board = this.flipCell(y, x - 1, board);
    board = this.flipCell(y, x + 1, board);

    this.setState(() => ({
      board: newBoard,
    }));

    // win when every cell is turned off
  }

  flipCell(y, x, board) {
    let newBoard = board;
    let { ncols, nrows } = this.props;

    // if this coord is actually on board, flip it

    if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
      newBoard[y][x] = !newBoard[y][x];
    }
    return newBoard;
  }

  checkIfWin() {
    if (this.state.board.every(row => row.every(cell => !cell))) {
      this.setState(() => ({ hasWon: true }));
    }
  }

  componentDidMount() {
    this.initialShuffle(this.state.board);
  }

  restartBoard() {
    let newBoard = this.setInitialBoardState();
    this.initialShuffle(newBoard);

    this.setState({ board: newBoard, hasWon: false });
  }

  render() {
    return (
      <div className="wrapper">
        {!this.state.hasWon ? this.checkIfWin() : ''}

        <div className="container">
          <div className="neon">Lights </div>
          <div className="flux">Out </div>
        </div>

        {this.state.hasWon ? (
          <div className="container">
            <div className="neon">You</div> <div className="flux"> Win! </div>
            <button onClick={this.restartBoard}>Restart</button>
          </div>
        ) : (
          <div className="boardContainer">
            <div className="Board">{this.createBoard()}</div>
            <button onClick={this.restartBoard}>Restart</button>
          </div>
        )}

        <p>Turn off the lights!</p>
      </div>
    );
  }
}

export default Board;
