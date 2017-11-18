import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// React Components:
// Game - The main component for Tic-Tac-Toe
// Board - a Game component has one Board
// Square - a Board has 9 Square components

// SQUARE Component
function Square(props) {
  // When the square component is rendered, it will receive the props value and onClick from Board.renderSquare()
  // When the square component is clicked, it will call the function that was pass from renderSquare "handleClick()"
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// BOARD Component
class Board extends React.Component {

  // Each square is rendered as a Square component while passing value and onClick
  renderSquare(i) {
    return <Square
              value={this.props.squares[i]}
              onClick={() => this.props.onClick(i)} />;
  }

  render() {
    // const history = this.props.history; // Receive history from Game
    // const current = history[history.length - 1]; // Last move in the history will be the current state of Square
    // const winner = calculateWinner(current.squares); // If a winner has been found in the last move
    

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

// GAME Component
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  // When the square component is clicked, this is the function that is called
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1); // Receive game's history based on stepNumber
    const current = history[history.length-1]; // Last move in the history will be the current state
    const squares = current.squares.slice();
    // If the square has already been clicked or a winner has been declared
    if (squares[i] || calculateWinner(squares)) {
      return; // Return and do nothing
    }
    // Otherwise, let the player click the square
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history; // Receive history from Game
    const current = history[this.state.stepNumber]; // Last move in the history will be the current state of Square
    const winner = calculateWinner(current.squares); // If a winner has been found in the last move

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
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

// ========================================
// Renders the Game component to an HTML element with an id of root
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);



// Declare a winner
function calculateWinner(squares) {
  // Winning combinations
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

    // If 3 connected squares (a, b, c) are equal
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
