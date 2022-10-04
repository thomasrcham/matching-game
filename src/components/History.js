function History({ userHistory }) {
  let historyToDisplay = userHistory.map((entry) => (
    <tr key={entry.id}>
      <td>{entry.user}</td>
      <td>{entry.dateTime}</td>
      <td>{entry.score}</td>
      <td>{entry.moves}</td>
      <td>{entry.timer}</td>
    </tr>
  ));

  return (
    <div className="dataDisplay">
      <h1>Previous Games</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
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
