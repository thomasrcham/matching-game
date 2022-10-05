import { useState } from "react";
import "@blueprintjs/core/lib/css/blueprint.css";
import { Overlay, Classes, Button } from "@blueprintjs/core";
import { NavLink } from "react-router-dom";

//credits overlay... NOT complete yet

// function CreditOverlay( {setIsOpen,
//   isOpen} ) {
//   const [creditsOpen, setCreditsOpen] = useState(false);

  // return (
  //   <>
  //     <button></button>
  //       <button></button>
  //       <button></button>
  //       <button></button>
  //     <div
  //       style={{
  //         display: "block",
  //         width: 400,
  //         padding: 30,
  //       }}
  //     >
  //       <h4>ReactJS Blueprint Overlay Component</h4>
  //       <Button
  //         onClick={() => {
  //           setCreditsOpen(true);
  //         }}
  //       >
  //         Credits Overlay
  //       </Button>

  //       <Overlay className={Classes.OVERLAY_SCROLL_CONTAINER} creditsOpen={creditsOpen}>
  //         <div className="overlay">
            
  //           <NavLink to="/">
  //             <button
  //               onClick={() => {
  //                 setCreditsOpen(false);
  //               }}
  //             >
  //               New Game!
  //             </button>
  //           </NavLink>
  //           <NavLink to="/highScores">
  //             <button
  //               onClick={() => {
  //                 setCreditsOpen(false);
  //               }}
  //             >
  //               See High Scores
  //             </button>
  //           </NavLink>
  //           <NavLink to="/History">
  //             <button
  //               onClick={() => {
  //                 setCreditsOpen(false);
  //               }}
  //             >
  //               See Previous Scores
  //             </button>
  //           </NavLink>
  //         </div>
  //       </Overlay>
  //     </div>
  //   </>
   // );
// }

// export default CreditOverlay;