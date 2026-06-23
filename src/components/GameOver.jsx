import './GameOver.css';
import '../App.css';

function GameOver({ isWin, onNewGame }) {
  let title = "You lose!";
  let graphic = "/lose.png";

  if (isWin) {
    title = "You win!";
    graphic = "/star.png";
  }

  return (
    <div className="game-over">
      <img src="/bg1.png" className="bg" />

      <div className="game-over__content">
        <div className="game-over__graphic">
          <img src={graphic} alt="" />
        </div>

        <h1>{title}</h1>

        <button onClick={onNewGame} className="game-over__btn">
          new game
        </button>
      </div>
    </div>
  );
}

export default GameOver;
