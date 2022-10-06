import { useState } from "react";
import { NavLink } from "react-router-dom";
import CreditOverlay from "./CreditOverlay";



function Sidebar({
  endGame,
  minutes,
  movesCount,
  newGame,
  seconds,
  setNewGame,
  start,
  reset,
  deckId,
  setDeckId
}) {
  //state and function for dropdown

  const [dropDown, setDropDown] = useState(false);

  function handleDropDown() {
    setDropDown((dropDown) => !dropDown);
  }


  function handleThemeClick(e) {
    setDeckId(parseInt(e.target.attributes.deckidnumber.nodeValue))
    setNewGame(!newGame)
  }

  return (
    <div className="sidebarComponent">
      <div className="sidebar div top">
        {/*top of sidebar, buttons for navigation*/}
        <NavLink to="/">
          <button
            onClick={() => {
              setNewGame(!newGame);
              reset();
              start();
            }}
          >
            {" "}
            New Game{" "}
          </button>
        </NavLink>
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
        <button onClick={endGame}>end</button>
      </div>
      <div className="sidebar div middle">
        {/*middle of sidebar, display of game state information*/}
        <h3>
          Current Score:
          <br /> NEEDS FIXING
        </h3>
        <h3>
          Successful Matches:
          <br /> NEEDS FIXING
        </h3>
        <h3>
          Matches Attempted:
          <br /> {Math.floor(movesCount / 2)}
        </h3>
        <h3 className="timer">
          Timer: <br /> {minutes}:{seconds <= 9 ? "0" + seconds : seconds}
        </h3>
      </div>
      <div className="dd-wrapper">
        {/*dropdown for choosing card deck*/}
        <div className="dd-header">
          <div className="dd-header-title"></div>
        </div>
        {dropDown ? (
          <div className="dd-list">
            <button onClick={handleDropDown} id="choose-theme-button">
              Choose a Theme!
            </button>
            <button deckidnumber="2" onClick={(e) => handleThemeClick(e)} id="halloween-button" className="dd-list-item">
              Halloween
            </button>
            <button deckidnumber="1" onClick={(e) => handleThemeClick(e)} id="leaves-button" className="dd-list-item">
              Autumn Leaves
            </button>
            <button deckidnumber="0" onClick={(e) => handleThemeClick(e)} id="pumpkins-button" className="dd-list-item">
              Pumpkins
            </button>
            <button deckidnumber="3" onClick={(e) => handleThemeClick(e)} id="surprise-me" className="dd-list-item">
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
      {/* <div>
        <NavLink to="/CreditsOverlay">
          <button onClick={() => CreditOverlay()}> Credits</button>
        </NavLink>
      </div> */}
    </div>
  );
}

export default Sidebar;
