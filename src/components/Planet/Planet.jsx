import React, { useState, useEffect } from "react";
import { Grid } from "../Grid/Grid";
import { useFetch } from "../../hooks/useFetch";
import path from "../../config/path"
import "./Planet.css";

const Planet = ({ name = "unKnown surface" }) => {
  const [robots, setMarsRobot] = useState(null);
  const [excutionStatus, setExcutionStatus] = useState(false);
  const { response } = useFetch(path.marsapi);
  const onClickHandler = () => {
    setExcutionStatus(true);
  }
  useEffect(() => {
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
      });

      setMarsRobot([...robots]);
    }
  }, [response]);

  if (!robots) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <h2>This is {name}</h2>
      <button onClick={onClickHandler} type="button">Start Moving Robot</button>
      <div className="row">
        <Grid
          dimension={response.map}
          robots={robots}
          lostCell={response.lostCell}
          excutionStatus={excutionStatus}
        />
      </div>
    </>
  );
};

export default Planet;
