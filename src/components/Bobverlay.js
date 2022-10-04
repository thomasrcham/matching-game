import { useState } from "react";
import "@blueprintjs/core/lib/css/blueprint.css";
import { Overlay, Classes, Button } from "@blueprintjs/core";

import { NavLink } from "react-router-dom";

function Bobverlay() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
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
          }}
        >
          Toggle Overlay
        </Button>

        <Overlay className={Classes.OVERLAY_SCROLL_CONTAINER} isOpen={isOpen}>
          <div className="overlay">
            <p>Great Job!!</p>
            <p>Time: 3m51</p>
            <p>Total Moves: 4</p>
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
            <NavLink to="/userHistory">
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
