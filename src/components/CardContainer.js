import Card from "./Card.js";
import { useEffect, useState } from "react";

function CardContainer({ set, cardsID }) {
  let cardArray = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3];
  const [cardSet, setCardSet] = useState(null);
  const [flippedOne, setFlippedOne] = useState(null);
  const [flippedTwo, setFlippedTwo] = useState(null);
  const [matched, setMatched] = useState(null);

  function flipOne(id) {
    setFlippedOne(id);
  }
  function flipTwo(id) {
    setFlippedOne(id);
    compareFlipped();
  }

  function compareFlipped() {
    flippedOne === flippedTwo ? console.log("true") : console.log("false");
  }

  function handleFlippedCard(id) {
    flippedOne ? flipTwo(id) : flipOne(id);
  }

  let arrayCards = set
    ? cardArray.map((id) => (
        <Card
          card={set.cards[id]}
          setName={set.setName}
          frontCard={set.frontCard}
          handleFlippedCard={handleFlippedCard}
          matched={matched}
        />
      ))
    : null;

  // let displayCards = set
  //   ? set.cards.map((card) => (
  //       <td>
  //         <Card
  //           card={card}
  //           setName={set.setName}
  //           frontCard={set.frontCard}
  //           key={card.alt + card.id}
  //         />
  //       </td>
  //     ))
  //   : null;

  return <div className="displayWrapper">{arrayCards}</div>;
  // return null;
}

export default CardContainer;
