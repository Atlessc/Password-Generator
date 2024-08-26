import React from 'react';

function InputField({ label, value, onChange }) {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        style={{ marginLeft: '10px' }}
      />
    </div>
  );
}

export default InputField;
