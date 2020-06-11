import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
    return (
      <button 
        className="square" 
        onClick={() => this.setState({value: 'X'}) 
        /* We will take onClick from props instead! 
          Right now, we are ignoring props.
        */}
      >
        {this.state.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    /*Below we are lifting state into a parent component.*/
    this.state = {
      squares: Array(9).fill(null)
    };
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]
        /*each square now receives a value prop*/}
        onClick={() => this.handleClick(i)
        /*handleClick will handle change in Square's value.
          This gives Square a way to update Board's state.

          Since state is considered private to the component that
          defines it, we can't update Board's state directly from 
          Square.
        
          Here, we are passing down handleClick from the 
          Board to the Square.
          Square will call the function when a square is clicked
        */}
      />
    );
    /* ^ if returning multi-line components need parenthesis ^
      Do this so JS does not add a semicolon after 'return' 
      and break your code */
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
  