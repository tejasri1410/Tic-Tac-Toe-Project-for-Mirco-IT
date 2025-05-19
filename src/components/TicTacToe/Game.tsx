
import { useState, useEffect } from "react";
import Board from "./Board";
import ScoreBoard from "./ScoreBoard";
import { useToast } from "@/components/ui/use-toast";
import confetti from "./confetti";

// Sound effects
const clickSound = new Audio("/sounds/click.mp3");
const winSound = new Audio("/sounds/win.mp3");
const drawSound = new Audio("/sounds/draw.mp3");

type Player = "❌" | "⭕" | null;
type BoardState = Player[];

const Game = () => {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [scores, setScores] = useState({ x: 0, o: 0, ties: 0 });
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "draw">("playing");
  const [winningCells, setWinningCells] = useState<number[] | null>(null);
  const { toast } = useToast();

  const calculateWinner = (squares: BoardState): { winner: Player; line: number[] } | null => {
    const lines = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // diagonal top-left to bottom-right
      [2, 4, 6], // diagonal top-right to bottom-left
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    // Don't allow moves on filled squares or when game is over
    if (board[index] || gameStatus !== "playing") {
      return;
    }

    clickSound.play().catch(err => console.error("Failed to play sound:", err));

    const newBoard = [...board];
    newBoard[index] = isXNext ? "❌" : "⭕";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    // Check for winner
    const result = calculateWinner(newBoard);
    if (result) {
      setGameStatus("won");
      setWinningCells(result.line);
      const winner = result.winner === "❌" ? "X" : "O";
      
      // Update scores
      const newScores = { ...scores };
      if (winner === "X") newScores.x++;
      else newScores.o++;
      setScores(newScores);
      
      // Play win sound and show confetti
      winSound.play().catch(err => console.error("Failed to play sound:", err));
      confetti();
      
      toast({
        title: "Winner!",
        description: `Player ${winner} wins the game!`,
        variant: "default",
      });
    } else if (newBoard.every((square) => square !== null)) {
      // It's a draw
      setGameStatus("draw");
      const newScores = { ...scores };
      newScores.ties++;
      setScores(newScores);
      
      drawSound.play().catch(err => console.error("Failed to play sound:", err));
      
      toast({
        title: "It's a draw!",
        description: "The game ended in a tie.",
        variant: "default",
      });
    }
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameStatus("playing");
    setWinningCells(null);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold text-game-primary mb-2">Tic-Tac-Toe</h1>
      <ScoreBoard 
        scores={scores} 
        isXNext={isXNext} 
        gameStatus={gameStatus} 
      />
      <Board 
        squares={board} 
        onClick={handleClick} 
        winningCells={winningCells} 
      />
      <button
        onClick={restartGame}
        className="mt-4 bg-game-primary hover:bg-game-secondary text-white py-2 px-6 rounded-md transition-colors duration-200 font-medium"
      >
        Restart Game
      </button>
    </div>
  );
};

export default Game;
