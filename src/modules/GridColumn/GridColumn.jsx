import React, { useState, useEffect } from "react";
import { GiVintageRobot } from "react-icons/gi";

import "./GridColumn.css";

const GridColumn = ({
  dimension = {},
  lostCell = {},
  rowIndex,
  robotDetail = [],
}) => {
  const robotCell = (allRobotInCell) =>
    allRobotInCell.map((robot, index) => (
      <span key={`robot-${robot.name}-${index}`} className={`robot ${robot.d}`}>
        <GiVintageRobot size="1.8em" name={robot.name} color={robot.color} />
        {robot.name}
      </span>
    ));

  const renderColumn = () => {
    let columns = [];
    for (let index = 0; index < dimension.x; index++) {
      const lostCellClass =
        lostCell.x && lostCell.x.includes(index) ? "lostCell" : "";
      const allRobotInCell = robotDetail.filter((robot) => {
        return robot.y === rowIndex && robot.x === index;
      });

      columns.push(
        <td
          key={`cell-${rowIndex}-${index}`}
          className={`grid-column column-${index} ${lostCellClass} `}
        >
          {allRobotInCell.length > 0 ? robotCell(allRobotInCell) : <span />}
        </td>
      );
    }
    return columns;
  };

  return <>{renderColumn()}</>;
};

export default GridColumn;
