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
        (gridMap.y <= robotNewDetails.y+1 || robotNewDetails.y === 0)
          ? robotNewDetails.y 
          : robotNewDetails.y + 1;

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
        robotNewDetails.y =
        checkCurrentIsLostCell(lostCell, "y", robotNewDetails) &&
        (gridMap.y < robotNewDetails.y -1 || robotNewDetails.y === 0)
          ? robotNewDetails.y 
          : robotNewDetails.y- 1 ;

      if (gridMap.y <= robotNewDetails.y || robotNewDetails.y < 0) {
        console.log("y", robotNewDetails.y + 1);
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
        robotNewDetails.x =
        checkCurrentIsLostCell(lostCell, "x", robotNewDetails) &&
        (gridMap.x < robotNewDetails.x+1 || robotNewDetails.x === 0)
          ? robotNewDetails.x 
          : robotNewDetails.x+ 1;

      if (gridMap.x <= robotNewDetails.x || robotNewDetails.x < 0) {
        console.log("x", robotNewDetails.x - 1);
        robotNewDetails = {
          ...robotNewDetails,
          //  y: newPosition.x - 1,
          lost: {
            y: robotNewDetails.y,
            x: robotNewDetails.x - 1,
          },
        };
      }
      break;
    case "W":
        robotNewDetails.x =
        checkCurrentIsLostCell(lostCell, "x", robotNewDetails) &&
        (gridMap.x <= robotNewDetails.x-1 || robotNewDetails.x === 0)
          ? robotNewDetails.x
          : robotNewDetails.x - 1;

      if (gridMap.x < robotNewDetails.x || robotNewDetails.x < 0) {
        console.log("x", robotNewDetails.x + 1);

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
  const lostCellFound = lostCell[typeOfCoordinates] && lostCell[typeOfCoordinates].includes(newPosition[typeOfCoordinates]);
  //console.log("£££££££££££££££££££££££££££££££££££££££££££",  lostCell, typeOfCoordinates, lostCell[typeOfCoordinates]);

  if( lostCell[typeOfCoordinates] ) {
    ////console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",lostCell[typeOfCoordinates].includes(newPosition[typeOfCoordinates]))
  }
  if (lostCellFound) {
    ////console.log("#######################Lost Cell##################################", newPosition)
  }
  return lostCellFound;
};

// export const robotUtils = (
//   currentPosition,
//   instructions,
//   gridMap,
//   lostCell
// ) => {
//   const currentPosArray = currentPosition.split(" ");
//   let newPosition = {
//     x: parseInt(currentPosArray[0]),
//     y: parseInt(currentPosArray[1]),
//     d: currentPosArray[2],
//   };

//   [...instructions].some((nextInstruction, index) => {
//     if (nextInstruction === "L") {
//       newPosition.d = LEFT_TURNS_MAP[newPosition.d];
//     } else if (nextInstruction === "R") {
//       newPosition.d = RIGHT_TURNS_MAP[newPosition.d];
//     } else if (nextInstruction === "F") {
//       const newPositionWithDirection = frontMove(
//         newPosition.d,
//         newPosition,
//         gridMap,
//         lostCell
//       );
//       newPosition = {
//         ...newPosition,
//         ...newPositionWithDirection,
//       };
//     }
//     return typeof newPosition.lost !== "undefined";
//   });

//   return newPosition;
// };

//export default robotUtils;
