//libraries
import { useEffect, useState } from "react";

import { Route } from "react-router-dom";
import Bobverlay from "./Bobverlay";
import { useStopwatch } from "react-timer-hook";
//Game Components
import CardContainer from "./CardContainer";
import CurrentScore from "./CurrentScore";
// import { handleFlip } from "./GameLogic";
import HighScores from "./HighScores";
import History from "./History";
import Sidebar from "./Sidebar";

function Game() {
  //variables
  const backend = "http://localhost:3001";

  //state

  //timer state
  const [calledTimerValue, setCalledTimerValue] = useState("unset");

  // current gamestate
  const [flipped, setFlipped] = useState(null);
  const [matched, setMatched] = useState(null);
  const [movesCount, setMovesCount] = useState(0);
  const [newGame, setNewGame] = useState(false);
  const [shuffledDeck, setShuffledDeck] = useState(null);

  //scoring
  const [highScores, setHighScores] = useState(null);
  const [userHistory, setUserHistory] = useState(null);

  //overlay state
  const [isOpen, setIsOpen] = useState(false);

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

  //select and load decks
  const [decks, setDecks] = useState(null);
  const [deckId, setDeckId] = useState(0);

  // timer hook
  const { seconds, minutes, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  function handleTimerValueSet() {
    let totalTime = minutes * 60 + seconds;
    setCalledTimerValue(totalTime);
  }

  //GAME LOGIC

  //shuffle the cards before handing to component because React hates conditionally calling hooks (and you can't shuffle until the deck is available)

  function shuffleDeck(deckToShuffle) {
    let shuffledCards = [...deckToShuffle, ...deckToShuffle]; //duplicates the deck
    // https://www.w3docs.com/snippets/javascript/how-to-randomize-shuffle-a-javascript-array.html
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [
        shuffledCards[j],
        shuffledCards[i],
      ];
    }
    return shuffledCards;
  }

  useEffect(() => {
    if (decks !== null && deckId !== null) {
      let singleDeck = decks[deckId];
      setShuffledDeck([...shuffleDeck(singleDeck.cards)]);
      console.log({ shuffledDeck });
    }
  }, [newGame]);

  /*
    flipping
        adds one to number of moves
        adds cards to an array.
    check on array length of 2 for equality.
        if equal
            add score
            add to matched array
        if unequal
          remove from array */

  function handleFlip(cardClickEvent) {
    console.log({ cardClickEvent });
    setMovesCount(movesCount + 1);
    console.log({ movesCount });
    return null;
  }

  return (
    <div>
      <div className="sidebar">
        <Sidebar
          CurrentScore={CurrentScore}
          minutes={minutes}
          newGame={newGame}
          setNewGame={setNewGame}
          seconds={seconds}
          movesCount={movesCount}
        />
      </div>
      <div className="mainWindow">
        <Route exact path="/">
          {decks ? (
            <CardContainer
              decks={decks}
              deckId={deckId}
              flipped={flipped}
              handleFlip={handleFlip}
              setFlipped={setFlipped}
              matched={matched}
              setMatched={setMatched}
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
            handleTimerValueSet={handleTimerValueSet}
            start={start}
            pause={pause}
            reset={reset}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            calledTimerValue={calledTimerValue}
          />
        </Route>
      </div>
    </div>
  );
}

export default Game;
