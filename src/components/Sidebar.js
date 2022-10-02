function Sidebar() {
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
    </div>
  );
}

export default Sidebar;
