import React, { Component } from "react";
import Board from "./board";

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

    squares[i] = xIsNext ? "X" : "O";
    this.setState({
      xIsNext: !xIsNext,
      history: history.concat([{ squares }]),
      stepNumber: this.state.stepNumber + 1
    });
  };

  render() {
    const { xIsNext, stepNumber, history } = this.state;
    const current = history[stepNumber];
    const status = "Next player is: " + (xIsNext ? "X" : "O");

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ul>{/*history*/}</ul>
        </div>
      </div>
    );
  }
}
