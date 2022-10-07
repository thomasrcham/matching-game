import { useState } from "react";

function Card({ card, cardBack, displayArray, handleFlip }) {
  const [flipped, setFlipped] = useState(false);

  if (flipped === false) {
    if (displayArray.includes(card.flippedid.toString())) {
      setFlipped(true);
    } else {
    }
  }

  if (flipped === true) {
    if (displayArray.includes(card.flippedid.toString())) {
    } else {
      setFlipped(false);
    }
  }

  return (
    <img
      className="card"
      cardid={card.id} //adds card value to event for handleflip
      flippedid={card.flippedid} //adds card id to event for handleflip
      src={flipped ? card.image : cardBack}
      alt={card.alt}
      onClick={
        flipped
          ? null
          : (event) => {
              handleFlip(event);
            }
      }
    />
  );
}

export default Card;
