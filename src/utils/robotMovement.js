import {
  LEFT_TURNS_MAP,
  RIGHT_TURNS_MAP,
} from "../constants/robot-direction-map";

export const robotNextStep = ({robotToMove, nextInstruction, dimension, lostCell}) => {
  let robotWithNewPosition = {
    ...robotToMove,
  };

  const frontMove = () => {
    let robotNewDetails = { ...robotWithNewPosition };
    const frontMoveMapping = {
      "N": "y",
      "S": "y",
      "E": "x",
      "W": "x"
    }
    const {
      d,
      x,
      y
    } = robotNewDetails;
    const gridMap = dimension;
    
    switch (d) {
      case "N":
        if (checkCurrentIsNoLostCell(lostCell, "y", robotNewDetails, dimension)) {
          robotNewDetails.y = robotNewDetails.y + 1;
        } else {
          robotNewDetails.isOnEdge = true;
        }
        if (gridMap.y <= robotNewDetails.y || robotNewDetails.y < 0) {
          robotNewDetails = {
            ...robotNewDetails,
            lost: {
              x: robotNewDetails.x,
              y: robotNewDetails.y - 1,
            },
          };
        }

        break;
      case "S":
        if (checkCurrentIsNoLostCell(lostCell, "y", robotNewDetails, dimension)) {
          robotNewDetails.y = robotNewDetails.y - 1;
        }else {
          robotNewDetails.isOnEdge = true;
        }
        if (gridMap.y <= robotNewDetails.y || robotNewDetails.y < 0) {
          robotNewDetails = {
            ...robotNewDetails,
            // y: newPosition.y + 1,
            lost: {
              x: robotNewDetails.x,
              y: robotNewDetails.y + 1,
            },
          };
        }
        break;
      case "E":
        if (checkCurrentIsNoLostCell(lostCell, "x", robotNewDetails, dimension)) {
          robotNewDetails.x = robotNewDetails.x + 1;
        }else {
          robotNewDetails.isOnEdge = true;
        }
          
        if (gridMap.x <= robotNewDetails.x || robotNewDetails.x < 0) {
          robotNewDetails = {
            ...robotNewDetails,
            lost: {
              y: robotNewDetails.y,
              x: robotNewDetails.x - 1,
            },
          };
        }
        break;
      case "W":
        if (checkCurrentIsNoLostCell(lostCell, "x", robotNewDetails, dimension)) {
          robotNewDetails.x = robotNewDetails.x - 1;
        } else {
          robotNewDetails.isOnEdge = true;
        }

        if (gridMap.x <= robotNewDetails.x || robotNewDetails.x < 0) {
          robotNewDetails = {
            ...robotNewDetails,
            lost: {
              y: robotNewDetails.y,
              x: robotNewDetails.x + 1,
            },
          };
        }
        break;
      default:
      // code block
    }

    // //Reset value set by above if robot is lost
    // robotNewDetails = checkIfRobotIsLost({
    //   dimension: dimension, 
    //   axis: frontMoveMapping[d], 
    //   direction: d,
    //   robotNewDetails: robotNewDetails
    // });

    return robotNewDetails;
  };

  if (nextInstruction === "L") {
    robotWithNewPosition.d = LEFT_TURNS_MAP[robotWithNewPosition.d];
  } else if (nextInstruction === "R") {
    robotWithNewPosition.d = RIGHT_TURNS_MAP[robotWithNewPosition.d];
  } else if (nextInstruction === "F") {
    const newPositionWithDirection = frontMove();
    robotWithNewPosition = {
      ...robotWithNewPosition,
      ...newPositionWithDirection,
    };
  }

  return robotWithNewPosition;
};


const checkCurrentIsNoLostCell = (lostCell, typeOfCoordinates, robotNewDetails, gridMap) => {
  const scentFound = lostCell["x"].includes(robotNewDetails["x"]) && lostCell["y"].includes(robotNewDetails["y"]);
  const isRobotOnEdge = gridMap[typeOfCoordinates]-1 === robotNewDetails[typeOfCoordinates] || robotNewDetails[typeOfCoordinates] === 0;

  if (scentFound && isRobotOnEdge) {
    return false
  }

  return true;
};


const checkIfRobotIsLost = ({dimension, axis, direction, robotNewDetails}) => {
  if (dimension[axis] <= robotNewDetails[axis] || robotNewDetails[axis] < 0) {
    const lostRobot = {
      ...robotNewDetails,
      lost: {
        x: robotNewDetails.x,
        y: robotNewDetails.y,
      },
    };

    if (direction === "N" || direction === "E") {
      lostRobot.lost[axis] = robotNewDetails[axis] - 1;
    } else if (direction === "S" || direction === "W") {
      lostRobot.lost[axis] = robotNewDetails[axis] + 1;
    }
  }

  return robotNewDetails;
}
