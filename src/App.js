import { useState } from "react";
import useCalculateWinner from "./hooks/useCalculateWinner";
import "./styles.css";

const LENGTH = 4;

export default function App() {
  const { board, handleClick, getStatusMessage, resetGame } =
    useCalculateWinner({ length: LENGTH });

  return (
    <div style={{ "--length": LENGTH }} className="App">
      <div className="info">
        {getStatusMessage()}
        <button onClick={resetGame}>Reset</button>
      </div>
      <div className="game-board">
        {board.map((cell, index) => {
          return (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className="board-button"
            >
              {cell}
            </button>
          );
        })}
      </div>
    </div>
  );
}
