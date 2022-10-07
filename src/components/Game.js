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
import HighScores from "./HighScores";
import History from "./History";
import Sidebar from "./Sidebar";

function Game() {
  //variables
  const backend = "http://localhost:3001";

  // STATE

  // state for generating and tracking score
  const [score, setScore] = useState(0);

  // current gamestate
  const [flippedArray, setFlippedArray] = useState([]);
  const [matchedArray, setMatchedArray] = useState([]);
  const [checkMatch, setCheckMatch] = useState([]);
  const [matchesCount, setMatchesCount] = useState(0);
  const [movesCount, setMovesCount] = useState(0);
  const [newGame, setNewGame] = useState(false);
  const [shuffledDeck, setShuffledDeck] = useState(null);

  //d isplays for other pages
  const [highScores, setHighScores] = useState(null);
  const [userHistory, setUserHistory] = useState(null);
  const [userHighScoreSuccess, setUserHighScoreSuccess] = useState(null);

  // overlay state
  const [isOpen, setIsOpen] = useState(false);

  //select and load decks
  const [decks, setDecks] = useState(null);
  const [deckId, setDeckId] = useState(1);

  // timer hook
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

  //GAME LOGIC

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
    let clickedCardId = cardClickEvent.target.attributes.cardid.value;
    let clickedCardFlippedId = cardClickEvent.target.attributes.flippedid.value;

    // adds one to the number of moves
    setMovesCount(movesCount + 1);

    let newFlippedCardsArray = [...flippedArray, clickedCardFlippedId];
    setFlippedArray(newFlippedCardsArray);
    let newCheckCardsArray = [...checkMatch, clickedCardId];
    setCheckMatch(newCheckCardsArray);
  }

  function handleMatch() {
    let totalTime = minutes * 60 + seconds;
    let newScore = 100 * totalTime + score;
    setScore(newScore);
    setMatchesCount(matchesCount + 1);
  }

  useEffect(() => {
    if (checkMatch.length === 2) {
      if (
        checkMatch[checkMatch.length - 1] === checkMatch[checkMatch.length - 2]
      ) {
        let newMatched = [...matchedArray, ...flippedArray];
        setMatchedArray(newMatched);
        handleMatch();
        setTimeout(() => setFlippedArray([]), 400);
        setTimeout(() => setCheckMatch([]), 400);
      } else {
        setTimeout(() => setFlippedArray([]), 400);
        setTimeout(() => setCheckMatch([]), 400);
      }
    }
  }, [movesCount]);

  useEffect(() => {
    if (shuffledDeck !== null) {
      if (shuffledDeck.length === matchedArray.length) {
        endGame();
      }
    }
  }, [matchedArray]);

  //function to call when end of game is called

  function newGameStart() {
    reset();
    start();
    setFlippedArray([]);
    setMatchedArray([]);
    setCheckMatch([]);
    setScore(0);
    setMatchesCount(0);
    setMovesCount(0);
  }

  function checkScores(endScore) {
    let sortedScores = highScores.sort((a, b) => {
      return a.score - b.score;
    });
    let scoreComparisonArray = sortedScores.map((entry) => entry.score);
    if (endScore <= [scoreComparisonArray[scoreComparisonArray.length - 1]]) {
      setUserHighScoreSuccess(true);
    }
  }

  function submitHighScore(e) {
    e.preventDefault();
    let newHighScore = {
      user: e.target.name.value,
      score: score,
    };
    fetch(`${backend}/highScores`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newHighScore),
    })
      .then((r) => r.json())
      .then((d) => {
        const addToHighScores = [...highScores, d];
        setHighScores(addToHighScores);
      });
  }

  const highScoreDisplay = (
    <div>
      {userHighScoreSuccess ? (
        <p>
          You've achieved one of the <br />
          best scores ever! <br />
          Please enter your name below:
          <div style={{ padding: 5 }}>
            <form onSubmit={(e) => submitHighScore(e)}>
              <input type="text" placeholder="Your Name" name="name"></input>
              <button>Enter</button>
            </form>
          </div>
        </p>
      ) : null}
    </div>
  );

  function endGame() {
    checkScores(score);
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
      score: score,
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
      <div className="overlay-container">
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
            {highScoreDisplay}
            <p>
              Time: {minutes}:{seconds <= 9 ? "0" + seconds : seconds}
            </p>
            <p>Matches Attempted: {Math.floor(movesCount / 2)}</p>
            <p>Final Score: {score}</p>
            <NavLink to="/">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setNewGame(!newGame);
                  newGameStart();
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

            <div className="credits">
              <p>Credits:</p>
              <ul>
                <li>
                  <a href="https://github.com/thomasrcham">Reese Chamberlain</a>
                </li>
                <li>
                  <a href="https://github.com/pikeminnow">Ashton MacKenzie</a>
                </li>
                <li>
                  <a href="https://github.com/dbrown13"> Deryn Brown</a>
                </li>
              </ul>
            </div>
          </div>
        </Overlay>
      </div>
      <div className="sidebar">
        <Sidebar
          endGame={endGame}
          matchesCount={matchesCount}
          minutes={minutes}
          movesCount={movesCount}
          newGame={newGame}
          newGameStart={newGameStart}
          score={score}
          seconds={seconds}
          setNewGame={setNewGame}
          setDeckId={setDeckId}
          decks={decks}
          deckId={deckId}
        />
      </div>
      <div className="mainWindow">
        <Route exact path="/">
          {decks ? (
            <CardContainer
              decks={decks}
              deckId={deckId}
              flippedArray={flippedArray}
              handleFlip={handleFlip}
              matchedArray={matchedArray}
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
      </div>
    </div>
  );
}

export default Game;
