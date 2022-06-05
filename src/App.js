import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { loadPlayer } from "rtsp-relay/browser";

function App() {
  useEffect(() => {
    loadPlayer({
      url: "ws://localhost:2000/api/stream",
      canvas: document.getElementById("canvas"),
    });
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      document.getElementById("canvas").style.display = "block";
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <canvas
        style={{ display: "block!important" }}
        id="canvas"
        width="1280"
        height="720"
      ></canvas>
    </div>
  );
}

export default App;
