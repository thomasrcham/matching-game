import Card from "./Card.js";

function CardContainer({ deck, cardsID, matched, setMatched }) {

  if (!deck) {
    return null; //if the deck isn't populated, do not populate the tableau with cards
  }

  function shuffleDeck(arrDeck) {
    // https://www.w3docs.com/snippets/javascript/how-to-randomize-shuffle-a-javascript-array.html

    arrDeck = [...arrDeck.cards, ...arrDeck.cards];
    for (let i = arrDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrDeck[i], arrDeck[j]] = [arrDeck[j], arrDeck[i]];
    }
    return arrDeck;
  }


  let shuffledCards = shuffleDeck(deck);

  let tableauCards = shuffledCards.map((card, index) => (

    <Card
      key={`tableau${deck.cards.id}${index}`} //fix this later
      card={card}
      setName={deck.setName}
      cardBack={deck.cardBack}
      matched={matched}
    />
  ));


  return <div className="displayWrapper">{tableauCards}</div>;

}

export default CardContainer;
