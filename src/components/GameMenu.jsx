import { useState } from 'react';
import './GameMenu.css';
import '../App.css';

function GameMenu({ onStartGame }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [selectedTileMode, setSelectedTileMode] = useState('potions');

  const difficultyDescriptions = {
    easy: 'Infinite attempts, no punishments.',
    medium: '5 attempts.',
    hard: '3 attempts. If you select a lightning tile and fail to match it, you lose two attempts. If you select a heart tile, you gain one attempt.',
  };

  function getTileModeClass(mode) {
    let className = "game-menu__btn";
    if (selectedTileMode === mode) {
      className += " game-menu__btn--active";
    }
    return className;
  }

  function getDifficultyClass(level) {
    let className = "game-menu__btn";
    if (selectedDifficulty === level) {
      className += " game-menu__btn--active";
    }
    return className;
  }

  return (
      <div className="game-menu">
        <img src='/match-it/bg1.png' className='bg'/>
          <div className='oops'>
            <h1 className="game-menu__title">Match it!</h1>

            <div className="game-menu__panel">
              <p className="game-menu__section-label">choose your game mode:</p>

              <div className="game-menu__btn-row">
                <button
                  onClick={() => setSelectedTileMode('potions')}
                  className={getTileModeClass('potions')}
                >
                  <img src={'/match-it/redpotion.png'} alt=""/>
                  potions
                </button>

                <button
                  onClick={() => setSelectedTileMode('gems')}
                  className={getTileModeClass('gems')}
                >
                  <img src={'/match-it/bluegem.png'} alt="" />
                  gems
                </button>
              </div>

              <p className="game-menu__section-label mt-2pt5">choose your difficulty:</p>

              <div className="game-menu__btn-row">
                {['easy', 'medium', 'hard'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedDifficulty(level)}
                    className={getDifficultyClass(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>

              <p className="game-menu__description">
                {difficultyDescriptions[selectedDifficulty]}
              </p>
              <div className='forbuttonlol'>
                <button onClick={() => onStartGame(selectedDifficulty, selectedTileMode)} className="game-menu__btn">
                <img src={'/match-it/star.png'} alt=""/>
                start game
                </button>
              </div>
            </div>
          </div>
        </div>
  );
}

export default GameMenu;
