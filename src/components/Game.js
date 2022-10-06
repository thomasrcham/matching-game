//libraries
import { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Bobverlay from "./Bobverlay";
import { useStopwatch } from "react-timer-hook";
//Game Components
import CardContainer from "./CardContainer";
import CurrentScore from "./CurrentScore";
import HighScores from "./HighScores";
import History from "./History";
import Sidebar from "./Sidebar";

function Game() {
  //variables
  const backend = "http://localhost:3001";

  //state

  //select and load decks
  const [decks, setDecks] = useState(null);
  const [deckId, setDeckId] = useState(0);

  // current gamestate
  const [flippedArray, setFlippedArray] = useState([]);
  const [matchedArray, setMatchedArray] = useState([]);
  const [movesCount, setMovesCount] = useState(0);
  const [newGame, setNewGame] = useState(false);
  const [shuffledDeck, setShuffledDeck] = useState(null);

  //scoring
  const [highScores, setHighScores] = useState(null);
  const [userHistory, setUserHistory] = useState(null);

  const { seconds, minutes, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  // side effects
  useEffect(() => {
    fetch(`${backend}/highScores`)
      .then((r) => r.json())
      .then((d) => setHighScores(d));
  }, []);

  useEffect(() => {
    fetch(`${backend}/cardSets`)
      .then((r) => r.json())
      .then((d) => setDecks(d));
  }, []);

  useEffect(() => {
    fetch(`${backend}/userHistory`)
      .then((r) => r.json())
      .then((d) => setUserHistory(d));
  }, []);

  //game logic

  function handleTimerToScore() {
    let totalTime = minutes * 60 + seconds;
    console.log(totalTime);
  }

  //shuffle the cards before handing to component because React hates conditionally calling hooks (and you can't shuffle until the deck is available)

  function handleDeckShuffle(deckToShuffle) {
    //duplicates the deck with a shallow copy
    let dupedCards = [...deckToShuffle, ...deckToShuffle];

    //duplicates the deck using json parsing + stringify to force a deeper copy
    let clonedArray = dupedCards.map((card) => {
      let newCardElement = JSON.parse(JSON.stringify(card));
      return newCardElement;
    });
    let cardsToShuffle = clonedArray.map((card, index) => {
      card.flippedid = index;
      return card;
    });
    //end duplicating

    // https://www.w3docs.com/snippets/javascript/how-to-randomize-shuffle-a-javascript-array.html
    for (let i = cardsToShuffle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardsToShuffle[i], cardsToShuffle[j]] = [
        cardsToShuffle[j],
        cardsToShuffle[i],
      ];
    }
    setShuffledDeck(cardsToShuffle);
  }

  useEffect(() => {
    if (decks !== null && deckId !== null) {
      let deckOfCards = decks[deckId].cards;
      handleDeckShuffle(deckOfCards);
    }
  }, [newGame]);

  /**
   *-flipping
   *    - adds one to number of moves // done
   *     - check for array length of 2
   *    - adds cards to the flipped state array
   *- once it is 2, check for equality.
   *    - if equal
   *        - add score
   *        - add to matched array and removed from flipped array
   *    - if unequal
   *        - remove from flipped array
   *        - after some period of time, the cards need to unflip
   * @param {cardClickEvent} [event] the actual parameter - event generated from clicking on a card
   * @param {array} [flipped] state affected - lists cards that are currently flipped
   * @param {array} [matched] state affected - lists successful matches
   */
  function handleFlip(cardClickEvent) {
    console.log({ cardClickEvent });
    let clickedCardId = cardClickEvent.target.attributes.cardid.value;
    let clickedCardFlippedId = cardClickEvent.target.attributes.flippedid.value;

    // adds one to the number of moves
    setMovesCount(movesCount + 1);

    //check to see if the flipped state array has two elements in it
    // if (flippedArray.length <= 1) {
    //   console.log(`flipped length: ${flippedArray.length}`);
    // setFlipped([])

    //adds card to the flipped state array
    let newFlippedCardsArray = [...flippedArray, clickedCardId];
    setFlippedArray(newFlippedCardsArray);
  }
  useEffect(() => {
    if (flippedArray.length % 2 === 0) {
      if (
        flippedArray[flippedArray.length - 1] ===
        flippedArray[flippedArray.length - 2]
      ) {
        let newMatched = [...matchedArray, ...flippedArray];
        setMatchedArray(newMatched);
        setTimeout(() => setFlippedArray([]), 1000);
      } else {
        setTimeout(() => setFlippedArray([]), 1000);
      }
    }
  }, [movesCount]);

  return (
    <div>
      <div className="sidebar">
        <Sidebar
          CurrentScore={CurrentScore}
          minutes={minutes}
          newGame={newGame}
          setNewGame={setNewGame}
          seconds={seconds}
        />
      </div>
      <div className="mainWindow">
        <Route exact path="/">
          {decks ? (
            <CardContainer
              decks={decks}
              deckId={deckId}
              flipped={flippedArray}
              handleFlip={handleFlip}
              matched={matchedArray}
              newGame={newGame}
              shuffledDeck={shuffledDeck}
            />
          ) : null}
        </Route>
        <Route path="/HighScores">
          {highScores ? <HighScores highScoresArray={highScores} /> : null}
        </Route>
        <Route path="/History">
          {userHistory ? <History userHistory={userHistory} /> : null}
        </Route>
        <Route path="/Bobverlay">
          <Bobverlay
            handleTimerToScore={handleTimerToScore}
            start={start}
            pause={pause}
            reset={reset}
          />
        </Route>
      </div>
    </div>
  );
}
export default Game;
