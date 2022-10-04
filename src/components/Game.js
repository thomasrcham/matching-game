import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import CardContainer from "./CardContainer";
import HighScores from "./HighScores";
import History from "./History";
import { BrowserRouter, Route } from "react-router-dom";

function Game() {
  const [cards, setCards] = useState(null);
  const [cardSetID, setCardSetID] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3001/cardSets")
      .then((r) => r.json())
      .then((d) => setCards(d));
  }, []);

  return (
    <div>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="mainWindow">
        <Route exact path="/">
          {cards ? <CardContainer set={cards[cardSetID]} /> : null}
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
