function HighScores({ highScoresArray }) {
  //sorts high scores into ascending order
  let sortedScoresArray = highScoresArray
    ? highScoresArray.sort((a, b) => {
        return a.score - b.score;
      })
    : null;
  //creates display for high scores table

  let scoresToDisplay = sortedScoresArray.map((entry) => (
    <tr key={entry.score}>
      <td>{entry.user}</td>
      <td>{entry.score}</td>
    </tr>
  ));
  //displays high scores
  return (
    <div className="dataDisplay">
      <h1>Best Scores!</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>{scoresToDisplay}</tbody>
      </table>
    </div>
  );
}

export default HighScores;
