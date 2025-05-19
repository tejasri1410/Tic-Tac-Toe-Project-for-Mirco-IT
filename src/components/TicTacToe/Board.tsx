
import Square from "./Square";

interface BoardProps {
  squares: (string | null)[];
  onClick: (index: number) => void;
  winningCells: number[] | null;
}

const Board = ({ squares, onClick, winningCells }: BoardProps) => {
  const renderSquare = (i: number) => {
    const isWinningSquare = winningCells?.includes(i) || false;
    
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinningSquare={isWinningSquare}
        key={i}
      />
    );
  };

  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-xs sm:max-w-sm">
      {Array(9)
        .fill(null)
        .map((_, i) => renderSquare(i))}
    </div>
  );
};

export default Board;
