
import Game from "../components/TicTacToe/Game";

const Index = () => {
  return (
    <div className="min-h-screen bg-game-background flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md">
        <Game />
      </div>
    </div>
  );
};

export default Index;
