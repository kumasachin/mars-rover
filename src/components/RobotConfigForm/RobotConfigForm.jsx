import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ROBOT_COLORS, DIRECTIONS, ERROR_MESSAGES, DEFAULT_ROBOT } from "../../constants";
import "./RobotConfigForm.css";

const RobotConfigForm = ({ onConfigSubmit, initialConfig }) => {
  const [mapConfig, setMapConfig] = useState({
    x: 16,
    y: 16
  });
  
  const [robots, setRobots] = useState([DEFAULT_ROBOT]);

  const [showForm, setShowForm] = useState(false);

  const colors = ROBOT_COLORS;
  const directions = DIRECTIONS;

  useEffect(() => {
    if (initialConfig) {
      setMapConfig(initialConfig.map);
      const formattedRobots = initialConfig.robots.map(robot => {
        const [x, y, direction] = robot.currentPosition.split(" ");
        return {
          name: robot.name,
          color: robot.color,
          x: parseInt(x),
          y: parseInt(y),
          direction,
          instructions: robot.instructions
        };
      });
      setRobots(formattedRobots);
    }
  }, [initialConfig]);

  const handleMapChange = (field, value) => {
    setMapConfig(prev => ({
      ...prev,
      [field]: parseInt(value) || 1
    }));
  };

  const handleRobotChange = (index, field, value) => {
    setRobots(prev => {
      const updated = [...prev];
      if (field === 'x' || field === 'y') {
        updated[index][field] = parseInt(value) || 0;
      } else {
        updated[index][field] = value;
      }
      return updated;
    });
  };

  const addRobot = () => {
    const newRobot = {
      ...DEFAULT_ROBOT,
      name: `R${robots.length + 1}`,
      color: colors[robots.length % colors.length]
    };
    setRobots([...robots, newRobot]);
  };

  const removeRobot = (index) => {
    if (robots.length > 1) {
      setRobots(robots.filter((_, i) => i !== index));
    }
  };

  const validateInstructions = (instructions) => {
    return /^[LRF]*$/.test(instructions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all instructions
    const invalidInstructions = robots.find(robot => !validateInstructions(robot.instructions));
    if (invalidInstructions) {
      alert(`${ERROR_MESSAGES.INVALID_INSTRUCTIONS} Robot: ${invalidInstructions.name}`);
      return;
    }

    // Check if robots are within map boundaries
    const outOfBounds = robots.find(robot => 
      robot.x >= mapConfig.x || robot.y >= mapConfig.y || robot.x < 0 || robot.y < 0
    );
    if (outOfBounds) {
      alert(`${ERROR_MESSAGES.OUT_OF_BOUNDS} Robot: ${outOfBounds.name}`);
      return;
    }

    // Format the configuration for submission
    const formattedConfig = {
      map: mapConfig,
      lostCell: {
        x: [],
        y: []
      },
      robots: robots.map(robot => ({
        name: robot.name,
        color: robot.color,
        currentPosition: `${robot.x} ${robot.y} ${robot.direction}`,
        instructions: robot.instructions
      }))
    };

    onConfigSubmit(formattedConfig);
    setShowForm(false);
  };

  return (
    <div className="robot-config-container">
      <button 
        className="config-toggle-btn"
        onClick={() => setShowForm(!showForm)}
        type="button"
      >
        {showForm ? 'Hide Configuration' : 'Configure Robots'}
      </button>

      {showForm && (
        <div className="config-form-overlay">
          <div className="config-form">
            <h3>Robot Configuration</h3>
            
            <form onSubmit={handleSubmit}>
              {/* Map Configuration */}
              <div className="form-section">
                <h4>Map Dimensions</h4>
                <div className="form-row">
                  <label>
                    Width (X):
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={mapConfig.x}
                      onChange={(e) => handleMapChange('x', e.target.value)}
                      required
                    />
                  </label>
                  <label>
                    Height (Y):
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={mapConfig.y}
                      onChange={(e) => handleMapChange('y', e.target.value)}
                      required
                    />
                  </label>
                </div>
              </div>

              {/* Robots Configuration */}
              <div className="form-section">
                <h4>Robots</h4>
                {robots.map((robot, index) => (
                  <div key={index} className="robot-form">
                    <div className="robot-header">
                      <h5>Robot {index + 1}</h5>
                      {robots.length > 1 && (
                        <button
                          type="button"
                          className="remove-robot-btn"
                          onClick={() => removeRobot(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="form-row">
                      <label>
                        Name:
                        <input
                          type="text"
                          value={robot.name}
                          onChange={(e) => handleRobotChange(index, 'name', e.target.value)}
                          required
                        />
                      </label>
                      <label>
                        Color:
                        <select
                          value={robot.color}
                          onChange={(e) => handleRobotChange(index, 'color', e.target.value)}
                        >
                          {colors.map(color => (
                            <option key={color} value={color}>{color}</option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <div className="form-row">
                      <label>
                        X Position:
                        <input
                          type="number"
                          min="0"
                          max={mapConfig.x - 1}
                          value={robot.x}
                          onChange={(e) => handleRobotChange(index, 'x', e.target.value)}
                          required
                        />
                      </label>
                      <label>
                        Y Position:
                        <input
                          type="number"
                          min="0"
                          max={mapConfig.y - 1}
                          value={robot.y}
                          onChange={(e) => handleRobotChange(index, 'y', e.target.value)}
                          required
                        />
                      </label>
                      <label>
                        Direction:
                        <select
                          value={robot.direction}
                          onChange={(e) => handleRobotChange(index, 'direction', e.target.value)}
                        >
                          {directions.map(dir => (
                            <option key={dir} value={dir}>{dir}</option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <div className="form-row">
                      <label>
                        Instructions (L=Left, R=Right, F=Forward):
                        <input
                          type="text"
                          value={robot.instructions}
                          onChange={(e) => handleRobotChange(index, 'instructions', e.target.value.toUpperCase())}
                          pattern="[LRF]*"
                          title="Only L, R, F characters are allowed"
                          required
                        />
                      </label>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  className="add-robot-btn"
                  onClick={addRobot}
                >
                  Add Robot
                </button>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Apply Configuration
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

RobotConfigForm.propTypes = {
  onConfigSubmit: PropTypes.func.isRequired,
  initialConfig: PropTypes.shape({
    map: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    robots: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string,
      currentPosition: PropTypes.string,
      instructions: PropTypes.string
    }))
  })
};

export default RobotConfigForm;
