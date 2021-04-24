import React, { useState } from "react";
import {
  Planet,
} from "./components/";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header>
        <h1 data-testid="application-heading">Mars Rover project</h1>
      </header>
      <Planet name="Mars" />
    </div>
  );
}

export default App;
