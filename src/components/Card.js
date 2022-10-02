function Card({ cardSets }) {
  let thing = cardSets[0].frontCard;
  console.log({ thing });
  return <img src={thing} alt={cardSets[0].setName} />;
}

export default Card;
