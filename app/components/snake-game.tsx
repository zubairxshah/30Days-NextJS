"use client"; // Enables client-side rendering for this component

import { useState, useEffect, useCallback, useRef } from "react"; // Import React hooks
import { Button } from "@/components/ui/button"; // Import custom Button component
import { PauseIcon, PlayIcon, RefreshCcwIcon, HelpCircleIcon } from "lucide-react"; // Import icons from lucide-react

// Define the possible game states
enum GameState {
  START,
  PAUSE,
  RUNNING,
  GAME_OVER,
}

// Define the directions for the snake movement
enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

// Define the Position interface
interface Position {
  x: number;
  y: number;
}

// Initial state for the snake and food
const initialSnake: Position[] = [{ x: 0, y: 0 }];
const initialFood: Position = { x: 5, y: 5 };


export default function SnakeGame() {
  // State to manage the game
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [snake, setSnake] = useState<Position[]>(initialSnake);
  const [food, setFood] = useState<Position>(initialFood);
  const [direction, setDirection] = useState<Direction>(Direction.RIGHT);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const gameInterval = useRef<NodeJS.Timeout | null>(null);
  const gameBoardRef = useRef<HTMLDivElement>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  
  //Arrow key page lock


  // Function to move the snake
  const moveSnake = useCallback(() => {
    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = newSnake[0];
      let newHead: Position;

      switch (direction) {
        case Direction.UP:
          newHead = { x: head.x, y: head.y - 1 };
          break;
        case Direction.DOWN:
          newHead = { x: head.x, y: head.y + 1 };
          break;
        case Direction.LEFT:
          newHead = { x: head.x - 1, y: head.y };
          break;
        case Direction.RIGHT:
          newHead = { x: head.x + 1, y: head.y };
          break;
        default:
          return newSnake;
      }

      newSnake.unshift(newHead);

      if (newHead.x === food.x && newHead.y === food.y) {
        // Snake eats the food
        setFood({
          x: Math.floor(Math.random() * 10),
          y: Math.floor(Math.random() * 10),
        });
        setScore((prevScore) => prevScore + 1);
      } else {
        newSnake.pop(); // Remove the last part of the snake's body
      }

      return newSnake;
    });
  }, [direction, food]);

  // Function to handle key press events
  const handleKeyPress = useCallback(
  (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowUp":
        if (direction !== Direction.DOWN) setDirection(Direction.UP);
        break;
      case "ArrowDown":
        if (direction !== Direction.UP) setDirection(Direction.DOWN);
        break;
      case "ArrowLeft":
        if (direction !== Direction.RIGHT) setDirection(Direction.LEFT);
        break;
      case "ArrowRight":
        if (direction !== Direction.LEFT) setDirection(Direction.RIGHT);
        break;
    }
  },
  [direction]
);


  // useEffect to handle the game interval and key press events
  useEffect(() => {
    if (gameState === GameState.RUNNING) {
      gameInterval.current = setInterval(moveSnake, 200);
    } else {
      if (gameInterval.current) clearInterval(gameInterval.current);
    }
  
    return () => {
      if (gameInterval.current) clearInterval(gameInterval.current);
    };
  }, [gameState, moveSnake]);
  
  // How to play directions
  const HowToPlay = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1E1E1E] p-6 rounded-lg max-w-md">
        <h2 className="text-2xl font-bold text-[#FF00FF] mb-4">How to Play Snake</h2>
        <ul className="list-disc list-inside text-[#00FFFF] space-y-2">
          <li>Use arrow keys to control the snake&apos;s direction</li>
          <li>Eat the green food to grow and increase your score</li>
          <li>Avoid running into the walls or your own tail</li>
          <li>Try to achieve the highest score possible!</li>
        </ul>
        <Button 
          onClick={onClose}
          className="mt-6 bg-[#FF00FF] text-white hover:bg-[#CC00CC]"
        >
          Close
        </Button>
      </div>
    </div>
  );
  

  // Function to start the game
const startGame = () => {
  setSnake(initialSnake);
  setFood(initialFood);
  setScore(0);
  setDirection(Direction.RIGHT);
  setGameState(GameState.RUNNING);
  // Focus the game board
  if (gameBoardRef.current) {
    gameBoardRef.current.focus();
  }
};

  

  // Function to pause or resume the game
  const pauseGame = () => {
    setGameState(
      gameState === GameState.RUNNING ? GameState.PAUSE : GameState.RUNNING
    );
  };

  // Function to reset the game
  const resetGame = () => {
    setGameState(GameState.START);
    setSnake(initialSnake);
    setFood(initialFood);
    setScore(0);
  };

  // useEffect to update the high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  // JSX return statement rendering the Snake Game UI
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#0F0F0F] to-[#1E1E1E]">
      <div className="bg-[#1E1E1E] rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <div className="text-2xl font-bold text-[#FF00FF]">Snake Game</div>
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#00FFFF]"
              onClick={startGame}
            >
              <PlayIcon className="w-6 h-6" />
              <span className="sr-only">Start</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#00FFFF]"
              onClick={pauseGame}
            >
              <PauseIcon className="w-6 h-6" />
              <span className="sr-only">Pause/Resume</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#00FFFF]"
              onClick={resetGame}
            >
              <RefreshCcwIcon className="w-6 h-6" />
              <span className="sr-only">Reset</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#00FFFF]"
              onClick={() => setShowInstructions(true)}
            >
              <HelpCircleIcon className="w-6 h-6" />
              <span className="sr-only">How to Play</span>
            </Button>
          </div>
        </div>
        <div 
  ref={gameBoardRef}
  tabIndex={0}
  className="bg-[#0F0F0F] rounded-lg p-4 grid grid-cols-10 gap-1 focus:outline-none"
  onKeyDown={handleKeyPress}
>
  {Array.from({ length: 100 }).map((_, i) => {
    const x = i % 10;
    const y = Math.floor(i / 10);
    const isSnakePart = snake.some(
      (part) => part.x === x && part.y === y
    );
    const isFood = food.x === x && food.y === y;
    return (
      <div
        key={i}
        className={`w-5 h-5 rounded-sm ${
          isSnakePart
            ? "bg-[#FF00FF]"
            : isFood
            ? "bg-[#00FFFF]"
            : "bg-[#1E1E1E]"
        }`}
      />
    );
  })}
</div>

        <div className="flex items-center justify-between mt-6 text-[#00FFFF]">
          <div>Score: {score}</div>
          <div>High Score: {highScore}</div>
        </div>
        {showInstructions && (
        <HowToPlay onClose={() => setShowInstructions(false)} />
      )}
      </div>
    </div>
  );
}