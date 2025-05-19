
import { useState } from "react";

interface SquareProps {
  value: string | null;
  onClick: () => void;
  isWinningSquare: boolean;
}

const Square = ({ value, onClick, isWinningSquare }: SquareProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Determine which classes to apply based on the value and if it's a winning square
  const getSquareClasses = () => {
    const baseClasses = "w-full h-20 text-4xl sm:h-24 sm:text-5xl rounded-md flex items-center justify-center transition-all cursor-pointer animate-pop";
    
    if (isWinningSquare) {
      return `${baseClasses} animate-winner ${value === "❌" ? "bg-game-x/20" : "bg-game-o/20"}`;
    }
    
    if (value) {
      return `${baseClasses} bg-game-cell shadow-md`;
    }
    
    if (isHovered) {
      return `${baseClasses} bg-game-hover`;
    }
    
    return `${baseClasses} bg-game-cell hover:bg-game-hover`;
  };
  
  const getValueClasses = () => {
    if (!value) return "";
    
    return value === "❌" 
      ? "text-game-x font-bold" 
      : "text-game-o font-bold";
  };

  return (
    <button
      className={getSquareClasses()}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Square ${value || "empty"}`}
    >
      <span className={getValueClasses()}>{value}</span>
    </button>
  );
};

export default Square;
