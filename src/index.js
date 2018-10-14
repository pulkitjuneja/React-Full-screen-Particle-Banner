import React from "react";
import ReactDOM from "react-dom";
import ParticleBackground from "./ParticleBackground";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <ParticleBackground>
        <h1>Hello CodeSandbox</h1>
      </ParticleBackground>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
