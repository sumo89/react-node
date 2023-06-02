import "./App.css";
import TimerWrap from "./components/timerWrap";
import MetricsWrap from "./components/metricsWrap";

function App(props) {
  return (
    // left side = epoch/browser time
    // right side = formatted code from /metrics.

    // display spinner while API request loading
    <div className="app-wrapper">
      <TimerWrap></TimerWrap>
      <MetricsWrap></MetricsWrap>
    </div>
  );
}

export default App;
