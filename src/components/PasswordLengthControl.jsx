import React from 'react';
import useStore from '../ZustandStore';

function PasswordLengthControl() {
  const { passwordLength, setPasswordLength } = useStore();

  return (
    <div>
      <label>Password Length: {passwordLength}</label>
      {/* <input
        type="number"
        value={passwordLength}
        onChange={(e) => setPasswordLength(Number(e.target.value))}
        min="8"
        max="50"
      /> */}
      <input
        type="range"
        min="8"
        max="50"
        value={passwordLength}
        onChange={(e) => setPasswordLength(Number(e.target.value))}
      />
    </div>
  );
}

export default PasswordLengthControl;
