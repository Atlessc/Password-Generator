import React from 'react';
import useStore from '../ZustandStore';
import InputField from './InputField';

const specialCharacters = [
  '!', '@', '#', '$', '%', '^', '&', '*', '_', '+', '-', '=', '.', '/', '?'
];

function OptionSelector() {
  const {
    options,
    toggleOptionSelection,
    setOption,
    setOptionLength,
    toggleDetails,
    requiredOptions,
    allowedOptions,
    highlightedOptions
  } = useStore();

  const selectedOptionsCount = options.filter(option => option.selected).length;

  const handleToggleSelection = (index) => {
    const isSelected = options[index].selected;

    // Check if the current selection is within the allowed range
    if (isSelected || selectedOptionsCount < allowedOptions) {
      toggleOptionSelection(index);
    } else {
      console.error(`You can only select up to ${allowedOptions} options.`);
    }
  };

  // Handle change for general options
  const handleOptionChange = (index, value) => {
    setOption(index, value);
  };

  // Handle length change for general options
  const handleOptionLengthChange = (index, length) => {
    setOptionLength(index, length);
  };

  // Handle special character selection
  const handleSpecialCharacterChange = (index, char) => {
    setOption(index, char);
  };

  return (
    <div>
      {options.map((option, index) => (
        <div
          key={index}
          style={{
            backgroundColor: highlightedOptions.includes(option.shortName) ? '#ffeb3b' : 'transparent',
            padding: '10px',
            marginBottom: '10px'
          }}
        >
          <label>
            <input
              type="checkbox"
              checked={option.selected}
              onChange={() => handleToggleSelection(index)}
            />
            {option.shortName}
          </label>
          <button onClick={() => toggleDetails(index)}>
            {option.showDetails ? "Hide Details" : "More Details"}
          </button>

          {option.selected && (
            <>
              <p>{option.label}</p>

              {option.type === "number" && (

                <InputField
                  label={option.label}
                  value={option.value}
                  type="text"
                  onChange={(e) => handleOptionChange(index, e.target.value)} 
                />
              )}
                

              {option.type === "text" && option.shortName !== "Special Character" && (
                <InputField
                  label={option.label}
                  value={option.value}
                  type="text"
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              )}

              {/* Special Character Buttons */}
              {option.shortName === "Special Character" && (
                <div>
                  <p>Select a special character:</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {specialCharacters.map((char) => (
                      <button
                        key={char}
                        onClick={() => handleSpecialCharacterChange(index, char)}
                        style={{
                          padding: '5px',
                          fontSize: '16px',
                          cursor: 'pointer',
                          backgroundColor: option.value === char ? '#000' : '#fff',
                          color: option.value === char ? '#fff' : '#000',
                          border: '1px solid #000',
                          borderRadius: '4px'
                        }}
                      >
                        {char}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default OptionSelector;
