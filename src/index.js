import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/* Declaring a Winner:
  we should show when the game is done and 
  there are no more turns to make

  we make a function called calculateWinner().

  we call calculateWinner in Board's render function to
  check if a player has won.

  if a player has won, we display text "Winner: X" or
  "Winner: O".
  
  we replace the status text in Board's render to check
  if a player has won.

  we change the Board's handleClick() to return early
  by ignoring a click if someone has won the game or if
  a Square is already filled.

  DONE: 
    created calculateWinner() to determine if a winner
    exists given squares,

    updated Board's render to show the Winner if one
    exists and inform the next player of their
    turn otherwise in status text,

    updated Board's handleClick() to ignore clicks on 
    squares if it they occupied, or if there is a winner,

  TODO:
    learn more about shouldComponentUpdate() and 
    how you can build 'pure components'
*/
/*
*/
function Square(props) {
  return (
    <button
      className = "square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
      /* 
        ignore clicks on the Square if there is a winner, or
        if the square is occupied.
      */
    }
    squares[i] = this.state.xIsNext ? 'X':'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    }); 
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares)
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  /* 
    Given an array of 9 squares 
    checks for a winner and 
    returns 'X', "O", or null as appropriate.
  */
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b]
      && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
  