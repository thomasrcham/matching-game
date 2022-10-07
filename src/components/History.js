function History({ userHistory }) {
  //creates display of historical games
  let historyToDisplay = userHistory.map((entry) => (
    <tr key={entry.id}>
      <td>{entry.dateTime}</td>
      <td>{entry.score}</td>
      {/* <td>{entry.moves}</td> */}
      <td>{Math.floor(entry.moves / 2)}</td>
      <td>
        {entry.timer.minutes}:
        {entry.timer.seconds <= 9
          ? "0" + entry.timer.seconds
          : entry.timer.seconds}
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
            <th>Matches Attempted</th>
            <th>Timer</th>
          </tr>
        </thead>
        <tbody>{historyToDisplay}</tbody>
      </table>
    </div>
  );
}

export default History;
