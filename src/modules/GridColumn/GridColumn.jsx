import React from "react";
import { GiVintageRobot } from "react-icons/gi";

import "./GridColumn.css";

const GridColumn = ({
  dimension = {},
  lostCell = {
  },
  rowIndex,
  robotDetail = [],
  errorHandler,
  whichRoboToMove
}) => {
  const robotCell = (allRobotInCell) =>
    allRobotInCell.map((robot, index) => (
      <span key={`robot-${robot.name}-${index}`} className={`robot ${robot.d}`}>
        <GiVintageRobot size="1.8em" name={robot.name} color={robot.color} />
        {robot.name}
      </span>
    ));

  const renderColumn = () => {
    try {
      let columns = [];
      for (let index = 0; index < dimension.x; index++) {
        let currentRowIndexInLostCell =  lostCell.x.indexOf(index);
        let isCurrentColumnInLostCell = lostCell.y[currentRowIndexInLostCell] === rowIndex;
        let lostCellClass = currentRowIndexInLostCell >= 0 && isCurrentColumnInLostCell ? "lostCell" : "";
        const allRobotInCell = robotDetail.filter((robot, seq) => {
          return whichRoboToMove >= seq && robot.y === rowIndex && robot.x === index;
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
    } catch (e) {
      errorHandler();
      console.log("unknow error while rendering grid columns");
    }
  };

  return <>{renderColumn()}</>;
};

export default GridColumn;
