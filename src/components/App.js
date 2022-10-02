import logo from "../logo.svg";
import pumpkinImg1 from "../images/pumpkins/pumpkins-1.png";
import "./App.css";
import { useEffect, useState } from "react";
import Card from "./Card";
import Header from "./Header";

function App() {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/cardSets")
      .then((r) => r.json())
      .then((d) => setCards(d));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <Header />>{cards ? <Card cardSets={cards} /> : null}
      </header>
    </div>
  );
}

export default App;
