// import "@blueprintjs/core/lib/css/blueprint.css";
// import { Overlay, Classes, Button } from "@blueprintjs/core";
// import Confetti from "react-confetti";
// import { NavLink } from "react-router-dom";

function Bobverlay({
  pause,
  handleTimerValueSet,
  setIsOpen,
  endGame,
  isOpen,
  minutes,
  movesCount,
  newGame,
  reset,
  seconds,
  setNewGame,
  start,
}) {
  //start testing buttons. will not be in final commit
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
      <div>
        <button onClick={endGame}>EndGame Test</button>
      </div>
      <div
        style={{
          display: "block",
          width: 400,
          padding: 30,
        }}
      >
        <h4>ReactJS Blueprint Overlay Component</h4>

        {/* <Button
          onClick={() => {
            setIsOpen(true);
            handleTimerValueSet();
          }}
        >
          Toggle Overlay
        </Button> */}
        {/* end testing buttons */}
        {/* create and display end of game overlay*/}
        {/* <Overlay
          className={Classes.OVERLAY_SCROLL_CONTAINER}
          isOpen={isOpen}
          hasBackdrop={false}
        >
          <Confetti
            width={window.innerWidth}
            gravity={0.1}
            numberOfPieces={1000}
            tweenDuration={10000}
          />

          <div className="overlay">
            <p>Great Job!!</p>
            <p>
              Time: {minutes}:{seconds <= 9 ? "0" + seconds : seconds}
            </p>
            <p>Matches Attempted: {Math.floor(movesCount / 2)}</p>
            <p>Final Score: "NEEDS FIXING"</p>
            <NavLink to="/">
              <button
                onClick={() => {
                  setIsOpen(false);
                  reset();
                  setNewGame(!newGame);
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
        </Overlay> */}
      </div>
    </>
  );
}

export default Bobverlay;
