function History({ userHistory }) {
  //creates display of historical games
  let historyToDisplay = userHistory.map((entry) => (
    <tr key={entry.id}>
      <td>{entry.dateTime}</td>
      <td>{entry.score}</td>
      <td>{Math.floor(entry.moves / 2)}</td>
      <td>
        {entry.timer.minutes}:
        {entry.timer.seconds <= 9
          ? "0" + entry.timer.seconds
          : entry.timer.seconds}
      </td>
      <td>{entry.setName}</td>
    </tr>
  ));

  return (
    <div className="dataDisplay">
      <h1>Previous Games</h1>
      <table>
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Score</th>
            <th>Match Attempts</th>
            <th>Timer</th>
            <th>Set Used</th>
          </tr>
        </thead>
        <tbody>{historyToDisplay}</tbody>
      </table>
    </div>
  );
}

export default History;
