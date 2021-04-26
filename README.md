# mars-robot-tracker
 project to track mars robots position and moving them
### Quickstart
Node.js is the only global dependency for this project. Please install node > 12 with npm.
    npm install

### running on local
    'node server' to run local server
    'npm start' to run actual application which will launch "localhost:3000"
    "Click on start" moving robot

### application backend
    change in src/data/mars-robot.json for any change related with applicaiton

    -> below will define map dimension
    map":{
       "x":16,
       "y":16
    },

    -> below will define robot and their movement
        "robots":[
       {
          "name":"Chintu1",
          "color":"green",
          "currentPosition":"0 0 N",
          "instructions":"FFFFFFFFFFFFFFFFFFF"
       },
       {

### Testing
Jasmine specs are located alongside the modules they're testing, and follow the naming convention *_spec.js.
To run tests and rerun when files change:
    npm test


