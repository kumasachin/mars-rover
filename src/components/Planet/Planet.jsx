import React, { useState, useEffect } from "react";
import { Grid } from "../Grid/Grid";
import {useFetch} from "../../hooks/use-fetch";
import CONFIG from "../../config/"
import "./Planet.css";

const Planet = ({ name = "unKnown surface", data = null }) => {
  const [robots, setMarsRobot] = useState(data);
  const [excutionStatus, setExcutionStatus] = useState(false);
  const [isDataValid, setDataValidation] = useState(true);
  const { response } = useFetch(CONFIG.PATH.marsapi);
  const onClickHandler = () => {
    setExcutionStatus(true);
  }

  const validateData = (robotdata) => {
    if (
      robotdata.x <= CONFIG.MAX_COORDINATE_LENGTH &&
      robotdata.y <= CONFIG.MAX_COORDINATE_LENGTH &&
      CONFIG.DIRECTIONS.includes(robotdata.d) &&
      robotdata.instructions.replaceAll("L", "").replaceAll("R", "").replaceAll("F", "").length === 0
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
        const robots = [...response.robots];
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

        setMarsRobot([...robots]);
      }
    } catch (e) {
      errorHandler();
      console.log("unknow error while rendering planet");
    }
  }, [response]);

  if (!robots) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <h2>This is {name}</h2>
      <button className="init" onClick={onClickHandler} type="button">Start Moving Robot</button>
      <div className="row">
        { 
          isDataValid ?
          <Grid
            dimension={response.map}
            robots={robots}
            lostCell={response.lostCell}
            excutionStatus={excutionStatus}
            errorHandler={errorHandler}
          /> : <div>There are some issues in provided data. Please provide correct data</div>
        }
      </div>
    </>
  );
};

export default Planet;
