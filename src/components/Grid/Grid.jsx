import React, { useState, useEffect } from "react";
import { GridRow } from "../../modules";
import { robotNextStep } from "../../utils/robotMovement";
import {delay} from "../../utils/commonUtils"
import "./Grid.css";

export const Grid = ({ dimension, lostCell = {}, robots = [] }) => {
  const [robotList, setRobotNewPosition] = useState(robots);
  const [lostCellScent, setLostCellScent] = useState(lostCell);
  const [iteratorForRobot, setInstructionStatus] = useState({
    instructionCount: 0,
    queueOfRobot: 0,
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
    console.log("queue", queueOfRobot)
    return robotList[queueOfRobot];
  }

  const passInstruction = (robot, nextInstruction) => {
      const robotWithNewPosition = robotNextStep({
        robotToMove: robot,
        nextInstruction: nextInstruction,
        dimension: dimension,
        lostCell: lostCellScent
      });
      return robotWithNewPosition;
  };

  const markTheScent = (robotWithInstruction) => {
    const lostCellScentUpdated = { ...lostCellScent };
    if (
      robotWithInstruction.isOnEdge ||
      (robotWithInstruction.lost &&
      ("x" in robotWithInstruction.lost || "y" in robotWithInstruction.lost))
    ) {
      lostCellScentUpdated.x.push(robotWithInstruction.lost.x);
      lostCellScentUpdated.y.push(robotWithInstruction.lost.y);
    }

    return lostCellScentUpdated;
  }

  const moveRobot = async () => {
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
    await delay(300);
    setLostCellScent(markRobotScent);
    setRobotNewPosition(robotListUpdated);
  }

  useEffect(() => {
    if(iteratorForRobot.queueOfRobot < numberOfRobots) {
      moveRobot();
    }
  }, [null, robotList]);

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
          lostCell={lostCellScent}
          robots={robotList}
        />
      </tbody>
    </table>
  );
};

export default Grid;
