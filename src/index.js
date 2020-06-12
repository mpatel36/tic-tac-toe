import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/* Showing the Past Moves:
  Since we record the game's history, we can now display
  it to player as a list of past moves

  we know that React elements are first-class JS objects --
  -- we can pass them around in our applications --
  -- we can use an array of React elements to render multiple
    items

  we want to display a list of buttons to "jump" to 
  past moves

  using map method, we can map history of moves to React
  elements representing buttons on the screen 

  1. we map over the history in the Game's render
    -- we see a list of moves that have occurred in game and
    warning that says:

              "Warning: Each child in an array or iterator 
                should have a unique “key” prop. Check the 
                render method of “Game”."
    -- what does this warning mean? TBD --

  DONE: 
    mapped history of moves to React elements 

  TODO:
    Resolve warning "each child in array or iterator should
    have a unique key prop"

    learn more about shouldComponentUpdate() and 
    how you can build 'pure components'

  COOL:
    unlike array push() method, concat() doesn't
    mutate original array

    in JS, arrays have a map() method that is used for 
    mapping data to other data, for example
          const numbers = [1, 2, 3];
          const doubled = numbers.map(x => x * 2); // [2, 4, 6]
            
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
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  render() {
    return (
      <div>
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history
    const current = history[history.length - 1]
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X':'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    }); 
  }
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    /* 
      1. map over history --
      -- for each move in the game's history, we create a 
      list item <li> which contains a <button>, --
      -- the button has a onClick handler which calls 
      this.jumpTo() 
    */
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    })
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' 
        + (this.state.xIsNext ? 'X': 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}       
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
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

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
  