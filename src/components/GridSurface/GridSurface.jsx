import React, { useState, useEffect } from "react";
import { GridRow } from "../../modules";
import { robotNextStep } from "../../utils/robotMovement";
import "./GridSurface.css";

export const GridSurface = ({ dimension, lostCell = {}, robots = [] }) => {
  const [robotList, setRobotNewPosition] = useState(robots);
  const [lostCellData, setLostCellData] = useState(lostCell);
  const [iteratorForRobot, setInstructionStatus] = useState({
    instructionCount: 0,
    numberOfRobotsRemainToPosition: 0,
  });

  const delay = async (delayInms) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  };

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
      console.log("robotWithNewPosition", robotWithNewPosition);
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
      //robotSetWithNewPosition.push(robotWithNewPosition);
      await delay(300);
      console.log(
        "£££££££££££££",
        robotToMove.name,
        "command to excute",
        robotToMove.instructions[instructionCount]
      );
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
      console.log(
        "$$$$$$$$$$$$$$$$$$$$$$$$robotSetWithNewPosition",
        robotSetWithNewPosition
      );
      // console.log("after robot", robotSetWithNewPosition)
    }
  };

  useEffect(() => {
    moveRobot();
  }, []);

  useEffect(() => {
    moveRobot();
  }, [robotList]);

  useEffect(() => {
    console.log("lostCellData", lostCellData);
  }, [lostCellData]);

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

export default GridSurface;
