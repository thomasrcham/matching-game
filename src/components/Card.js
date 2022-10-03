import { useState, useEffect } from "react";

function Card({ card, frontCard, setName, handleFlippedCard, matched }) {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setTimeout(setClicked(false), 1000);
  }, [matched]);

  return clicked ? (
    <img
      className="card"
      src={card.image}
      alt={card.alt}
      onClick={() => {
        handleFlippedCard(card.id);
        setClicked(false);
      }}
    />
  ) : (
    <img
      className="card"
      src={frontCard}
      alt={setName}
      onClick={() => {
        handleFlippedCard(card.id);
        setClicked(true);
      }}
    />
  );
}

export default Card;
