import {
  LEFT_TURNS_MAP,
  RIGHT_TURNS_MAP,
} from "../constants/robot-direction-map";

const frontMove = (robotDetails, gridMap, lostCell={}) => {
  let robotNewDetails = { ...robotDetails };
  const {
    d,
    x,
    y
  } = robotNewDetails;

  switch (d) {
    case "N":
      if (checkCurrentIsNoLostCell(lostCell, "y", robotNewDetails, gridMap)) {
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
      if (checkCurrentIsNoLostCell(lostCell, "y", robotNewDetails, gridMap)) {
        robotNewDetails.y = robotNewDetails.y - 1;
      }

      if (gridMap.y= robotNewDetails.y || robotNewDetails.y < 0) {
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
      if (checkCurrentIsNoLostCell(lostCell, "x", robotNewDetails, gridMap)) {
        robotNewDetails.x = robotNewDetails.x + 1;
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
      if (checkCurrentIsNoLostCell(lostCell, "x", robotNewDetails, gridMap)) {
        robotNewDetails.x = robotNewDetails.x - 1;
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
  return robotNewDetails;
};

export const robotNextStep = ({robotToMove, nextInstruction, dimension, lostCell}) => {
  let robotWithNewPosition = {
    ...robotToMove,
  };

  if (nextInstruction === "L") {
    robotWithNewPosition.d = LEFT_TURNS_MAP[robotWithNewPosition.d];
  } else if (nextInstruction === "R") {
    robotWithNewPosition.d = RIGHT_TURNS_MAP[robotWithNewPosition.d];
  } else if (nextInstruction === "F") {
    const newPositionWithDirection = frontMove(robotWithNewPosition, dimension, lostCell);
    robotWithNewPosition = {
      ...robotWithNewPosition,
      ...newPositionWithDirection,
    };
  }

  return robotWithNewPosition;
};

const checkCurrentIsNoLostCell = (lostCell, typeOfCoordinates, robotNewDetails, gridMap) => {
  const scentFound = lostCell[typeOfCoordinates] && lostCell[typeOfCoordinates].includes(robotNewDetails[typeOfCoordinates]);
  const isRobotOnEdge = gridMap[typeOfCoordinates]-1 === robotNewDetails[typeOfCoordinates] || robotNewDetails[typeOfCoordinates] === 0;

  if (scentFound && isRobotOnEdge) {
    return false
  }

  return true;
};
