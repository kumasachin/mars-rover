import React, { useState, useEffect } from "react";
import { GridRow } from "../../modules";
import "./GridSurface.css";

export const GridSurface = ({
  dimension,
  lostCell = {},
  robotPosition = {},
}) => {
  return (
    <table
      cellSpacing="0"
      border="1"
      width="100%"
      height="100%"
      className="grid-container"
    >
      <tbody>
        <GridRow
          dimension={dimension}
          lostCell={lostCell}
          robotPosition={robotPosition}
        />
      </tbody>
    </table>
  );
};

export default GridSurface;
