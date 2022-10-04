import { useState, useEffect } from "react";

function Card({ card, cardBack, setName, matched }) {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    console.log("a card was clicked")
  }, [clicked]);



  return <img
    className="card"
    src={clicked ? card.image : cardBack}
    alt={card.alt}
    onClick={() => {
      setClicked(!clicked);
    }}
  />

}

export default Card;
