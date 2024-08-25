import React from 'react';

function InputField({ label, value, onChange }) {
  return (
    <div>
      <label>{label}</label>
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
