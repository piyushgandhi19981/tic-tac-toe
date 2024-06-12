import { useState } from "react";

const WINNING_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const getWinningCombinations = (length) => {
  const patterns = [];
  const pattern3 = [];
  const pattern4 = [];
  for (let i = 0; i < length; i++) {
    const pattern1 = [];
    const pattern2 = [];
    for (let j = 0; j < length; j++) {
      pattern1.push(j + i * length);
      pattern2.push(i + j * length);
      if (i === 0) {
        pattern3.push(i + j * length + j);
      }
      if (i === length - 1) {
        pattern4.push(j * length + i - j);
      }
    }
    patterns.push(pattern1);
    patterns.push(pattern2);
  }
  patterns.push(pattern3);
  patterns.push(pattern4);
  return patterns;
};

const useCalculateWinner = ({ length }) => {
  const [board, setBoard] = useState(Array(length * length).fill(null));
  const [isNextX, setIsNextX] = useState(true);

  const winningCombinations = getWinningCombinations(length);

  const calculateWinner = () => {
    for (let i = 0; i < winningCombinations.length; i++) {
      const args = winningCombinations[i];

      const firstElement = board[args[0]];

      let j = 1;
      let isWinner = false;

      if (firstElement) {
        while (!isWinner && firstElement === board[args[j]]) {
          j++;
          if (j === length) {
            isWinner = true;
          }
        }
      }
      if (isWinner) return firstElement;
    }

    return null;
  };

  const handleClick = (index) => {
    const winner = calculateWinner(board);
    if (winner || board[index]) return;
    const value = isNextX ? "X" : "O";
    const newBoard = [...board];
    newBoard[index] = value;
    setBoard(newBoard);
    setIsNextX((prevState) => !prevState);
  };

  const getStatusMessage = () => {
    const winner = calculateWinner(board);
    if (winner) return `Player ${winner} wins`;
    if (!board.includes(null)) return `It's a draw`;
    if (isNextX) return `Player X turn`;
    return `Player O turn`;
  };

  const resetGame = () => {
    setBoard(Array(length * length).fill(null));
    setIsNextX(true);
  };

  return {
    board,
    handleClick,
    resetGame,
    getStatusMessage,
    calculateWinner,
  };
};

export default useCalculateWinner;
