import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import CardContainer from "./CardContainer";
import HighScores from "./HighScores";
import History from "./History";
import { BrowserRouter, Route } from "react-router-dom";

function Game() {
  const [cards, setCards] = useState(null);
  const [cardSetID, setCardSetID] = useState(0);
  const [highScores, setHighScores] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/cardSets")
      .then((r) => r.json())
      .then((d) => setCards(d));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/highScores")
      .then((r) => r.json())
      .then((d) => setHighScores(d));
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
          {highScores ? <HighScores highScoresArray={highScores} /> : null}
        </Route>
        <Route path="/History">
          <History />
        </Route>
      </div>
    </div>
  );
}
export default Game;
