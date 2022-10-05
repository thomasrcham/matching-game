import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import CreditOverlay from "./CreditOverlay";

function Sidebar({ minutes, newGame, seconds, setNewGame, CreditOverlay }) {
  const [dropDown, setDropDown] = useState(false);

  function handleDropDown() {
    setDropDown((dropDown) => !dropDown);
  }


  return (
    <div className="sidebarComponent">
      <div className="sidebar div top">
        <button onClick={() => {
          setNewGame(!newGame)
        }}> New Game </button>
        <NavLink to="/">
          <button> Existing Game </button>
        </NavLink>
        <NavLink to="/HighScores">
          <button> Best Scores</button>
        </NavLink>
        <NavLink to="/History">
          <button> History</button>
        </NavLink>
        <NavLink to="/Bobverlay">
          <button> Overlay Testing</button>
        </NavLink>
      </div>
      <div className="sidebar div middle">
        <h3>
          Current Score:
          <br /> 2449
        </h3>
        <h3>
          Successful Matches:
          <br /> 3
        </h3>
        <h3>
          Moves Remaining:
          <br /> 17
        </h3>
        <h3 className="timer">
          Timer: <br /> {minutes}:{seconds <= 9 ? "0" + seconds : seconds}
        </h3>
      </div>
      <div className="dd-wrapper">
        <div className="dd-header">
          <div className="dd-header-title"></div>
        </div>
        {dropDown ? (
          <div className="dd-list">
            <button onClick={handleDropDown} id="choose-theme-button">
              Choose a Theme!
            </button>
            <button id="halloween-button" className="dd-list-item">
              Halloween
            </button>
            <button id="leaves-button" className="dd-list-item">
              Autumn Leaves
            </button>
            <button id="harvest-button" className="dd-list-item">
              Harvest
            </button>
            <button id="surprise-me" className="dd-list-item">
              SURPRISE ME!
            </button>
          </div>
        ) : (
          <div className="dd-closed">
            <button onClick={handleDropDown} className="dd">
              Choose a Theme!
            </button>
          </div>
        )}
      </div>
      <div>
        <NavLink to="/CreditsOverlay">
          <button onClick={() => CreditOverlay()}> Credits</button>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
