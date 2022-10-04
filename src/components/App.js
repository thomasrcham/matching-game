import "./App.css";
import { useEffect, useState } from "react";
import Header from "./Header";
import Game from "./Game";

function App() {
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
