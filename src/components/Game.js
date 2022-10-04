//libraries
import { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Bobverlay from "./Bobverlay";
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

    //select and load decks
    const [decks, setDecks] = useState(null);
    const [deckId, setDeckId] = useState(0);

    // current gamestate
    const [flipped, setFlipped] = useState(null);
    const [matched, setMatched] = useState(null);
    const [movesCount, setMovesCount] = useState(0);

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

    //game logic

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
        console.log({ cardClickEvent })
        setMovesCount(movesCount + 1);
        console.log({ movesCount });
        return null;
    }



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
