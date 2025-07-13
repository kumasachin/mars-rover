// Application constants
export const ROBOT_MOVE_DELAY = 300;
export const DEFAULT_MAP_SIZE = { x: 16, y: 16 };
export const ROBOT_COLORS = ["green", "blue", "red", "yellow", "purple", "orange"];
export const DIRECTIONS = ["N", "S", "E", "W"];
export const INSTRUCTIONS = ["L", "R", "F"];

// Error messages
export const ERROR_MESSAGES = {
  INVALID_INSTRUCTIONS: "Invalid instructions. Only L, R, F are allowed.",
  OUT_OF_BOUNDS: "Robot is outside map boundaries.",
  UNKNOWN_ERROR: "An unknown error occurred"
};

// Default robot configuration
export const DEFAULT_ROBOT = {
  name: "R1",
  color: "green",
  x: 0,
  y: 0,
  direction: "N",
  instructions: "F"
};
