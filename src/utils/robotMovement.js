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
        robotNewDetails.y = 
        checkCurrentIsLostCell(lostCell, "y", robotNewDetails) &&
        (gridMap.y <= robotNewDetails.y || robotNewDetails.y < 0)
          ? robotNewDetails.y
          : robotNewDetails.y + 1;

      if (gridMap.y <= robotNewDetails.y || robotNewDetails.y < 0) {
        robotNewDetails = {
          ...robotNewDetails,
          lost: {
            ...robotNewDetails,
            y: robotNewDetails.y - 1,
          },
        };
      }
      break;
    case "S":
        robotNewDetails.y =
        checkCurrentIsLostCell(lostCell, "y", robotNewDetails) &&
        (gridMap.y <= robotNewDetails.y || robotNewDetails.y < 0)
          ? robotNewDetails.y
          : robotNewDetails.y - 1;

      if (gridMap.y <= robotNewDetails.y || robotNewDetails.y < 0) {
        robotNewDetails = {
          ...robotNewDetails,
          // y: newPosition.y + 1,
          lost: {
            ...robotNewDetails,
            y: robotNewDetails.y + 1,
          },
        };
      }
      break;
    case "E":
        robotNewDetails.x =
        checkCurrentIsLostCell(lostCell, "x", robotNewDetails) &&
        (gridMap.x <= robotNewDetails.x || robotNewDetails.x < 0)
          ? robotNewDetails.x
          : robotNewDetails.x + 1;

      if (gridMap.x <= robotNewDetails.x || robotNewDetails.x < 0) {
        robotNewDetails = {
          ...robotNewDetails,
          //  y: newPosition.x - 1,
          lost: {
            ...robotNewDetails,
            y: robotNewDetails.x - 1,
          },
        };
      }
      break;
    case "W":
        robotNewDetails.x =
        checkCurrentIsLostCell(lostCell, "x", robotNewDetails) &&
        (gridMap.x <= robotNewDetails.x || robotNewDetails.x < 0)
          ? robotNewDetails.x
          : robotNewDetails.x - 1;

      if (gridMap.x <= robotNewDetails.x || robotNewDetails.x < 0) {
        robotNewDetails = {
          ...robotNewDetails,
          // y: newPosition.x + 1,
          lost: {
            ...robotNewDetails,
            y: robotNewDetails.x + 1,
          },
        };
      }
      break;
    default:
    // code block
  }
  return robotNewDetails;
};

export const robotNextStep = (robotDetails, instructionCount, dimension, lostCell) => {
  let robotWithNewPosition = {
    ...robotDetails,
  };
  const { instructions } = robotDetails;
  const nextInstruction = instructions[instructionCount];
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

const checkCurrentIsLostCell = (lostCell, typeOfCoordinates, newPosition) => {
  return lostCell[typeOfCoordinates] && lostCell[typeOfCoordinates].includes(newPosition[typeOfCoordinates]);
};
