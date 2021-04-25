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
      d
    } = robotNewDetails;
    
    switch (d) {
      case "N":
        if (checkCurrentIsNoLostCell(lostCell, "y", d, robotNewDetails, dimension)) {
          robotNewDetails.y = robotNewDetails.y + 1;
        } else {
          robotNewDetails.isOnEdge = true;
        }

        break;
      case "S":
        if (checkCurrentIsNoLostCell(lostCell, "y", d, robotNewDetails, dimension)) {
          robotNewDetails.y = robotNewDetails.y - 1;
        }else {
          robotNewDetails.isOnEdge = true;
        }
        break;
      case "E":
        if (checkCurrentIsNoLostCell(lostCell, "x", d, robotNewDetails, dimension)) {
          robotNewDetails.x = robotNewDetails.x + 1;
        }else {
          robotNewDetails.isOnEdge = true;
        }
        break;
      case "W":
        if (checkCurrentIsNoLostCell(lostCell, "x", d, robotNewDetails, dimension)) {
          robotNewDetails.x = robotNewDetails.x - 1;
        } else {
          robotNewDetails.isOnEdge = true;
        }

        break;
      default:
      // code block
    }

    //Reset value set by above if robot is lost
    robotNewDetails = checkIfRobotIsLost({
      dimension: dimension, 
      axis: frontMoveMapping[d], 
      direction: d,
      robotNewDetails: robotNewDetails
    });

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


const checkCurrentIsNoLostCell = (lostCell, axis, direction, robotNewDetails, dimension) => {
  const scentFound = lostCell["x"].includes(robotNewDetails["x"]) && lostCell["y"].includes(robotNewDetails["y"]);
  const isRobotOnEdge = dimension[axis]-1 === robotNewDetails[axis] || robotNewDetails[axis] === 0;
  
  if (scentFound && isRobotOnEdge ) {
    if (direction === "N" || direction === "E") {
      return dimension[axis] > robotNewDetails[axis] + 1;
    } else if (direction === "S" || direction === "W") {
      return dimension[axis] < robotNewDetails[axis] - 1;
    }
    return false;
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

    // log the scent
    if (direction === "N" || direction === "E") {
      lostRobot.lost[axis] = robotNewDetails[axis] - 1;
    } else if (direction === "S" || direction === "W") {
      lostRobot.lost[axis] = robotNewDetails[axis] + 1;
    }
    return lostRobot
  }

  return robotNewDetails;
}
