import "./Card.css";

function Card(props) {
  const card = props.card;
  const onClick = props.onClick;

  function handleClick() {
    onClick(card.id);
  }

  let buttonClassName = "card-btn";
  if (card.isMatched) {
    buttonClassName = "card-btn card-btn--matched";
  }

  let content;

  if (card.isFlipped || card.isMatched) {
    let faceContent;

    if (card.type === "bonus-life") {
      faceContent = (
        <span className="card-bonus-label">+1</span>
      );
    } else {
      faceContent = (
        <img src={card.imageUrl} alt={card.type} />
      );
    }

    content = (
      <div className="card-face">
        {faceContent}
      </div>
    );
  } else {
    content = (
      <div className="card-back">
        <img src="/match-it/question.png"/>
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={card.isMatched}
      className={buttonClassName}
    >
      {content}
    </button>
  );
}

export default Card;
