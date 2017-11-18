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
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
  
  // When the square component is clicked, this is the function that is called
  handleClick(i) {
    const squares = this.state.squares.slice();
    // if (squares[i]===null) {
    
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
    // }
  }

  // Each square is rendered as a Square component while passing value and onClick
  renderSquare(i) {
    return <Square
              value={this.state.squares[i]}
              onClick={() => this.handleClick(i)} />;
  }

  render() {
    const winner = calculateWinner(this.state.squares);
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

// GAME Component
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
