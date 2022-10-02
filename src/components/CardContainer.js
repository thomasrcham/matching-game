import Card from "./Card.js";
function CardContainer({ set, cardsID }) {
  console.log(set);
  let displayCards = set
    ? set.cards.map((card) => (
        <Card
          card={card}
          setName={set.setName}
          frontCard={set.frontCard}
          key={card.id}
        />
      ))
    : null;
  return <div className="cards">{displayCards}</div>;
  // return null;
}

export default CardContainer;
