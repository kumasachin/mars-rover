import React, { useState, useEffect } from "react";
import { GridRow } from "../../modules";
import { robotNextStep } from "../../utils/robotMovement";
import {delay} from "../../utils/commonUtils"
import "./Grid.css";

export const Grid = ({ dimension, lostCell = {}, robots = [] }) => {
  const [robotList, setRobotNewPosition] = useState(robots);
  const [lostCellData, setLostCellData] = useState(lostCell);
  const [iteratorForRobot, setInstructionStatus] = useState({
    instructionCount: 0,
    numberOfRobotsRemainToPosition: 0,
  });

 

  const moveRobot = async () => {
    const {
      instructionCount,
      numberOfRobotsRemainToPosition,
    } = iteratorForRobot;
    const robotToMove = robotList[numberOfRobotsRemainToPosition];

    if (
      robotList.length - 1 >= numberOfRobotsRemainToPosition &&
      robotToMove.instructions.length > instructionCount
    ) {
      const robotWithNewPosition = robotNextStep(
        robotToMove,
        instructionCount,
        dimension,
        lostCell
      );
      const lostCellUpdated = { ...lostCellData };

      if (
        robotWithNewPosition.lost &&
        ("x" in robotWithNewPosition.lost || "y" in robotWithNewPosition.lost)
      ) {
        lostCellUpdated.x.push(robotWithNewPosition.lost.x);
        lostCellUpdated.y.push(robotWithNewPosition.lost.y);
      }
      const robotSetWithNewPosition = [...robotList];

      robotSetWithNewPosition[
        numberOfRobotsRemainToPosition
      ] = robotWithNewPosition;
      await delay(300);
      if (robotToMove.instructions.length - 1 <= instructionCount) {
        setInstructionStatus({
          instructionCount: 0,
          numberOfRobotsRemainToPosition: numberOfRobotsRemainToPosition + 1,
        });
      } else {
        setInstructionStatus({
          instructionCount: instructionCount + 1,
          numberOfRobotsRemainToPosition: numberOfRobotsRemainToPosition,
        });
      }
      setLostCellData(lostCellUpdated);
      setRobotNewPosition(robotSetWithNewPosition);
    }
  };

  useEffect(() => {
    moveRobot();
  }, [, robotList]);

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
          lostCell={lostCellData}
          robots={robotList}
        />
      </tbody>
    </table>
  );
};

export default Grid;
