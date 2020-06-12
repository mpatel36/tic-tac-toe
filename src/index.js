import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/* Taking Turns:
  now we fix an obvious flaw in our game: the "Os" can't 
  be marked on the board.

  we set the first move to be 'X' on default 

  we set this default by modifying the 
  initial state in our Board constructor

  we update the Board's handleClick function to flip the
  value of xIsNext

  now Xs and Os can take turns!

  we change status text in Board's render so it shows which
  player has the next turn.

  DONE: 
    we set X as the default player, 
    enable Xs and Os to take turns,
    update the status for the player whose turn is next.


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
      /* 
        modified the initial state to set
        the first move to be 'X' on default.
      */
    };
  }

  handleClick(i) {
    /*
      each time a player moves, xIsNext will be 
      flipped to determine which player goes next and
      the game state will be saved
    */
    const squares = this.state.squares.slice();
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
    const status = 'Next player: ' + (this.state.xIsNext ? 'X':'O');

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
  