import Card from "./Card.js";

function CardContainer({ decks, deckId, flipped, handleFlip, setFlipped, matched, setMatched, newGame, shuffledDeck }) {

  if (shuffledDeck === null) {
    return null; //if the deck isn't populated, do not populate the tableau with cards
  }


  let tableauCards = shuffledDeck.map((card, index) => (

    <Card
      key={`tableau${deckId}${index}`} //fix this later TODO
      card={card}
      setName={decks[deckId].setName}
      cardBack={decks[deckId].cardBack}
      matched={matched}
      flipped={flipped}
      handleFlip={handleFlip}
      setFlipped={setFlipped}
    />
  ));


  return <div className="displayWrapper">{tableauCards}</div>;

}

export default CardContainer;
