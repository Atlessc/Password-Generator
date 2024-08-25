import React from 'react';
import useStore from '../ZustandStore';

function ActionButtons() {
  const { generatePassword, clearInputs, copyToClipboard } = useStore();

  return (
    <div>
      <button onClick={generatePassword}>Generate</button>
      <button onClick={generatePassword}>Regenerate</button>
      <button onClick={clearInputs}>Clear</button>
      <button onClick={copyToClipboard}>Copy</button>
    </div>
  );
}

export default ActionButtons;
