const CONFIG_KEY = 'mars_rover_config';

export const saveConfigToLocal = (config) => {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    return true;
  } catch (error) {
    console.error('Error saving configuration to localStorage:', error);
    return false;
  }
};

export const loadConfigFromLocal = () => {
  try {
    const savedConfig = localStorage.getItem(CONFIG_KEY);
    return savedConfig ? JSON.parse(savedConfig) : null;
  } catch (error) {
    console.error('Error loading configuration from localStorage:', error);
    return null;
  }
};

export const getDefaultConfig = () => ({
  map: {
    x: 16,
    y: 16
  },
  lostCell: {
    x: [],
    y: []
  },
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
});
