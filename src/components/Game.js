import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import CardContainer from "./CardContainer";
import HighScores from "./HighScores";
import History from "./History";
import { BrowserRouter, Route } from "react-router-dom";
import CurrentScore from "./CurrentScore";

function Game() {
    const backend = "http://localhost:3001";
    const [decks, setDecks] = useState(null);
    const [deckId, setDeckId] = useState(0);
    const [matched, setMatched] = useState(null);


    useEffect(() => {
        fetch(`${backend}/cardSets`)
            .then((r) => r.json())
            .then((d) => setDecks(d))
    }, []);

    return (<div>
        <div className="sidebar">
            <Sidebar CurrentScore={CurrentScore} />
        </div>
        <div className="mainWindow">
            <Route exact path="/">
                {decks ? <CardContainer
                    deck={decks[deckId]}
                    matched={matched}
                    setMatched={setMatched} /> : null}
            </Route>
            <Route path="/HighScores">
                <HighScores />
            </Route>
            <Route path="/History">
                <History />
            </Route>
        </div>
    </div>
    );
}
export default Game;
