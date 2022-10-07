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

  // check to see if something is in the matched/flipped array
  // two function calls (matched || flipped)
  // if in arrays --> display card face image, disable eventhandler
  // if not in arrays --> display card back image

  // useEffect(() => {
  //   const inArray = () => {
  //     console.log({flippedArray})
  //     if(flippedArray === undefined ) {
  //       return null
  //     }
  //     let flippedCard = flippedArray.filter((flippedElement) => {
  //       return flippedElement == card.flippedId ? setFlipped(true) : setFlipped(false);
  //     })
  //     console.log({flippedCard})
  //   }
  //   let x = inArray()
  //     console.log(x)
  // }, [flippedArray])
  // console.log({card, matchedArray, flippedArray})

  if (matchedArray && matchedArray.includes(card.flippedid.toString(10))) {
    flipped = true;
  }

  if (flippedArray && flippedArray.includes(card.flippedid.toString(10))) {
    console.log("something");
    flipped = true;
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
