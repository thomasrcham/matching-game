import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import CardContainer from "./CardContainer";
import Card from "./Card";

function Game() {
    const [cards, setCards] = useState(null);
    const [cardSetID, setCardSetID] = useState(0);

    useEffect(() => {
        fetch("http://localhost:3001/cardSets")
            .then((r) => r.json())
            .then((d) => setCards(d));
    }, []);

    return (<div>
        <div className="sidebar">
            <Sidebar />
        </div>
        <div className="mainWindow">
            {cards ? <CardContainer set={cards[cardSetID]} /> : null}
        </div>
    </div>
    );
}
export default Game;
