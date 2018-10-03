import React, { Component } from "react";
import Board from "./board";
import calculateWinner from "./helpers/calculateWinner";

export default class Game extends Component {
  state = {
    xIsNext: true,
    stepNumber: 0,
    history: [
      {
        squares: Array(9).fill(null)
      }
    ]
  };

  handleClick = i => {
    const { xIsNext, history } = this.state;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";
    this.setState({
      xIsNext: !xIsNext,
      history: history.concat([{ squares }]),
      stepNumber: this.state.stepNumber + 1
    });
  };

  paintMoves() {
    return this.state.history.map((step, move) => {
      const desc = move ? "Move #" + move : "Start Game";
      return (
        <li key={move}>
          <p onClick={() => this.jumpTo(move)} className="gameHistory">
            {desc}
          </p>
        </li>
      );
    });
  }

  jumpTo = step => {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 ? false : true
    });
  };

  render() {
    const { xIsNext, stepNumber, history } = this.state;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = "Game ower! Winner is: " + winner;
    } else {
      status = "Next player is: " + (xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ul>{this.paintMoves()}</ul>
        </div>
      </div>
    );
  }
}
