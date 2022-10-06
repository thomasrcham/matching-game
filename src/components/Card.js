import { useState, useEffect } from "react";

function Card({ card, cardBack, flipped, handleFlip, setName, matched }) {

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    console.log("a card was clicked")
    if (flipped !== []) {
      // if (flipped.filter(card.flippedid) ) {
      //   console.log(`found card id ${card.flippedid}in flipped array`)
      // }
      let checkIfFlipped = flipped.find((flippedElement) => {
        if (flippedElement === card.flippedid) {
          setClicked(true);
        }
        else {
          setClicked(false);
        }
      });

      console.log({ checkIfFlipped });
    }
  }, [flipped]);



  return <img
    className="card"
    cardid={card.id} //adds card value to event for handleflip
    flippedid={card.flippedid} //adds card id to event for handleflip
    src={clicked ? card.image : cardBack}
    alt={card.alt}
    onClick={(event) => {
      handleFlip(event);
    }}
  />

}
export default Card;
