import { useState, useEffect } from "react";

function Card({ card, cardBack, flipped, handleFlip, setName, matched }) {
  const [amIFlipped, setAmIFlipped] = useState(false);

  useEffect(() => {
    console.log("a card was clicked")
  }, [amIFlipped]);

  return <img
    className="card"
    cardid={card.id} //adds card value to event for handleflip
    flippedid={card.flippedid} //adds card id to event for handleflip
    src={amIFlipped ? card.image : cardBack}
    alt={card.alt}
    onClick={(event) => {
      handleFlip(event);
      setAmIFlipped(!amIFlipped);
    }}
  />

}
export default Card;
