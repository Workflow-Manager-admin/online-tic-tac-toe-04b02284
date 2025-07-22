import React, { useState } from 'react';

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  // Check for winner
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  // Check if board is full (draw)
  const isBoardFull = (squares) => {
    return squares.every(square => square !== null);
  };

  // Handle cell click
  const handleClick = (i) => {
    const squares = [...board];
    
    // Return if cell is filled or game is won
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setBoard(squares);
    
    const winner = calculateWinner(squares);
    if (winner) {
      setScores(prev => ({
        ...prev,
        [winner]: prev[winner] + 1
      }));
    }
    
    setXIsNext(!xIsNext);
  };

  // Reset game board
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  // Reset scores
  const resetScores = () => {
    setScores({ X: 0, O: 0 });
    resetGame();
  };

  // Game status message
  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : isBoardFull(board)
    ? "Game Draw!"
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game-container">
      <div className="score-board">
        <div>Player X: {scores.X}</div>
        <div>Player O: {scores.O}</div>
      </div>

      <div className="status">{status}</div>

      <div className="board">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`cell ${cell?.toLowerCase() || ''}`}
            onClick={() => handleClick(index)}
            disabled={cell !== null || winner !== null}
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="game-actions">
        <button className="btn btn-primary" onClick={resetGame}>
          New Game
        </button>
        <button className="btn btn-accent" onClick={resetScores}>
          Reset Scores
        </button>
      </div>
    </div>
  );
};

export default Game;
