import Card from "./Card.js";
import { useEffect, useState } from "react";

function CardContainer({ deck, cardsID }) {
  let cardArray = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3];
  const [flippedOne, setFlippedOne] = useState(null);
  const [flippedTwo, setFlippedTwo] = useState(null);
  const [matched, setMatched] = useState(null);

  function flipOne(id) {
    setFlippedOne(id);
  }
  function flipTwo(id) {
    setFlippedTwo(id);
    compareFlipped();
  }

  function compareFlipped() {
    flippedOne === flippedTwo ? console.log("true") : console.log("false");
  }

  function handleFlippedCard(id) {
    flippedOne ? flipTwo(id) : flipOne(id);
  }

  let arrayCards = deck
    ? cardArray.map((id) => (
      <Card
        card={deck.cards[id]}
        setName={deck.setName}
        frontCard={deck.frontCard}
        handleFlippedCard={handleFlippedCard}
        matched={matched}
      />
    ))
    : null;


  return <div className="displayWrapper">{arrayCards}</div>;

}

export default CardContainer;
