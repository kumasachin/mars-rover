import React, { useState, useEffect } from "react";
import { Grid } from "../Grid/Grid";
import { Terminal } from "../Terminal/Terminal";
import ConfigModal from "../ConfigModal/ConfigModal";
import {useFetch} from "../../hooks/use-fetch";
import CONFIG from "../../config/"
import { saveConfigToLocal, loadConfigFromLocal, getDefaultConfig } from "../../utils/configStorage";
import "./Planet.css";

const Planet = ({ name = "unKnown surface", data = null }) => {
  const [robots, setMarsRobot] = useState(data);
  const [excutionStatus, setExcutionStatus] = useState(false);
  const [isDataValid, setDataValidation] = useState(true);
  const [terminalInput, setTerminalInput] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [response, setResponse] = useState(getDefaultConfig());

  const onClickHandler = () => {
    setExcutionStatus(true);
  }

  const handleConfigSave = (newConfig) => {
    // Reset execution status and terminal when config changes
    setExcutionStatus(false);
    setTerminalInput([]);
    setResponse(newConfig);
    saveConfigToLocal(newConfig);
  }

  const handleModalOpen = () => {
    setIsModalOpen(true);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
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

  // Load saved configuration on component mount
  useEffect(() => {
    const savedConfig = loadConfigFromLocal();
    if (savedConfig) {
      setResponse(savedConfig);
    }
  }, []);

  useEffect(() => {
    try {
      if (response) {
        // Reset execution status when configuration changes
        setExcutionStatus(false);
        
        const robots = [...response.robots];
        robots.forEach((robot, index) => {
          const position = robot.currentPosition.split(" ");
          robots[index] = {
            ...robot,
            x: parseInt(position[0]),
            y: parseInt(position[1]),
            d: position[2],
            // Reset robot to initial state
            instructionIndex: 0,
            isLost: false,
            path: []
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
      <div className="control-buttons">
        <button className="init" onClick={onClickHandler} type="button">Start Moving Robot</button>
        <button className="config" onClick={handleModalOpen} type="button">Configure Robots</button>
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
              excutionStatus={excutionStatus}
              errorHandler={errorHandler}
              onRobotAction={onRobotAction}
            /> : <div>There are some issues in provided data. Please provide correct data</div>
          }
      </div>
      <ConfigModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleConfigSave}
        currentConfig={response}
      />
    </>
  );
};

export default Planet;
