import React, { useState, useEffect } from 'react';
import './App.css'; // Import for styles if needed
import Counter from "./Counter"

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
  const updateTotal = (id, newValue) => {
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
            updateTotal={updateTotal}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
