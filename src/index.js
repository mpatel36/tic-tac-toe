import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/* Adding Time Travel:
  (Want to store a history of moves)

  Recall slice() created a new copy of the 
  [] 'squares' after every move and treated it as immutable

  this lets us store every past version of 'squares'
  array and navigate between turns that already happened

  we will store past 'squares' arrays in one array 
  called 'history'(history represents all board states, 
  from first to the last move)

            history = [
              // before first move
              {squares: squares1},
              // after first move
              {squares: squares2},
              // after second move
              ...
            ])

  *** which component should own history? the Game --
  -- placing history state in Game compon lets us remove
  the 'squares' state from its child, Board compon. --
  -- just like we "lifted state up" from Square into Board
  compon we will lift it up from the Board into the top-
  level Game compon --
  -- then the Game compon has full control over Board's 
  data and the Game can instruct Board to render 
  previous turns from 'history'    

  1. we set up initial state for the Game compon in its
    constructor
  2. we make Board compon receive squares and onClick props
    from the Game compon

    A.  Delete constructor in Board
    B.  Replace this.state.squares[i] with 
        this.props.squares[i]
    C.  Replace this.handleClick(i) with
        this.props.onClick(i) in Board's 
        renderSquare
  3. Since Game compon is now rendering game's status,
    we refactor Board's render method by removing
    corresponding code. 

  DONE: 
    1 thru 3 above, --
    -- Game compon's render updated to use the most recent
    history entry to determine and display the game's
    status,

  TODO:
    learn more about shouldComponentUpdate() and 
    how you can build 'pure components'

  COOL:
    unlike array push() method, concat() doesn't
    mutate original array
      
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
  /* 
    Board no longer keeps track of state,
    [] squares and handleClick moved to Game
  */
  
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)
        /* 
          moved [] squares and handleClick to Game
        */}
      />
    );
  }

  render() {
    /*
      removed code that renders game status since Game
      compon is now rendering game status
    */
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      /* 
        initial state for the Game compon created
      */
    };
  }

  handleClick(i) {
    /* 
      after getting the most recent Board state 
      from history,
      -- determines if a new state will be created and
      updates xIsNext /concatenates updated 'squares' 
      to history,
      -- otherwise ignores the click
    */
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
    /*
      uses the most recent history entry to
      determine and display the game's status
    */
    const history = this.state.history;
    const current = history[history.length - 1]
    const winner = calculateWinner(current.squares)
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
            onClick={(i) => this.handleClick(i)
            /* 
              Board now has a squares prop and an 
              onClick prop.
            */}
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

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
  