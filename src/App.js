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

// Main App Component
const App = () => {
  const [counters, setCounters] = useState([]);
  const [total, setTotal] = useState(0);

  // Add new counter to the list
  const addCounter = () => {
    const newCounter = { id: Date.now(), value: 0 };
    setCounters((prevCounters) => [...prevCounters, newCounter]);
  };

  // Update the total whenever a counter value changes
  const updateTotalButton = (id, newValue) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.id === id ? { ...counter, value: newValue } : counter
      )
    );
  };

  // Update the total sum when counters change
  useEffect(() => {
    const totalSum = counters.reduce((acc, curr) => acc + curr.value, 0);
    setTotal(totalSum);
  }, [counters]);

  return (
    <div className="app-component">
      <div className="header-button">
        <button onClick={addCounter}>Add Counter</button>
        <h1 className="total-color">Total: {total}</h1>
      </div>
      <div className="counters">
        {counters.map((counter) => (
          <Counter
            key={counter.id}
            id={counter.id}
            updateTotal={updateTotalButton}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
