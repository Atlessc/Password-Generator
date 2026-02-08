import React from 'react';
import useStore from '../ZustandStore';
import Tooltip from './UI54/Tooltip';

function PasswordExplanation() {
  const { password, passwordExplanation } = useStore();

  // Generate structured explanation parts
  const explanationParts = passwordExplanation.map((explanation, index) => {
    const [label, value] = explanation.split(':'); // Split explanation into label and value
    return { label: label.trim(), value: value.trim(), index };
  });

  return (
    <div style={{ textAlign: 'center', margin: '20px auto 60px auto', padding: '10px' }}>
      <h3 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>Password Explanation:</h3>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          fontSize: '20px',
          fontWeight: 'bold',
          fontFamily: 'monospace',
        }}
      >
        {explanationParts.map((part) => (
          <Tooltip
            key={part.index}
            text={
              <div>
                <strong>{part.label}</strong>
                <br />
                Original Data: {part.value}
              </div>
            }
            position="bottom"
            backgroundColor="#ff0000"
            opacity={1}
          >
            <span
              style={{
                padding: '8px 12px',
                borderRadius: '5px',
                backgroundColor: '#f3f4f6',
                border: '1px solid #d1d5db',
                cursor: 'pointer',
                color: '#111827',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#e5e7eb';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f3f4f6';
              }}
            >
              {part.value}
            </span>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}

export default PasswordExplanation;
