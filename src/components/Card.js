import { useState } from "react";

function Card({ card, frontCard, setName }) {
  const [clicked, setClicked] = useState(false);

  return clicked ? (
    <img
      src={card.image}
      alt={card.alt}
      onClick={() => setClicked(false)}
      className="card"
    />
  ) : (
    <img
      src={frontCard}
      alt={setName}
      onClick={() => setClicked(true)}
      className="card"
    />
  );
}

export default Card;
