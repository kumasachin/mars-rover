import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid } from "../Grid/Grid";
import { Terminal } from "../Terminal/Terminal";
import RobotConfigForm from "../RobotConfigForm/RobotConfigForm";
import CONFIG from "../../config/"
import "./Planet.css";

const Planet = ({ name = "unknown surface", data = null }) => {
  const [robots, setMarsRobot] = useState(data);
  const [executionStatus, setExecutionStatus] = useState(false);
  const [isDataValid, setDataValidation] = useState(true);
  const [terminalInput, setTerminalInput] = useState([]);
  const [currentConfig, setCurrentConfig] = useState(null);

  // Initialize with default response
  const [response, setResponse] = useState({
    "map":{
       "x":16,
       "y":16
    },
    "lostCell":{
       "x":[
          
       ],
       "y":[
          
       ]
    },
    "robots":[
       {
          "name":"R1",
          "color":"green",
          "currentPosition":"0 0 N",
          "instructions":"FFFFFFFFFFFFFFFFFFF"
       },
       {
         "name":"R2",
         "color":"green",
         "currentPosition":"1 11 N",
         "instructions":"FRFFFFFFF"
      },
      {
        "name":"R3",
        "color":"blue",
        "currentPosition":"3 1 N",
        "instructions":"FFFFFFFFR"
     },
     {
       "name":"R4",
       "color":"blue",
       "currentPosition":"2 3 S",
       "instructions":"FFFFFFFFFFFFFFFFR"
    },
    {
      "name":"R5",
      "color":"blue",
      "currentPosition":"4 7 S",
      "instructions":"FFFFFFFFFFFFFFFFR"
   },
   {
     "name":"R6",
     "color":"blue",
     "currentPosition":"4 7 S",
     "instructions":"FFFFFFFFFFFFFFFFR"
  }
    ]
 });
  const onClickHandler = () => {
    setExecutionStatus(true);
  }

  const handleConfigSubmit = (newConfig) => {
    setResponse(newConfig);
    setExecutionStatus(false);
    setTerminalInput([]);
    setDataValidation(true);
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
        setCurrentConfig(response);
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
      console.error("Unknown error while rendering planet:", e);
    }
  }, [response]);

  if (!robots) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <h2>This is {name}</h2>
      <div className="controls">
        <RobotConfigForm 
          onConfigSubmit={handleConfigSubmit}
          initialConfig={currentConfig}
        />
        <button className="init" onClick={onClickHandler} type="button">Start Moving Robot</button>
      </div>
      <div className="column">
        <Terminal printLogs={terminalInput} />
      </div>
      <div className="column ">
          { 
            isDataValid ?
            <Grid
              dimension={response.map}
              robots={robots}
              lostCell={response.lostCell}
              executionStatus={executionStatus}
              errorHandler={errorHandler}
              onRobotAction={onRobotAction}
            /> : <div>There are some issues in provided data. Please provide correct data</div>
          }
      </div>
    </>
  );
};

Planet.propTypes = {
  name: PropTypes.string,
  data: PropTypes.array
};

Planet.defaultProps = {
  name: "unknown surface",
  data: null
};

export default Planet;
