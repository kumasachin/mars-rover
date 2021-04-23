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
        name: "Chintu",
        x: 1,
        y: 1,
        d: "N",
        color: "red",
        currentPosition: "1 1 N",
        instructions: "FRFR",
      },
      {
        name: "Montu",
        x: 1,
        y: 1,
        d: "N",
        color: "green",
        currentPosition: "1 2 E",
        instructions: "FLFR",
      },
    ],
  };

  return (
    <>
      <h2>This is {name}</h2>
      <div className="row">
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
