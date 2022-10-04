import React, { useState } from "react";
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";

function Sidebar() {
  const [dropDown, setDropDown] = useState(false);

  function handleDropDown() {
    setDropDown((dropDown) => !dropDown);
  }

  return (
    <div className="sidebarComponent">
      <div className="sidebar div top">
        <button> New Game </button>
        <NavLink to="/">
          <button> Existing Game </button>
        </NavLink>
        <NavLink to="/HighScores">
          <button> Best Scores</button>
        </NavLink>
        <NavLink to="/History">
          <button> History</button>
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
        <h3>
          Timer: <br /> 3:45
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
            <button id="misc-button" className="dd-list-item">
              Misc
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
    </div>
  );
}

export default Sidebar;
