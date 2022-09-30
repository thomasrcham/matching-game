import logo from "../logo.svg";
import pumpkinImg1 from "../images/pumpkins/pumpkins-1.png";
import "./App.css";
import { useEffect, useState } from "react";
import Card from "./Card";

function App() {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/cardSets")
      .then((r) => r.json())
      .then((d) => setCards(d));
  }, []);
  // console.log(cards);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {cards ? <Card cardSets={cards} /> : null}
      </header>
    </div>
  );
}

export default App;
