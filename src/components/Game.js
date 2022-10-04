import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import CardContainer from "./CardContainer";
import HighScores from "./HighScores";
import History from "./History";
import { Route } from "react-router-dom";
import CurrentScore from "./CurrentScore";
import Bobverlay from "./Bobverlay";
import { useStopwatch } from "react-timer-hook";

function Game() {
  //variables
  const backend = "http://localhost:3001";

  //state

  //timer state
  const [calledTimerValue, setCalledTimerValue] = useState("unset");

  //overlay state
  const [isOpen, setIsOpen] = useState(false);

  //select and load decks
  const [decks, setDecks] = useState(null);
  const [deckId, setDeckId] = useState(0);

  // current gamestate
  const [matched, setMatched] = useState(null);
  //scoring
  const [highScores, setHighScores] = useState(null);
  const [userHistory, setUserHistory] = useState(null);

  // timer hook
  const { seconds, minutes, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

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

  function handleTimerValueSet() {
    let totalTime = minutes * 60 + seconds;
    setCalledTimerValue(totalTime);
  }

  return (
    <div>
      <div className="sidebar">
        <Sidebar
          CurrentScore={CurrentScore}
          seconds={seconds}
          minutes={minutes}
        />
      </div>
      <div className="mainWindow">
        <Route exact path="/">
          {decks ? (
            <CardContainer
              deck={decks[deckId]}
              matched={matched}
              setMatched={setMatched}
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
