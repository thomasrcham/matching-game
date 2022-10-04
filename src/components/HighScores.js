function HighScores({ highScoresArray }) {
  let sortedScoresArray = highScoresArray
    ? highScoresArray.sort((a, b) => {
        return b.score - a.score;
      })
    : null;

  let scoresToDisplay = sortedScoresArray.map((entry) => (
    <tr key={entry.score}>
      <td>{entry.user}</td>
      <td>{entry.score}</td>
    </tr>
  ));

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
