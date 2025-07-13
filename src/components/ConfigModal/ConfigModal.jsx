import React, { useState, useEffect } from 'react';
import './ConfigModal.css';

const ConfigModal = ({ isOpen, onClose, onSave, currentConfig }) => {
  const [config, setConfig] = useState({
    map: { x: 16, y: 16 },
    lostCell: { x: [], y: [] },
    robots: [
      {
        name: "R1",
        color: "green",
        currentPosition: "0 0 N",
        instructions: "FFFFFFFFFFFFFFFFFFF"
      }
    ]
  });

  useEffect(() => {
    if (currentConfig) {
      setConfig(currentConfig);
    }
  }, [currentConfig]);

  const handleMapChange = (dimension, value) => {
    setConfig(prev => ({
      ...prev,
      map: {
        ...prev.map,
        [dimension]: parseInt(value) || 0
      }
    }));
  };

  const handleRobotChange = (index, field, value) => {
    setConfig(prev => ({
      ...prev,
      robots: prev.robots.map((robot, i) => 
        i === index ? { ...robot, [field]: value } : robot
      )
    }));
  };

  const addRobot = () => {
    const newRobot = {
      name: `R${config.robots.length + 1}`,
      color: "blue",
      currentPosition: "0 0 N",
      instructions: "F"
    };
    setConfig(prev => ({
      ...prev,
      robots: [...prev.robots, newRobot]
    }));
  };

  const removeRobot = (index) => {
    if (config.robots.length > 1) {
      setConfig(prev => ({
        ...prev,
        robots: prev.robots.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  const handleReset = () => {
    const defaultConfig = {
      map: { x: 16, y: 16 },
      lostCell: { x: [], y: [] },
      robots: [
        {
          name: "R1",
          color: "green",
          currentPosition: "0 0 N",
          instructions: "FFFFFFFFFFFFFFFFFFF"
        },
        {
          name: "R2",
          color: "green",
          currentPosition: "1 11 N",
          instructions: "FRFFFFFFF"
        },
        {
          name: "R3",
          color: "blue",
          currentPosition: "3 1 N",
          instructions: "FFFFFFFFR"
        },
        {
          name: "R4",
          color: "blue",
          currentPosition: "2 3 S",
          instructions: "FFFFFFFFFFFFFFFFR"
        },
        {
          name: "R5",
          color: "blue",
          currentPosition: "4 7 S",
          instructions: "FFFFFFFFFFFFFFFFR"
        },
        {
          name: "R6",
          color: "blue",
          currentPosition: "4 7 S",
          instructions: "FFFFFFFFFFFFFFFFR"
        }
      ]
    };
    setConfig(defaultConfig);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Mars Rover Configuration</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          {/* Map Configuration */}
          <div className="config-section">
            <h3>Map Dimensions</h3>
            <div className="input-group">
              <label>
                Width (X):
                <input
                  type="number"
                  value={config.map.x}
                  onChange={(e) => handleMapChange('x', e.target.value)}
                  min="1"
                  max="50"
                />
              </label>
              <label>
                Height (Y):
                <input
                  type="number"
                  value={config.map.y}
                  onChange={(e) => handleMapChange('y', e.target.value)}
                  min="1"
                  max="50"
                />
              </label>
            </div>
          </div>

          {/* Robots Configuration */}
          <div className="config-section">
            <div className="section-header">
              <h3>Robots Configuration</h3>
              <button className="add-robot-btn" onClick={addRobot}>Add Robot</button>
            </div>
            
            {config.robots.map((robot, index) => (
              <div key={index} className="robot-config">
                <div className="robot-header">
                  <h4>Robot {index + 1}</h4>
                  {config.robots.length > 1 && (
                    <button 
                      className="remove-robot-btn"
                      onClick={() => removeRobot(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="robot-fields">
                  <label>
                    Name:
                    <input
                      type="text"
                      value={robot.name}
                      onChange={(e) => handleRobotChange(index, 'name', e.target.value)}
                    />
                  </label>
                  
                  <label>
                    Color:
                    <select
                      value={robot.color}
                      onChange={(e) => handleRobotChange(index, 'color', e.target.value)}
                    >
                      <option value="green">Green</option>
                      <option value="blue">Blue</option>
                      <option value="red">Red</option>
                      <option value="yellow">Yellow</option>
                      <option value="purple">Purple</option>
                    </select>
                  </label>
                  
                  <label>
                    Starting Position (X Y Direction):
                    <input
                      type="text"
                      value={robot.currentPosition}
                      onChange={(e) => handleRobotChange(index, 'currentPosition', e.target.value)}
                      placeholder="e.g., 0 0 N"
                    />
                  </label>
                  
                  <label>
                    Instructions:
                    <input
                      type="text"
                      value={robot.instructions}
                      onChange={(e) => handleRobotChange(index, 'instructions', e.target.value)}
                      placeholder="e.g., FFFRRRLLL"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="reset-btn" onClick={handleReset}>Reset to Default</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={handleSave}>Save Configuration</button>
        </div>
      </div>
    </div>
  );
};

export default ConfigModal;
