import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import CardContainer from "./CardContainer";
import HighScores from "./HighScores";
import History from "./History";
import { BrowserRouter, Route } from "react-router-dom";
import CurrentScore from "./CurrentScore";
import Bobverlay from "./Bobverlay";
import { useStopwatch } from "react-timer-hook"

function Game() {
    //variables
    const backend = "http://localhost:3001";

    //state

    //select and load decks
    const [decks, setDecks] = useState(null);
    const [deckId, setDeckId] = useState(0);

    // current gamestate
    const [matched, setMatched] = useState(null);
    //scoring
    const [highScores, setHighScores] = useState(null);
    const [userHistory, setUserHistory] = useState(null);


    const { seconds, minutes, isRunning, start, pause, reset } = useStopwatch({
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

    function handleTimerToScore() {
        let totalTime = minutes * 60 + seconds
        console.log(totalTime)
      }
    

    return (
        <div>
            <div className="sidebar">
                <Sidebar CurrentScore={CurrentScore} seconds={seconds} minutes={minutes}/>
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
                    <Bobverlay handleTimerToScore={handleTimerToScore} start={start} pause={pause} reset={reset}/>
                </Route>
            </div>
        </div>
    );
}
export default Game;
