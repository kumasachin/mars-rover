import { useState, useCallback } from 'react';
import { DEFAULT_MAP_SIZE, DEFAULT_ROBOT } from '../constants';

export const useRobotConfig = (initialConfig) => {
  const [mapConfig, setMapConfig] = useState(
    initialConfig?.map || DEFAULT_MAP_SIZE
  );
  
  const [robots, setRobots] = useState(
    initialConfig?.robots?.map(robot => {
      const [x, y, direction] = robot.currentPosition.split(" ");
      return {
        name: robot.name,
        color: robot.color,
        x: parseInt(x),
        y: parseInt(y),
        direction,
        instructions: robot.instructions
      };
    }) || [DEFAULT_ROBOT]
  );

  const updateMapConfig = useCallback((field, value) => {
    setMapConfig(prev => ({
      ...prev,
      [field]: parseInt(value) || 1
    }));
  }, []);

  const updateRobot = useCallback((index, field, value) => {
    setRobots(prev => {
      const updated = [...prev];
      if (field === 'x' || field === 'y') {
        updated[index][field] = parseInt(value) || 0;
      } else {
        updated[index][field] = value;
      }
      return updated;
    });
  }, []);

  const addRobot = useCallback(() => {
    const newRobot = {
      ...DEFAULT_ROBOT,
      name: `R${robots.length + 1}`,
      color: robots.length % 2 === 0 ? 'green' : 'blue'
    };
    setRobots(prev => [...prev, newRobot]);
  }, [robots.length]);

  const removeRobot = useCallback((index) => {
    if (robots.length > 1) {
      setRobots(prev => prev.filter((_, i) => i !== index));
    }
  }, [robots.length]);

  const getFormattedConfig = useCallback(() => {
    return {
      map: mapConfig,
      lostCell: { x: [], y: [] },
      robots: robots.map(robot => ({
        name: robot.name,
        color: robot.color,
        currentPosition: `${robot.x} ${robot.y} ${robot.direction}`,
        instructions: robot.instructions
      }))
    };
  }, [mapConfig, robots]);

  return {
    mapConfig,
    robots,
    updateMapConfig,
    updateRobot,
    addRobot,
    removeRobot,
    getFormattedConfig
  };
};
