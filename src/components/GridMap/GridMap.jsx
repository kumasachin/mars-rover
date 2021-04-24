import React, { useState, useEffect } from "react";
import { GridSurface } from "../GridSurface/GridSurface";
import "./GridMap.css";

const GridMap = ({ name = "unKnown surface" }) => {
  const marsRover = {
    map: {
      x: 6,
      y: 6,
    },
    lostCell: {
      x: [3],
      y: [2],
    },
    robots: [
     {
        name: "Chintu1",
        x: 0,
        y: 0,
        d: "N",
        color: "green",
        currentPosition: "1 1 N",
        instructions: "RFFF",
      },
      {
        name: "Chintu2",
        x: 2,
        y: 1,
        d: "N",
        color: "red",
        currentPosition: "1 1 N",
        instructions: "LLRFF",
      }
    ],
  };

  return (
    <>
      <h2>This is {name}</h2>
      <div className="row">
        <GridSurface
          dimension={marsRover.map}
          robots={marsRover.robots}
          lostCell={marsRover.lostCell}
        />
      </div>
    </>
  );
};

export default GridMap;
