import React, { useState, useEffect } from "react";
import "./timerWrap.css";

// ● The most recently-fetched value for server time (retrieved by hitting endpoint /time),
// displayed in epoch seconds.

// ● The difference between current client machine time and the most recently-fetched
// value for server time in epoch seconds, formatted in stopwatch format (i.e.
// HH:mm:ss; a difference of 32 seconds would be 00:00:32, a difference of 0 seconds
// would be 00:00:00).

// ● The displayed difference should update once per second. Eg. An initial difference of
// 00:00:00 would change after one second to 00:00:01.

async function callAPI() {
  const options = {
    method: "GET",
    headers: {
      Authorization: "mysecrettoken",
    },
  };
  const response = await fetch("http://localhost:9000/time", options);

  const timeData = await response.json();
  return timeData;
}

function TimerWrap(props) {
  const [apiResponse, setApiResponse] = useState({ data: undefined });
  const [clientTime, setClientTime] = useState(Date.now());
  const [hideSpinner, setHideSpinner] = useState(true);

  const getTimeData = () => {
    setHideSpinner(false);
    callAPI().then((response) => {
      setHideSpinner(true);
      setApiResponse(response);
    });
  };

  useEffect(() => {
    getTimeData();
    // redo this get every 30 seconds
    setInterval(() => {
      getTimeData();
    }, 30000);

    // set current time every 1 second
    setInterval(() => setClientTime(Date.now()), 1000);
  }, []);

  let serverTime = apiResponse.epoch || 0,
    timeDifference = Math.round((clientTime - serverTime) / 1000),
    newDate = new Date(null);

  newDate.setSeconds(timeDifference);
  const result = newDate.toISOString().slice(11, 19);

  return (
    <div className="timer-wrap">
      <h1>Latest server time:</h1>
      <h4>{serverTime}s</h4>

      <h1>Your machine time:</h1>
      <h4>{clientTime}s</h4>

      <h1>Time since update:</h1>
      <h4>{result}</h4>
      <div className={`loader-wrap ${hideSpinner && "hidden"}`}>
        <span className="loader"></span>
      </div>
    </div>
  );
}
export default TimerWrap;
