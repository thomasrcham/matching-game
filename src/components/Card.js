import { useState, useEffect } from "react";

function Card({ card, cardBack, displayArray, handleFlip }) {
  const [flipped, setFlipped] = useState(true);

  useEffect(() => {
    let check = displayArray.filter((id) => id === 4);
    console.log(check);
  }, [displayArray]);

  return (
    <img
      className="card"
      cardid={card.id} //adds card value to event for handleflip
      flippedid={card.flippedid} //adds card id to event for handleflip
      src={flipped ? card.image : cardBack}
      alt={card.alt}
      onClick={(event) => {
        handleFlip(event);
      }}
    />
  );
}

export default Card;
