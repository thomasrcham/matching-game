function HighScores({ highScoresArray }) {
  let sortedScoresArray = highScoresArray
    ? highScoresArray.sort((a, b) => {
        return b.score - a.score;
      })
    : null;

  let scoresToDisplay = sortedScoresArray.map((entry) => (
    <tr>
      <td>{entry.user}</td>
      <td>{entry.score}</td>
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>{scoresToDisplay}</tbody>
    </table>
  );
}

export default HighScores;
