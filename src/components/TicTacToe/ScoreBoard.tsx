
interface ScoreBoardProps {
  scores: { x: number; o: number; ties: number };
  isXNext: boolean;
  gameStatus: "playing" | "won" | "draw";
}

const ScoreBoard = ({ scores, isXNext, gameStatus }: ScoreBoardProps) => {
  const renderStatus = () => {
    if (gameStatus === "won") {
      return (
        <div className="text-xl font-semibold">
          Winner: <span className={!isXNext ? "text-game-x" : "text-game-o"}>
            {!isXNext ? "Player ❌" : "Player ⭕"}
          </span>
        </div>
      );
    } else if (gameStatus === "draw") {
      return <div className="text-xl font-semibold">It's a draw!</div>;
    } else {
      return (
        <div className="text-xl font-semibold">
          Next player: <span className={isXNext ? "text-game-x" : "text-game-o"}>
            {isXNext ? "❌" : "⭕"}
          </span>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2 w-full max-w-xs">
      {/* Game status */}
      <div className="mb-4">{renderStatus()}</div>
      
      {/* Score cards */}
      <div className="grid grid-cols-3 gap-4 w-full">
        <div className="bg-game-x/10 p-3 rounded-md text-center">
          <div className="text-game-x text-xl font-bold">❌</div>
          <div className="text-xl font-semibold">{scores.x}</div>
        </div>
        
        <div className="bg-gray-100 p-3 rounded-md text-center">
          <div className="text-gray-600 text-xl font-bold">Ties</div>
          <div className="text-xl font-semibold">{scores.ties}</div>
        </div>
        
        <div className="bg-game-o/10 p-3 rounded-md text-center">
          <div className="text-game-o text-xl font-bold">⭕</div>
          <div className="text-xl font-semibold">{scores.o}</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
