import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import CardContainer from "./CardContainer";
import CurrentScore from "./CurrentScore";

function Game() {
    const backend = "http://localhost:3001";
    const [cards, setCards] = useState(null);
    const [cardSetID, setCardSetID] = useState(0);
    const [matched, setMatched] = useState(null);


    useEffect(() => {
        fetch(`${backend}/cardSets`)
            .then((r) => r.json())
            .then((d) => setCards(d));
    }, []);

    return (<div>
        <div className="sidebar">
            <Sidebar CurrentScore={CurrentScore} />
        </div>
        <div className="mainWindow">
            {cards ? <CardContainer
                deck={cards[cardSetID]}
                matched={matched}
                setMatched={setMatched} /> : null}
        </div>
    </div>
    );
}
export default Game;
