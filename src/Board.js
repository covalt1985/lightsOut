import React, { Component } from 'react';

import Cell from './Cell';
import './Board.css';

//import board with solution
import { solvedBoard } from './solvedBoard';
import Input from './Input';

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
  };

  constructor(props) {
    super(props);

    this.state = {
      hasWon: false,
      board: this.setInitialBoardState(),
      hintBoard: JSON.parse(JSON.stringify(solvedBoard)),
      showHint: false,
    };

    this.flipCellsAround = this.flipCellsAround.bind(this);
    this.restartBoard = this.restartBoard.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
  }

  //create pure board
  setInitialBoardState() {
    let initialBoard = [];

    while (initialBoard.length < this.props.nrows) {
      initialBoard.push(Array(this.props.ncols).fill(true));
    }

    return initialBoard;
  }

  //shuffle playing and solved board with the same moves
  initialShuffle(board, unFLippedSolvedBoard) {
    const flippedSolvedBoard = [...unFLippedSolvedBoard];
    let count = 0;
    const randomNumber = () => Math.floor(Math.random() * this.props.nrows);

    while (count < 10) {
      let y = randomNumber();
      let x = randomNumber();

      this.flipCellsAround(y, x, board);
      this.flipCell(y, x, flippedSolvedBoard);
      count = count + 1;
    }
    this.setState({ hintBoard: flippedSolvedBoard });
  }

  //flip clicked cell, and cells around
  flipCellsAround(x, y, board) {
    let newBoard = board;

    board = this.flipCell(x, y, board);
    board = this.flipCell(x - 1, y, board);
    board = this.flipCell(x + 1, y, board);
    board = this.flipCell(x, y - 1, board);
    board = this.flipCell(x, y + 1, board);

    this.setState(() => ({
      board: newBoard,
    }));
    return !this.state.hasWon ? this.checkIfWin() : '';
  }

  flipCell(x, y, board) {
    let newBoard = board;
    const ncols = 5;
    const nrows = 5;

    // if this coord is actually on board, flip it

    if (y >= 0 && y < ncols && x >= 0 && x < nrows) {
      newBoard[x][y] = !newBoard[x][y];
    }
    return newBoard;
  }

  //board to render
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
            flipCell={this.flipCell}
            hintBoard={this.state.hintBoard}
            showHint={this.state.showHint}
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

  // win when every cell is false
  checkIfWin() {
    if (this.state.board.every(row => row.every(cell => !cell))) {
      this.setState(() => ({ hasWon: true }));
    }
  }

  restartBoard() {
    const newBoardAfterReset = this.setInitialBoardState();
    this.initialShuffle(
      newBoardAfterReset,
      JSON.parse(JSON.stringify(solvedBoard))
    );

    this.setState({
      board: newBoardAfterReset,
      hasWon: false,
      showHint: false,
    });
  }

  handleChecked(e) {
    e.target.checked
      ? this.setState({ showHint: true })
      : this.setState({ showHint: false });
  }

  componentDidMount() {
    this.initialShuffle(this.state.board, this.state.hintBoard);
  }

  render() {
    return (
      <div className="wrapper">
        <div className="neonContainer">
          <div className="neonContainer_lights">Lights </div>
          <div className="neonContainer_out">Out </div>
        </div>

        {this.state.hasWon ? (
          <div className="neonContainer">
            <div className="neonContainer_lights">You</div>{' '}
            <div className="neonContainer_out"> Win! </div>
            <button onClick={this.restartBoard}>Restart</button>
          </div>
        ) : (
          <div className="boardContainer">
            <div className="boardContainer_board">{this.createBoard()}</div>
            <div className="boardContainer_inputs">
              <button onClick={this.restartBoard}>Restart</button>
              <Input
                handleChecked={this.handleChecked}
                showHint={this.state.showHint}
              />
            </div>
          </div>
        )}

        <p>Turn off the lights!</p>
      </div>
    );
  }
}

export default Board;
