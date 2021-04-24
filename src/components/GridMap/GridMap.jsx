import React, { useState, useEffect } from "react";
import { GridSurface } from "../GridSurface/GridSurface";
import "./GridMap.css";

const GridMap = ({ name = "unKnown surface" }) => {
  const marsRover = {
    map: {
      x: 16,
      y: 16,
    },
    lostCell: {
      x: [],
      y: [],
    },
    robots: [
      {
        name: "",
        x: 0,
        y: 0,
        d: "N",
        color: "red",
        currentPosition: "0 0 E",
        instructions: "FFFFFFFFFFFFFF",
      },
      {
        name: "",
        x: 0,
        y: 0,
        d: "N",
        color: "red",
        currentPosition: "0 0 E",
        instructions: "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
      },
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
