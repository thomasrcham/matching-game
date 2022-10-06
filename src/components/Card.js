import { useState, useEffect } from "react";

function Card({ card, cardBack, flippedArray, handleFlip, setName, matched }) {
  const [flipped, setFlipped] = useState(true);

  // useEffect(() => {
  //   if (flippedArray.contains(card.flippedid)) {
  //     console.log(card.flippedid + "is flipped");
  //   }
  // }, [flippedArray]);

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
