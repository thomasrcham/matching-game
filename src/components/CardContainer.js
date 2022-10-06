import Card from "./Card.js";

function CardContainer({
  decks,
  deckId,
  flippedArray,
  handleFlip,
  matchedArray,
  newGame,
  shuffledDeck,
}) {
  if (shuffledDeck === null) {
    return null; //if the deck isn't populated, do not populate the tableau with cards
  }

  // let handleFlippedArray = [...flippedArray, ...matchedArray];
  // console.log(handleFlippedArray);

  let tableauCards = shuffledDeck.map((card, index) => (
    <Card
      key={`tableau${deckId}${index}`} //fix this later TODO
      card={card}
      setName={decks[deckId].setName}
      cardBack={decks[deckId].cardBack}
      flippedArray={flippedArray}
      handleFlip={handleFlip}
    />
  ));

  return <div className="displayWrapper">{tableauCards}</div>;
}

export default CardContainer;
