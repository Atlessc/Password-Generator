/* eslint-disable react/prop-types */
import { useId } from 'react';

function InputField({ id, label, value, onChange, type }) {
  const generatedId = useId();
  const inputId = id || `input-field-${generatedId}`;

  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
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
