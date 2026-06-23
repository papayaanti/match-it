import { useState } from 'react';
import GameMenu from './components/GameMenu.jsx';
import GameBoard from './components/GameBoard.jsx';
import GameOver from './components/GameOver.jsx';
import { PixelBackground } from './components/PixelBackground.jsx';
import './App.css';
import './index.css';

function App() {
  const [gameState, setGameState] = useState('menu');
  const [difficulty, setDifficulty] = useState('easy');
  const [tileMode, setTileMode] = useState('potions');

  const handleStartGame = (selectedDifficulty, selectedTileMode) => {
    setDifficulty(selectedDifficulty);
    setTileMode(selectedTileMode);
    setGameState('playing');
  };

  const handleGameWin = () => setGameState('win');
  const handleGameLose = () => setGameState('lose');
  const handleNewGame = () => setGameState('menu');

  return (
    <div className="app-root">
      <PixelBackground />
      {gameState === 'menu' && (
        <GameMenu onStartGame={handleStartGame} />
      )}
      {gameState === 'playing' && (
        <GameBoard
          difficulty={difficulty}
          tileMode={tileMode}
          onWin={handleGameWin}
          onLose={handleGameLose}
        />
      )}
      {(gameState === 'win' || gameState === 'lose') && (
        <GameOver
          isWin={gameState === 'win'}
          onNewGame={handleNewGame}
        />
      )}
    </div>
  );
}

export default App;
