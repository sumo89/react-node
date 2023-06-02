import React, { useState, useEffect } from "react";
import "./metricsWrap.css";

async function callAPI() {
  const options = {
    method: "GET",
    headers: {
      Authorization: "mysecrettoken",
    },
  };
  const response = await fetch("http://localhost:9091/metrics", options);
  const metrics = await response.text();
  return metrics;
}

// stolen off Stackoverflow, find the nth instance of the string
function nthIndex(str, pat, n) {
  var L = str.length,
    i = -1;
  while (n-- && i++ < L) {
    i = str.indexOf(pat, i);
    if (i < 0) break;
  }
  return i;
}

function createDataArray(newMetricsData) {
  // declare the data fields to display
  const dataFields = [
    "metric_process_cpu_user_seconds_total",
    "metric_process_cpu_system_seconds_total",
    "metric_process_cpu_seconds_total",
    "metric_process_start_time_seconds",
    "metric_process_resident_memory_bytes",
  ];

  let newFieldArray = [];
  for (let value of dataFields) {
    let field = value;
    let thirdInstanceOfField =
      nthIndex(newMetricsData, field, 3) + field.length;

    let fieldData = newMetricsData.slice(
      thirdInstanceOfField,
      thirdInstanceOfField + 10
    );

    const newFieldObject = { title: field, data: fieldData };
    newFieldArray.push(newFieldObject);
  }
  if (newFieldArray.length == dataFields.length) {
    return newFieldArray;
  }
}

function MetricsWrap(props) {
  let newMetricsData = "";
  const [dataFields, setDataFields] = useState([]);
  const [hideSpinner, setHideSpinner] = useState(true);

  const getMetricData = () => {
    setHideSpinner(false);
    callAPI().then((response) => {
      newMetricsData = response;
      setHideSpinner(true);
      setDataFields(createDataArray(newMetricsData));
    });
  };

  useEffect(() => {
    getMetricData();
    // redo this get every 30 seconds
    setInterval(() => {
      getMetricData();
    }, 30000);
  }, []);

  return (
    <div className="metrics-wrap">
      {dataFields.map((obj, index) => {
        return (
          <div key={index}>
            <h1>{obj.title}</h1>
            <h4>{obj.data}s</h4>
          </div>
        );
      })}
      <div className={`loader-wrap ${hideSpinner && "hidden"}`}>
        <span className="loader"></span>
      </div>
    </div>
  );
}
export default MetricsWrap;
