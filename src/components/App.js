import "./App.css";
import { useEffect, useState } from "react";
import Header from "./Header";
import Game from "./Game";

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
      <Game />
    </div>
  );
}

export default App;
