import { useState, useEffect } from "react";

function Card({ card, cardBack, setName, matched }) {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setTimeout(setClicked(false), 1000);
  }, [matched]); //?????

  return clicked ? (
    <img
      className="card"
      src={card.image}
      alt={card.alt}
      onClick={() => {
        setClicked(false);
      }}
    />
  ) : (
    <img
      className="card"
      src={cardBack}
      alt={setName}
      onClick={() => {
        setClicked(true);
      }}
    />
  );
}

export default Card;
