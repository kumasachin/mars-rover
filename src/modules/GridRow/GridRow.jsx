import React from "react";
import { GridColumn } from "../../modules";
import "./GridRow.css";

const GridRow = ({ dimension = {}, lostCell = {}, robots = {}, errorHandler, roboToMove }) => {
  const findRoboInRow = (rowNumber, typeOfCoordinates) => {
    if (rowNumber === robots[roboToMove][typeOfCoordinates]) {
      return robots[roboToMove];
    };

    return false;
  };

  const renderRows = () => {
    try {
      let rows = [];

      for (let index = dimension.y - 1; index >= 0; index--) {
        const isLostRowClass =
          lostCell.y && lostCell.y.includes(index) ? "lostRow" : "";
        const isRobotExitOnRow = findRoboInRow(index, "y");

        rows.push(
          <tr
            key={`row-${index}`}
            className={`grid-row row-${index} ${isLostRowClass}`}
          >
            {
              <GridColumn
                dimension={dimension}
                lostCell={lostCell}
                isLostRow={isLostRowClass && isLostRowClass}
                rowIndex={index}
                robotDetail={isRobotExitOnRow}
                errorHandler={errorHandler}
                roboToMove={roboToMove}
              />
            }
          </tr>
        );
      }

      return rows;
    } catch (e) {
      errorHandler();
      console.log("unknow error while rendering grid rows");
    }
  };

  return <>{renderRows()}</>;
};

export default GridRow;
