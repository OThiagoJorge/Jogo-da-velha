import React from "react";
import { useState } from "react";
import './App.css';

const Square = ({ value, onSquareClick }) => {
  return (
    <button 
      className="square"
      onClick={onSquareClick}
    >
      {value}  
    </button> 
  );
};

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(squares);
  
  let status;
  if (winner) {
    status = "Vencedor: " + winner;
  } else if (squares.every(square => square !== null)) {
    status = "Empate!";
  } else {
    status = "Próximo jogador: " + (xIsNext ? "X" : "O");
  }
  
  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }
  
  return (
    <div className="container">
      <h1>Jogo da Velha</h1>
      <div>
        <h2>{status}</h2>
      </div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div> 
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>        
    </div>
  );
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
};
const Game = () => {
  return (
    <>
      <div className="Board">
        <Board />
      </div>
      <div className="info">
        <ol></ol>
      </div>
    </>
  )
}

export default Game;