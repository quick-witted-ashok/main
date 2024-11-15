import React, { useState } from 'react';

const Counter=()=> {
  // Initialize the counter state with a value of 0
  const [count, setCount] = useState(0);

  // Function to increase the count
  const increase = () => setCount(count + 1);

  // Function to decrease the count, ensuring it doesn't go below 0
  const decrease = () => setCount(prevCount => Math.max(prevCount - 1, 0));

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
}

export default Counter;
