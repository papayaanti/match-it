import { useState, useEffect } from 'react';
import Card from './Card';
import './GameBoard.css';
import '../App.css';

const potionCardTypes = [
  { type: 'red-potion', imageUrl: '/match-it/redpotion.png' },
  { type: 'black-potion', imageUrl: '/match-it/blackpotion.png' },
  { type: 'green-potion', imageUrl: '/match-it/greenpotion.png' },
  { type: 'orange-potion', imageUrl: '/match-it/orangepotion.png' },
  { type: 'purple-potion', imageUrl: '/match-it/purplepotion.png' },
];

const gemCardTypes = [
  { type: 'red-gem', imageUrl: '/match-it/redgem.png' },
  { type: 'blue-gem', imageUrl: '/match-it/bluegem.png' },
  { type: 'purple-gem', imageUrl: '/match-it/purplegem.png' },
  { type: 'green-gem', imageUrl: '/match-it/greengem.png' },
  { type: 'yellow-gem', imageUrl: '/match-it/yellowgem.png' },
];

const DIFFICULTY = {
  easy: { lives: 'infinite', pairs: 5, pattern: [2, 3, 3, 2], specials: false },
  medium: { lives: 5, pairs: 5, pattern: [2, 3, 3, 2], specials: false },
  hard: { lives: 3, pairs: 4, pattern: [3, 3, 3, 2], specials: true },
};

const TILE_MODES = {
  gems: gemCardTypes,
  potions: potionCardTypes,
};

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildRows(cards, pattern) {
  let index = 0;
  return pattern.map(count => {
    const row = cards.slice(index, index + count);
    index += count;
    return row;
  });
}

function GameBoard({ difficulty, tileMode, onWin, onLose }) {
  const config = DIFFICULTY[difficulty];
  const cardTypes = TILE_MODES[tileMode];

  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [lives, setLives] = useState(config.lives);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    let id = 0;
    const pairs = [];

    for (let i = 0; i < config.pairs; i++) {
      const type = cardTypes[i];
      pairs.push(
        { id: id++, ...type, isFlipped: false, isMatched: false },
        { id: id++, ...type, isFlipped: false, isMatched: false }
      );
    }

    if (config.specials) {
      pairs.push(
        { id: id++, type: 'lightning', imageUrl: '/match-it/thunder.png', isFlipped: false, isMatched: false },
        { id: id++, type: 'lightning', imageUrl: '/match-it/thunder.png', isFlipped: false, isMatched: false },
        { id: id++, type: 'bonus-life', imageUrl: '', isFlipped: false, isMatched: false }
      );
    }

    setCards(shuffleArray(pairs));
  }, [difficulty, tileMode]);

  useEffect(() => {
    if (cards.length === 0) return;

    const nonBonus = cards.filter(c => c.type !== 'bonus-life');
    const allMatched = nonBonus.every(c => c.isMatched);

    if (allMatched) {
      setTimeout(onWin, 500);
    }
  }, [cards]);

  useEffect(() => {
    if (lives !== 'infinite') {
      if (lives <= 0) {
        setTimeout(onLose, 500);
      }
    }
  }, [lives]);

  const handleCardClick = (clickedId) => {
  if (isChecking) return;
  if (flippedCards.length === 2) return;

  const clickedCard = cards.find(c => c.id === clickedId);
  if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

  if (clickedCard.type === "bonus-life") {
    setCards(prev =>
      prev.map(c => {
        if (c.id === clickedId) {
          return { ...c, isFlipped: true, isMatched: true };
        }
        return c;
      })
    );

    if (lives !== "infinite") {
      setLives(prev => prev + 1);
    }

    return;
  }

  const updatedCards = cards.map(c => {
    if (c.id === clickedId) {
      return { ...c, isFlipped: true };
    }
    return c;
  });

  setCards(updatedCards);

  const newFlipped = [...flippedCards, clickedId];
  setFlippedCards(newFlipped);

  if (newFlipped.length < 2) return;

  setIsChecking(true);

  const a = newFlipped[0];
  const b = newFlipped[1];

  const cardA = updatedCards.find(c => c.id === a);
  const cardB = updatedCards.find(c => c.id === b);

  let isMatch = false;
  if (cardA.type === cardB.type) {
    isMatch = true;
  }

  let delay = 1000;
  if (isMatch) {
    delay = 600;
  }

  setTimeout(() => {
    if (isMatch) {
      setCards(prev =>
        prev.map(c => {
          if (c.id === a || c.id === b) {
            return { ...c, isMatched: true };
          }
          return c;
        })
      );
    } else {
      setCards(prev =>
        prev.map(c => {
          if (c.id === a || c.id === b) {
            return { ...c, isFlipped: false };
          }
          return c;
        })
      );

      if (lives !== "infinite") {
        let penalty = 1;

        if (config.specials) {
          if (cardA.type === "lightning" || cardB.type === "lightning") {
            penalty = 2;
          }
        }

        setLives(prev => Math.max(0, prev - penalty));
      }
    }

    setFlippedCards([]);
    setIsChecking(false);
  }, delay);
};


  const rows = buildRows(cards, config.pattern);

  const backgrounds = {
  easy: "/match-it/bg4.png",
  medium: "/match-it/bg2.png",
  hard: "/match-it/bg3.png"
  };

  const backgroundImage = backgrounds[difficulty];


  return (
      <div className="game-board">
        <img src={backgroundImage} className='bg'/>
        <div className='oops'>
          <div className="game-board__header">
            <h1 className="game-board__title">Match it!</h1>
            <div className="game-board__stats">
              <p>mode: {difficulty}</p>
              <p>lives: {lives}</p>
            </div>
          </div>

          <div className="game-board__grid">
            {rows.map((row, i) => (
              <div key={i} className="game-board__row">
                {row.map(card => (
                  <Card key={card.id} card={card} onClick={handleCardClick} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}

export default GameBoard;
