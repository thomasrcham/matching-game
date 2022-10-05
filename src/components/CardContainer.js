import Card from "./Card.js";

function CardContainer({ decks, deckId, flipped, handleFlip, setFlipped, matched, setMatched, newGame, shuffledDeck }) {

  if (shuffledDeck === null) {
    return null; //if the deck isn't populated, do not populate the tableau with cards
  }


  let tableauCards = shuffledDeck.map((card, index) => (

    <Card
      key={`tableau${deckId}${index}`} //fix this later TODO
      card={card}
      cardBack={decks[deckId].cardBack}
      handleFlip={handleFlip}
      flipped={flipped}
      matched={matched}
      setFlipped={setFlipped}
      setName={decks[deckId].setName}
    />
  ));


  return <div className="displayWrapper">{tableauCards}</div>;

}

export default CardContainer;
