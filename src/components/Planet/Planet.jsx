import React, { useState, useEffect } from "react";
import { Grid } from "../Grid/Grid";
import { Terminal } from "../Terminal/Terminal";
import {useFetch} from "../../hooks/use-fetch";
import CONFIG from "../../config/";
import LABELS from "../../copy/label";
import "./Planet.css";

const Planet = ({ name = "unKnown surface", data = null }) => {
  const [robots, setMarsRobot] = useState(null);
  const [excutionStatus, setExcutionStatus] = useState(0);
  const [isDataValid, setDataValidation] = useState(true);
  const [terminalInput, setTerminalInput] = useState([]);
  const {
    PAGE: {
      PLANET: {
        ACTBUTON01,
        ACTBUTON02,
        DATA_NOT_FOUND
      }
    },
    MESSAGE: {
      ERROR01,
      LOADING
    },
    DIRECTION: {
      LEFT,
      RIGHT,
      FRONT
    }
  } = LABELS;
  const { response } = useFetch(CONFIG.PATH.marsapi, null, excutionStatus);
  const onClickHandler = () => {
    if(excutionStatus < 1) {
     setExcutionStatus(excutionStatus + 1);
    } else {
      setMarsRobot(null);
      setExcutionStatus(excutionStatus + 1);
    }
  }
  const onRobotAction = (args) => {
    if (terminalInput.length === 0 || args.isLost || terminalInput[0].name !== args.name) {
      setTerminalInput([
        args,
        ...terminalInput,
      ]);
    }
  }

  const validateData = (robotdata) => {
    if (
      robotdata.x <= CONFIG.MAX_COORDINATE_LENGTH &&
      robotdata.y <= CONFIG.MAX_COORDINATE_LENGTH &&
      CONFIG.DIRECTIONS.includes(robotdata.d) &&
      robotdata.instructions.replaceAll(LEFT, "").replaceAll(RIGHT, "").replaceAll(FRONT, "").length === 0
    ) {
      return true;
    } 
    return false;
  }

  const errorHandler = () => {
    setDataValidation(true);
  }

  useEffect(() => {
    try {
      if (response) {
        const robots = response.robots;
        robots.forEach((robot, index) => {
          const position = robot.currentPosition.split(" ");
          robots[index] = {
            ...robot,
            x: parseInt(position[0]),
            y: parseInt(position[1]),
            d: position[2],
          };
          if (!validateData({...robots[index]})) {
            setDataValidation(false);
            return;
          };
        });

        setMarsRobot(robots);
      }
    } catch (e) {
      errorHandler();
      console.log(ERROR01);
    }
  }, [response]);

  return (
    <>
      <h2>This is {name}</h2>
      <button className="init" onClick={onClickHandler} type="button">{ACTBUTON01}</button>
      <div className="column">
        <Terminal printLogs={terminalInput} />
      </div>
      <div className="column ">
          {  
            (response && !robots) &&
            <div>{LOADING}</div>
          }
          { 
            (isDataValid && robots) &&
            <Grid
              dimension={response.map}
              robots={robots}
              lostCell={response.lostCell}
              excutionStatus={excutionStatus}
              errorHandler={errorHandler}
              onRobotAction={onRobotAction}
            /> 
          }
      </div>
    </>
  );
};

export default Planet;
