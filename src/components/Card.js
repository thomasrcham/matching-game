import { useState, useEffect } from "react";

function Card({ card, cardBack, flipped, handleFlip, setName, matched }) {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    console.log("a card was clicked")
  }, [clicked]);



  return <img
    className="card"
    cardid={card.id} //adds card value to event for handleflip
    flippedid={card.flippedid} //adds card id to event for handleflip
    src={clicked ? card.image : cardBack}
    alt={card.alt}
    onClick={(event) => {
      handleFlip(event);
      setClicked(!clicked);
    }}
  />

}
export default Card;
