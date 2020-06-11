import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  /*We resolve the following

      TypeError: this.handleClick is not a function
    by adding handleClick to Board class.

    Like before we are able to click on Squares to fill them.

    However now the state is stored in the Board component
    instead of individual Square compos.

    When board state changes, Square components 
    re-render automatically!

    Keeping state of the squares in the Board will help us
    determine the winner.

    In React Terms, the Square components are now 
    "controlled components". That's because the Squares no
    longer maintain state, but rather the Squares receive 
    values from the Board component and inform the Board
    component when clicked.

    Notice in handleClick we will call .slice() to create 
    a copy of squares array.
  */

  render() {
    return (
      <button 
        className="square" 
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
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
    /*By calling .slice() we are creating a copy of squares
      array to modify instead of the existing array. 
      
      We'll explain why we create a copy later*/

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
  