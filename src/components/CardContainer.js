import Card from "./Card.js";
import { useEffect, useState } from "react";

function CardContainer({ set, cardsID }) {
  let cardArray = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3];
  const [table, setTable] = useState([]);

  let arrayCards = set
    ? cardArray.map((id) => (
        <Card
          card={set.cards[id]}
          setName={set.setName}
          frontCard={set.frontCard}
          key={set.cards[id]}
        />
      ))
    : null;

  console.log(table);

  let displayCards = set
    ? set.cards.map((card) => (
        <td>
          <Card
            card={card}
            setName={set.setName}
            frontCard={set.frontCard}
            key={card.id}
          />
        </td>
      ))
    : null;

  return <div className="displayWrapper">{arrayCards}</div>;
  // return null;
}

export default CardContainer;
