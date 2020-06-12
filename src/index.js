import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/* Implementing Time Travel:

  1. In Game's render, we add the key as <li key={move}>
    Then react's key warning should dissapear

  2. we add stepNumber to the Game compon's state to indicate
    which step we're currently viewing, initialize to 0

  3. we define the jumpTo method in Game to update that 
    stepNumber. --
    -- We also set xIsNext to true if number we're changing
    stepNumber to is even

  4. we make these changes to handleCLick:

    a- 'stepNumber' state should reflects the most recent 
      move made so we need to update 'stepNumber' by setting
      stepNumber: history.length in this.setState

    b- we also replace reading this.state.history with
      this.state.history.slice(0, this.state.stepNumber + 1)

      -- this ensures that if we "go back in time" and then
        make a new move from that point, we throw away all
        "future" history that had been saved since then 
        (because this history would now be incorrect) --

  5- finally we modify Game compon's render method from always
    rendering the last move to rendering the currently 
    selected move according to 'stepNumber'

  *** Now if we click on any step in the game history, the 
  board should update to show what the board looked like
  after that step occurred!
 ____________________________________________________________
  DONE:
    pick keys for mapped history list of moves in
    Game render (and silence the warning)

    implement jumpTo() in Game compon

  TODO:
    learn more about shouldComponentUpdate() and 
    how you can build 'pure components'

  COOL:
    on Compon. keys:
    -- 'key' is a special and reserved property in React 
      (along with 'ref', a more advanced feature). When an 
      element is created, React extracts the key property and
      stores the key directly on the returned element. --
    -- Even though key may look like it belongs in props, 
      key cannot be referenced using this.props.key. --
    -- React automatically uses key to decide which 
      components to update. --
    -- A component cannot inquire about its key. --
    -- it is strongly recommended that you assign proper keys
      whenever building dynamic lists since React is a 
      computer program and doesn't know how to arrange items 
      in the list as we intended --
    -- we need to specify key property for each list item to
      differentiate each list item from its siblings --
    -- If no key is specified, React will present a warning 
      and use the array index as a key by default.

    unlike array push() method, concat() doesn't
    mutate original array

    in JS, arrays have a map() method that is used for 
    mapping data to other data, for example
        const numbers = [1, 2, 3];
        const doubled = numbers.map(x => x * 2); // [2, 4, 6]
    
    in React elements are first-class JS objects --
    -- we can pass them around in our applications --
    -- we can use an array of React elements to render
      multiple items

    in JS, all functions are first-class objects. Meaning:
    -- A function is an instance of the Object type --
    -- A function can have properties and has a link 
      back to its constructor method --
    -- You can store the function in a variable --
    -- You can pass the function as a parameter 
      to another function --
    -- You can return the function from a function
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
      stepNumber: 0, /*2.*/
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, 
      this.state.stepNumber + 1); /* 
        4b.
        Copy from 0 to stepNumber + 1
        if we go back, all incorrect "future" history will 
        be discarded
      */
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X':'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length, /*4a.*/
      xIsNext: !this.state.xIsNext,
    }); 
  }
  jumpTo(step) { /*3.*/
    this.setState({
      stepNumber: step, 
      xIsNext: (step % 2) === 0,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber]; /*5.*/
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move/*1.*/}>
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
          <ol>{moves}</ol>
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
  