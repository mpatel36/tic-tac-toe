import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/* Immutability

  There are 2 ways to change data:
  1. mutate it by directly changing the data's values...
  
  2. replace data with a new copy which has desired
    changes (Immutability)

  immutability is better:

  A. Complex features become simple:
    an ability to undo and redo actions is a common item
    in applications.

    avoiding mutation lets us keep previous versions of the
    game's history intact and reuse them later.

  B. Detecting changes:
    detection in mutable objects is tough.

    it requires the mutable object to be compared to 
    previous copies of itself and the whole object tree to 
    be traversed!

    detecting changes in immutable objects is easy.

    if the immutable object referenced is different than the 
    previous one, then the object has changed.
  
  C. Determining when to re-render in React:
    main benefit of immutability is it helps you build
    "pure components".

    it helps to determine when a component is re-rendering.
    
  DONE: -

  TODO:
    learn more about shouldComponentUpdate() and 
    how you can build 'pure components'

  */
class Square extends React.Component {
  

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
  