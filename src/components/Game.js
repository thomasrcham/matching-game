import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import CardContainer from "./CardContainer";
import Card from "./Card";

function Game() {


    return (<div>
        <div className="sidebar">
            <Sidebar />
        </div>
        <div className="mainWindow">
            {cards ? <CardContainer set={cards[cardSetID]} /> : null}
        </div>
    </div>
    );
}
export default Game;
