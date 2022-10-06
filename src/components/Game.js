//libraries
import { useEffect, useState } from "react";
import "@blueprintjs/core/lib/css/blueprint.css";
import { Overlay, Classes } from "@blueprintjs/core";
import Confetti from "react-confetti";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import { useStopwatch } from "react-timer-hook";
//Game Components
import CardContainer from "./CardContainer";
import CurrentScore from "./CurrentScore";
// import { handleFlip } from "./GameLogic";
import HighScores from "./HighScores";
import History from "./History";
import Sidebar from "./Sidebar";

// import Bobverlay from "./Bobverlay";

function Game() {
  //variables
  const backend = "http://localhost:3001";

  // STATE

  // will be used to calculate score
  const [calledTimerValue, setCalledTimerValue] = useState("unset");

  // current gamestate
  const [flipped, setFlipped] = useState(null);
  const [matched, setMatched] = useState(null);
  const [movesCount, setMovesCount] = useState(0);
  const [newGame, setNewGame] = useState(false);
  const [shuffledDeck, setShuffledDeck] = useState(null);

  //d isplays for other pages
  const [highScores, setHighScores] = useState(null);
  const [userHistory, setUserHistory] = useState(null);

  // overlay state
  const [isOpen, setIsOpen] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(true);

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
  const [deckId, setDeckId] = useState(1);

  // timer hook
  const { seconds, minutes, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  //handle timer for scoring

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
  }, [newGame, deckId]);

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

  //function to call when end of game is called

  function endGame() {
    //open overlay
    setIsOpen(true);
    //stop timer
    pause();
    //*****NEEDS WORK: check score versus high score
    //create new user history object, add to db.json, display in userHistory
    let newUserHistoryObj = {
      moves: movesCount,
      timer: {
        minutes: minutes,
        seconds: seconds,
      },
      score: "{USERSCORE-DOES-NOT-EXIST}",
      dateTime: new Date().toLocaleString() + "",
    };
    fetch(`${backend}/userHistory`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newUserHistoryObj),
    })
      .then((r) => r.json())
      .then((d) => {
        const addToUserHistory = [...userHistory, d];
        setUserHistory(addToUserHistory);
      });
  }

  return (
    <div>
      <div classname="overlay-container">
        <Overlay
          className={Classes.OVERLAY_SCROLL_CONTAINER}
          isOpen={isOpen}
          hasBackdrop={false}
        >
          <Confetti
            width={window.innerWidth}
            gravity={0.1}
            numberOfPieces={1000}
            tweenDuration={10000}
          />

          <div className="overlay">
            <p>Great Job!!</p>
            <p>
              Time: {minutes}:{seconds <= 9 ? "0" + seconds : seconds}
            </p>
            <p>Matches Attempted: {Math.floor(movesCount / 2)}</p>
            <p>Final Score: "NEEDS FIXING"</p>
            <NavLink to="/">
              <button
                onClick={() => {
                  setIsOpen(false);
                  reset();
                  setNewGame(!newGame);
                }}
              >
                New Game!
              </button>
            </NavLink>
            <NavLink to="/highScores">
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                See High Scores
              </button>
            </NavLink>
            <NavLink to="/History">
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                See Previous Scores
              </button>
            </NavLink>
          </div>
        </Overlay>
      </div>
      <div className="sidebar">
        <Sidebar
          CurrentScore={CurrentScore}
          endGame={endGame}
          minutes={minutes}
          movesCount={movesCount}
          newGame={newGame}
          reset={reset}
          setNewGame={setNewGame}
          seconds={seconds}
          creditsOpen={creditsOpen}
          setCreditsOpen={setCreditsOpen}
          deckId={deckId}
          setDeckId={setDeckId} 
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
        {/* <Route path="/Bobverlay">
          <Bobverlay
            handleTimerValueSet={handleTimerValueSet}
            start={start}
            pause={pause}
            reset={reset}
            setIsOpen={setIsOpen}
            backend={backend}
            endGame={endGame}
            isOpen={isOpen}
            minutes={minutes}
            movesCount={movesCount}
            newGame={newGame}
            seconds={seconds}
            setNewGame={setNewGame}
          />

        </Route> */}
      </div>
    </div>
  );
}

export default Game;
