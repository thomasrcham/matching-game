import "./App.css";
import { useEffect, useState } from "react";
import Card from "./Card";
import Header from "./Header";
import Sidebar from "./Sidebar";

function App() {
  const [cards, setCards] = useState(null);

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
    </div>
  );
}

export default App;
