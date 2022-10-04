//libraries
import { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Bobverlay from "./Bobverlay";
//Game Components
import CardContainer from "./CardContainer";
import CurrentScore from "./CurrentScore";
import { handleFlip } from "./GameLogic";
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
    const [matched, setMatched] = useState(null);
    const [flipped, setFlipped] = useState(null);

    //scoring
    const [highScores, setHighScores] = useState(null);
    const [userHistory, setUserHistory] = useState(null);



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

    return (
        <div>
            <div className="sidebar">
                <Sidebar CurrentScore={CurrentScore} />
            </div>
            <div className="mainWindow">
                <Route exact path="/">
                    {decks ? (
                        <CardContainer
                            deck={decks[deckId]}
                            flipped={flipped}
                            handleFlip={handleFlip}
                            setFlipped={setFlipped}
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
                    <Bobverlay />
                </Route>
            </div>
        </div>
    );
}
export default Game;
