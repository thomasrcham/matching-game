import { useState, useEffect } from "react";

function Card({ card, cardBack, flipped, handleFlip, setName, matched }) {
  const [amIFlipped, setAmIFlipped] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    console.log("a card was clicked")
    if (flipped !== []) {
      // if (flipped.filter(card.flippedid) ) {
      //   console.log(`found card id ${card.flippedid}in flipped array`)
      // }
      let checkIfFlipped = flipped.find((flippedElement) => {
        if (flippedElement === card.flippedid) {
          setAmIFlipped(true);
        }
      });
      console.log({ checkIfFlipped });
    }
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
