import "@blueprintjs/core/lib/css/blueprint.css";
import { Overlay, Classes, Button } from "@blueprintjs/core";
import { useStopwatch } from "react-timer-hook";

function MyStopwatch() {
  const { seconds, minutes, isRunning, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  function thing() {
    start();
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "100px" }}>
        <span>{minutes}</span>:
        <span>{seconds <= 9 ? "0" + seconds : seconds}</span>
      </div>
      <p>{isRunning ? "Running" : "Not running"}</p>
      <button onClick={thing}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default MyStopwatch;
