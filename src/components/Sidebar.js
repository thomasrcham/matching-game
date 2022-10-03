import React, { useState } from "react";

function Sidebar() {
  //  const [dropDown, setDropDown] = useState(false);

  //  function handleDropDown() {
  //   setDropDown((dropDown) => !dropDown)
  //  }

  return (
    <div className="sidebarComponent">
      <div className="sidebar div top">
        <button> New Game </button>
        <button> Best Scores</button>
        <button> History</button>
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
      {/* <div className="dd-wrapper">
        <div className="dd-header">
          <div className="dd-header-title"></div>
        </div>
        <div className="dd-list">
          <button className="dd-list-item"></button>
          <button className="dd-list-item"></button>
          <button className="dd-list-item"></button>
        </div> */}
      {/* </div> --> in case we want a dropdown for multiple sets... can work with this */}
    </div>
  );
}

export default Sidebar;
