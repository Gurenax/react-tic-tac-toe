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
    };
  }
  
  // When the square component is clicked, this is the function that is called
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  // Each square is rendered as a Square component while passing value and onClick
  renderSquare(i) {
    return <Square
              value={this.state.squares[i]}
              onClick={() => this.handleClick(i)} />;
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

