import React from 'react';
import useStore from '../ZustandStore';

function PasswordDisplay() {
  const { password, passwordError } = useStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p>Generated Password:</p>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '10px',
        width: 'clamp(300px, 600px, 100vw)',
        height: '50px',
        color: 'black',
      }}>
      {password}
      </div>
      <p>Length: <b>{password.length}</b></p>
      {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

    </div>
  );
}

export default PasswordDisplay;
