import React, { useState } from "react";
import {
  Planet,
} from "./components/";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Planet name="Mars" />
    </div>
  );
}

export default App;
