import React from 'react';

function InputField({ label, value, onChange, type }) {
  return (
    <div>
      <label htmlFor="input-field">{label}</label>
      <input
        id="input-field"
        type={type}
        value={value}
        onChange={onChange}
        aria-label={label}
        style={{ marginLeft: '10px' }}
      />
    </div>
  );
}

export default InputField;
