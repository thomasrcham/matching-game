function History({ userHistory }) {
  //creates display of historical games
  let historyToDisplay = userHistory.map((entry) => (
    <tr key={entry.id}>
      <td>{entry.dateTime}</td>
      <td>{entry.score}</td>
      <td>{entry.moves}</td>
      <td>
        {entry.timer.minutes}:{entry.timer.seconds}
      </td>
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
            <th># of Moves</th>
            <th>Timer</th>
          </tr>
        </thead>
        <tbody>{historyToDisplay}</tbody>
      </table>
    </div>
  );
}

export default History;
