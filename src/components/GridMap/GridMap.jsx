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
        name: "Chintu1",
        x: 0,
        y: 0,
        d: "N",
        color: "green",
        currentPosition: "1 1 N",
        instructions: "FFFFFFFFFFFFFFFFFFFFFF",
      },
      {
         name: "Chintu2",
         x: 0,
         y: 0,
         d: "N",
         color: "green",
         currentPosition: "1 1 N",
         instructions: "RFFFFFFFF",
       },
       {
          name: "Chintu2",
          x: 0,
          y: 0,
          d: "S",
          color: "green",
          currentPosition: "1 1 N",
          instructions: "LFFFFFFFFFFFFFFFF",
        },
        {
           name: "Chintu2",
           x: 0,
           y: 0,
           d: "E",
           color: "green",
           currentPosition: "1 1 N",
           instructions: "LFFFFFFFFFFFFFFFFFFFFFFFF",
         },
         {
            name: "Chintu2",
            x: 0,
            y: 0,
            d: "W",
            color: "green",
            currentPosition: "1 1 N",
            instructions: "FFFFFFFFFFFFFFFFFFFFFFFFFF",
          },
          {
             name: "Chintu2",
             x: 0,
             y: 0,
             d: "N",
             color: "green",
             currentPosition: "1 1 N",
             instructions: "RFFFFFFFFFFFFFFFFFFFFF",
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
