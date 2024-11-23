import React, { useState, useEffect } from 'react';

function DebouncedInput() {
  const [inputValue, setInputValue] = useState(''); // For user input
  const [debouncedValue, setDebouncedValue] = useState(''); // For delayed state

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue); // Update the delayed state
    }, 500); // Delay in milliseconds (e.g., 500ms)

    // Cleanup function to clear the timeout if inputValue changes
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]); // The effect runs whenever inputValue changes

  const handleChange = (event) => {
    setInputValue(event.target.value); // Update the inputValue state immediately on change
  };

  return (
    <div>
      <input 
        type="text" 
        value={inputValue} 
        onChange={handleChange} 
        placeholder="Type something..." 
      />
      <p>Debounced Value: {debouncedValue}</p>
    </div>
  );
}

export default DebouncedInput;
