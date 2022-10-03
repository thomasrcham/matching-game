function Card({ cardSets, cardSetID }) {
  let thing = cardSets[0].frontCard;
  console.log({ thing });
  return (
  <div className="container">
    <img src={thing} alt={cardSets[0].setName} />
  </div>
  );
}

export default Card;
