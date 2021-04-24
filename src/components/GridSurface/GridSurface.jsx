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
    const {
      instructionCount,
      numberOfRobotsRemainToPosition
    } = iteratorForRobot;
    const robotToMove = robots[numberOfRobotsRemainToPosition];
    
    if (robotPosition.length - 1 >= numberOfRobotsRemainToPosition && robotToMove.instructions.length > instructionCount) {
      console.log("numberOfRobotsRemainToPosition", numberOfRobotsRemainToPosition)
    console.log("move", robotToMove.name, "with instruction", robotToMove.instructions);
    console.log("robotNumber sequence", robotPosition.length - 1 >= numberOfRobotsRemainToPosition)
    console.log("robot instruction", robotToMove.instructions, robotToMove.instructions.length > instructionCount)



      const robotWithNewPosition = robotNextStep(robotPosition[numberOfRobotsRemainToPosition], instructionCount, dimension);
      console.log("robotWithNewPosition", robotWithNewPosition);
      const robotSetWithNewPosition = [...robotPosition];

      robotSetWithNewPosition[numberOfRobotsRemainToPosition] = robotWithNewPosition;
      //robotSetWithNewPosition.push(robotWithNewPosition);
      await delay(1000);
      console.log("£££££££££££££",robotToMove.name, "command to excute", robotToMove.instructions[instructionCount]);
      if (robotToMove.instructions.length -1 <= instructionCount) {
        setInstructionStatus({
          instructionCount: 0,
          numberOfRobotsRemainToPosition: numberOfRobotsRemainToPosition + 1
        });
       } else {
        setInstructionStatus({
          instructionCount: instructionCount + 1,
          numberOfRobotsRemainToPosition: numberOfRobotsRemainToPosition
        });
       }
      setRobotNewPosition(robotSetWithNewPosition);
      console.log("$$$$$$$$$$$$$$$$$$$$$$$$robotSetWithNewPosition", robotSetWithNewPosition);
     // console.log("after robot", robotSetWithNewPosition)
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
