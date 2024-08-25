import React from 'react';
import useStore from '../ZustandStore';

function PasswordExplanation() {
  const { passwordExplanation } = useStore();

  return (
    <div>
      <h3>Password Explanation:</h3>
      <ul>
        {passwordExplanation.map((explanation, index) => (
          <li key={index}>{explanation}</li>
        ))}
      </ul>
    </div>
  );
}

export default PasswordExplanation;
