import React, { useState } from "react";
import {
  GridMap,
} from "./components/";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header>
        <h1 data-testid="application-heading">Mars Rover project</h1>
      </header>
      <GridMap name="Mars" />
    </div>
  );
}

export default App;
