import { useState, useEffect } from "react";

function Card({ card, cardBack, flipped, handleFlip, setName, matched }) {
  const [amIFlipped, setAmIFlipped] = useState(false); //unsure if I need to use state for this
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (flipped !== []) {
      // if (flipped.filter(card.flippedid) ) {
      //   console.log(`found card id ${card.flippedid}in flipped array`)
      // }

      let findCurrentCardInFlippedArray = flipped.filter((flippedElement) => {
        return flippedElement == card.flippedid;

      })

      findCurrentCardInFlippedArray.map((currentCard) => {
        console.log({ currentCard })
        console.log(`found card id ${card.flippedid}in flipped array`)
      })


      // let checkIfFlipped = flipped.find((flippedElement) => {
      //   if (flippedElement == card.flippedid) {
      //     setAmIFlipped(true);
      //     return true;
      //   }
      //   else {
      //     setAmIFlipped(false);
      //     return false;
      //   }

      // });
      // console.log({ checkIfFlipped });


    }
  }, [clicked]);



  return <img
    className="card"
    cardid={card.id} //adds card value to event for handleflip
    flippedid={card.flippedid} //adds card id to event for handleflip
    src={amIFlipped ? card.image : cardBack}
    alt={card.alt}
    onClick={(event) => {
      handleFlip(event);
      setClicked(!clicked);
    }}
  />

}
export default Card;
