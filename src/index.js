import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/* Function Components:
  we change the Square to be a "funciton component"

  "function components are a simple way to write 
  components that only contain a render method and 
  don't have their own state"

  rather than defining a class that extends
  React.Component, write a function that takes
  props as input and returns wha should be rendered!

  funct. compons. are less tedious to write than
  classes and many components can be expressed this way.

  DONE: 
    converted Square class to a 'Function Component"


  TODO:
    learn more about shouldComponentUpdate() and 
    how you can build 'pure components'

*/

function Square(props) {
  /*Square is now a "Function Component".
    We replaced the Square class with this 
    function!
  */
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
      squares: Array(9).fill(null)
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares}); 
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
    const status = 'Next player: X';

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
  