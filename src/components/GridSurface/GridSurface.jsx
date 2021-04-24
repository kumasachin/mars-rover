import React, { useState, useEffect } from "react";
import { GridRow } from "../../modules";
import { robotNextStep } from "../../utils/robotMovement";

import "./GridSurface.css";

export const GridSurface = ({
  dimension,
  lostCell = {},
  robots = [],
}) => {
  const [robotPosition, setRobotNewPosition] = useState(robots);
  const [iteratorForRobot, setInstructionStatus] = useState({
    instructionCount: 0,
    numberOfRobotsRemainToPosition: 0
  });

  const delay = async (delayInms) => {
    return new Promise(resolve  => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  };

  const moveRobot = async () => {
    const robotToMove = robots[robots.length - 1];
    const {
      instructionCount,
      numberOfRobotsRemainToPosition
    } = iteratorForRobot;

    if (robotPosition.length - 1 >= numberOfRobotsRemainToPosition && robotToMove.instructions.length > instructionCount) {
      const robotWithNewPosition = robotNextStep(robotPosition[numberOfRobotsRemainToPosition], instructionCount, dimension);
      console.log("robotWithNewPosition", robotWithNewPosition);
      const robotSetWithNewPosition = [...robotPosition];
      robotSetWithNewPosition.pop();
      robotSetWithNewPosition.push(robotWithNewPosition);
      await delay(2000);
      setInstructionStatus({
        instructionCount: instructionCount + 1,
        numberOfRobotsRemainToPosition: robotToMove.instructions.length -1 <= instructionCount ? numberOfRobotsRemainToPosition + 1 : numberOfRobotsRemainToPosition
      });
      setRobotNewPosition(robotSetWithNewPosition);

      console.log("after robot", robotSetWithNewPosition)
    }
  };

  useEffect(() => {
    moveRobot();
  }, []); 
  
  useEffect(() => {
    moveRobot();
  }, [robotPosition]);

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
          robots={robotPosition}
        />
      </tbody>
    </table>
  );
};

export default GridSurface;
