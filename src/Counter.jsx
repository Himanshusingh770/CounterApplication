import React, { useState, useEffect } from 'react';
import './App.css'; // Import for styles if needed

// Counter Component
const Counter = ({ id, updateTotal }) => {
  const [count, setCount] = useState(0);
  const [counterRunning, setcounterRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Handle start/stop for individual counter
  const handleStartStop = () => {
    if (counterRunning) {
      clearInterval(intervalId);  // Stop the interval
      setcounterRunning(false);
    } else {
      const newIntervalId = setInterval(() => {
        setCount((prevCount) => {
          const newValue = prevCount + 1;
          updateTotal(id, newValue);  // Update the total count in parent
          return newValue;
        });
      }, 1000);  // Increment every 1 second
      setIntervalId(newIntervalId);
      setcounterRunning(true);
    }
  };

  // Clean up the interval when the counter is removed or stopped
  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  return (
    <div className="counter">
      <button onClick={handleStartStop}>
        {counterRunning ? 'Stop Counter' : 'Start Counter'}
      </button>
      <div>{count}</div>
    </div>
  );
};
export default Counter;