import React, {useState} from 'react';
import DisplayComponent from './Components/DisplayComponent';
import BtnComponent from './Components/BtnComponent';
import './App.css';

function App() {
  const [time, setTime] = useState({ms:0, s:0, m:0, h:0});
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  
  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };

  
  var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;
  
  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH});
  }

  function updatedAll () {
    updatedH = 0;
    updatedM = 0;
    updatedS = 0;
    updatedMs = 0;
  }
  
  const stop = () => {
    clearInterval(interv);
    setTime({ms:0, s:0, m:0, h:0});
    setStatus(0)
  };
  
  const reset = () => {
    // while(true){
      // debugger;
      clearInterval(interv);
      updatedAll();
      setTime({ms:0, s:0, m:0, h:0});
      start();
      
  }
  
  var statusWait = true;
  const wait = () => {
    if (statusWait) {
        clearInterval(interv)
        return statusWait = false;
    } else {
        start()
        statusWait = true;
    };
  }

  return (
  <div className="main-section">
    <div className="clock-holder">
      <div className="stopwatch">
        <DisplayComponent time={time}/>
        <BtnComponent status={status} wait={wait} reset={reset} stop={stop} start={start}/>
      </div>
    </div>  
  </div>
  );
}

export default App;
