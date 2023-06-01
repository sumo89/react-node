import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

async function callAPI() {
  const response = await fetch("http://localhost:9000/time");
  const users = await response.json();
  return users;
}

function App(props) {
  const [apiResponse, setApiResponse] = useState({ data: undefined });

  useEffect(() => {
    callAPI().then((response) => {
      console.log("> > > response ", response);
      setApiResponse(response);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
