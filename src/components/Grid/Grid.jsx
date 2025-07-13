import React, { useState, useEffect, useCallback } from "react";
import { GridRow } from "../../modules";
import { robotNextStep } from "../../utils/robotMovement";
import {delay} from "../../utils/commonUtils"
import "./Grid.css";

// Constants
const ROBOT_MOVE_DELAY = 300;

export const Grid = ({ dimension, lostCell = {}, onRobotAction, executionStatus = false, robots = [], errorHandler }) => { 
  const [robotList, setRobotNewPosition] = useState(robots);
  const [lostCellScent, setLostCellScent] = useState(lostCell);
  const [iteratorForRobot, setInstructionStatus] = useState({
    instructionCount: 0,
    queueOfRobot: 0
  });
  const numberOfRobots = robotList.length;
  const updateRobotsList = (robotWithNewPosition) => {
      const robotListUpdated = [...robotList];
      robotListUpdated[iteratorForRobot.queueOfRobot] = robotWithNewPosition;
      return robotListUpdated;
  }

  const detectRobotNextInstruction = (robotToMove) => {
    const {
      queueOfRobot,
      instructionCount
    } = iteratorForRobot;
    if (numberOfRobots - 1 >= queueOfRobot && robotToMove.instructions.length >= instructionCount) {
      return robotToMove.instructions[instructionCount];
    }
    return null;
  }

  const pickRobotToMove = () => {
    const {
      queueOfRobot,
    } = iteratorForRobot;
    return robotList[queueOfRobot];
  }

  const passInstruction = (robot, nextInstruction) => {
      const robotWithNewPosition = robotNextStep({
        robotToMove: robot,
        nextInstruction: nextInstruction,
        dimension: dimension,
        lostCell: lostCellScent
      });

      onRobotAction({
        currentCoordinate: robot.currentPosition,
        instruction: robot.instructions,
        name: robot.name,
        newDirection: `${robotWithNewPosition.x} ${robotWithNewPosition.y}  ${robotWithNewPosition.d}`,
        isLost: robotWithNewPosition.lost
      });
      
      return robotWithNewPosition;
  };

  const markTheScent = (robotWithInstruction) => {
    const lostCellScentUpdated = { ...lostCellScent };
    if (
      robotWithInstruction.lost &&
      ("x" in robotWithInstruction.lost || "y" in robotWithInstruction.lost)
    ) {
      lostCellScentUpdated.x.push(robotWithInstruction.lost.x);
      lostCellScentUpdated.y.push(robotWithInstruction.lost.y);
    }

    return lostCellScentUpdated;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const moveRobot = useCallback(async () => {
    try {
      const robot = pickRobotToMove();
      const {
        queueOfRobot,
        instructionCount
      } = iteratorForRobot;
      const nextInstruction = detectRobotNextInstruction(robot);
      const robotWithInstruction = passInstruction(robot, nextInstruction);
      const robotListUpdated = updateRobotsList(robotWithInstruction);
      const markRobotScent = markTheScent(robotWithInstruction);

      if(nextInstruction === null || robotWithInstruction.lost || robotWithInstruction.isOnEdge) {
        setInstructionStatus({
            instructionCount: 0,
            queueOfRobot: numberOfRobots > queueOfRobot ? queueOfRobot + 1 : queueOfRobot
        });
      } else {
        setInstructionStatus({
          instructionCount: instructionCount + 1,
          queueOfRobot: queueOfRobot,
        });
      }
      await delay(ROBOT_MOVE_DELAY);
      setLostCellScent(markRobotScent);
      setRobotNewPosition(robotListUpdated);
    } catch (e) {
      errorHandler();
      console.error("Unknown error while rendering grid:", e);
    }
  }, [iteratorForRobot, numberOfRobots, errorHandler]);

  useEffect(() => {
    if(executionStatus && iteratorForRobot.queueOfRobot < numberOfRobots) {
      moveRobot();
    }
  }, [executionStatus, iteratorForRobot.queueOfRobot, numberOfRobots, moveRobot]);

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
          errorHandler={errorHandler}
          dimension={dimension}
          lostCell={lostCellScent}
          robots={robotList}
          whichRoboToMove={iteratorForRobot.queueOfRobot}
        />
      </tbody>
    </table>
  );
};

export default Grid;
