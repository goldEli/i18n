import React from "react";
import "./App.css";
import Home from "./Container/Home";

function App() {
  return (
    <div className="App">
      <p>这里是 App 组件</p>
      <div style={{ border: "1px solid red" }}>
        <h1>下面将展示 Home 组件</h1>
        <Home />
      </div>
    </div>
  );
}

export default App;
