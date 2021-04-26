import React from "react";
import { GiVintageRobot } from "react-icons/gi";

import "./GridColumn.css";

const GridColumn = ({
  dimension = {},
  lostCell = {},
  rowIndex,
  robotDetail,
  errorHandler,
  roboToMove
}) => {
  const robotCell = (robot) => (
      <span key={`robot-${robot.name}-${roboToMove}`} className={`robot ${robot.d}`}>
        <GiVintageRobot size="1.8em" name={robot.name} color={robot.color} />
        {robot.name}
      </span>
    )

  const renderColumn = () => {
    try {
      let columns = [];
      for (let index = 0; index < dimension.x; index++) {
        let lostCellClass = lostCell.x && lostCell.x.includes(index) && lostCell.y && lostCell.y.includes(rowIndex) ? "lostCell" : "";
        // const allRobotInCell = robotDetail.filter((robot) => {
        //   return robotDetail[roboToMove].y === rowIndex && robot.x === index;
        // });

        const robotInCell = (robotDetail && robotDetail.y === rowIndex && robotDetail.x === index) && robotDetail;

        columns.push(
          <td
            key={`cell-${rowIndex}-${index}`}
            className={`grid-column column-${index} ${lostCellClass} `}
          >
            {robotInCell? robotCell(robotInCell) : <span />}
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
