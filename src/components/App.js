import "./App.css";
import { useEffect, useState } from "react";
import Card from "./Card";
import Header from "./Header";
import Sidebar from "./Sidebar";
import CardContainer from "./CardContainer";

function App() {
  const [cards, setCards] = useState(null);
  const [cardSetID, setCardSetID] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3001/cardSets")
      .then((r) => r.json())
      .then((d) => setCards(d));
  }, []);

  return (
    <div className="App">
      <header className="header">
        <Header />
      </header>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="mainWindow">
        {cards ? <CardContainer set={cards[cardSetID]} /> : null}
      </div>
    </div>
  );
}

export default App;
