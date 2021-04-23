import React, {useState, useEffect} from 'react';
import {
    GridSurface
  } from "../";
import "./GridMap.css";

const GridMap = ({name="unKnown surface"}) => {
    const marsRover = {
        map: {
            x: 6,
            y: 6
        },
        lostCell: {
            x: [3],
            y: [2]
        },
        robots: [{
            name: "Chintu",
            currentPosition: "1 1 N",
            instructions: "FRFR"
        },{
            name: "Montu",
            currentPosition: "1 2 N",
            instructions: "FLFR"
        }]
    };
    
    return (
        <>
            <h2>
                This is {name}
            </h2>
            <div class="row">
                <GridSurface 
                    dimension={marsRover.map}
                    robotPosition={marsRover.robots}
                    lostCell={marsRover.lostCell}
                />
            </div>
        </>
    );
};

export default GridMap;