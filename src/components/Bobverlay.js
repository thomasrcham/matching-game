import "@blueprintjs/core/lib/css/blueprint.css";
import { Overlay, Classes, Button } from "@blueprintjs/core";

import { NavLink } from "react-router-dom";
// import MyStopwatch from "./Stopwatch";

function Bobverlay({
  start,
  pause,
  reset,
  handleTimerValueSet,
  setIsOpen,
  isOpen,
  minutes,
  movesCount,
  seconds,
}) {
  return (
    <>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button
        onClick={() => {
          reset();
          pause();
        }}
      >
        Reset
      </button>
      <button onClick={handleTimerValueSet}>log score</button>
      <div
        style={{
          display: "block",
          width: 400,
          padding: 30,
        }}
      >
        <h4>ReactJS Blueprint Overlay Component</h4>

        <Button
          onClick={() => {
            setIsOpen(true);
            handleTimerValueSet();
          }}
        >
          Toggle Overlay
        </Button>

        <Overlay className={Classes.OVERLAY_SCROLL_CONTAINER} isOpen={isOpen}>
          <div className="overlay">
            <p>Great Job!!</p>
            <p>
              Time: {minutes}:{seconds}
            </p>
            <p>Matches Attempted: {Math.floor(movesCount / 2)}</p>
            <p>Final Score: 3994</p>
            <NavLink to="/">
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                New Game!
              </button>
            </NavLink>
            <NavLink to="/highScores">
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                See High Scores
              </button>
            </NavLink>
            <NavLink to="/History">
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                See Previous Scores
              </button>
            </NavLink>
          </div>
        </Overlay>
      </div>
    </>
  );
}

export default Bobverlay;
