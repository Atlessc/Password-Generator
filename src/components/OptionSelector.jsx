import React from 'react';
import useStore from '../ZustandStore';
import InputField from './InputField';

function OptionSelector() {
  const { options, toggleOptionSelection, setOption, setOptionLength, toggleDetails, requiredOptions, allowedOptions, highlightedOptions } = useStore();

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

  return (
    <div>
      {/* <p>Required Options: {requiredOptions}</p>
      <p>Allowed Options: {allowedOptions}</p>
      <p>Selected Options: {selectedOptionsCount}</p> */}
      {options.map((option, index) => (
        <div key={index} style={{ backgroundColor: highlightedOptions.includes(option.shortName) ? '#ffeb3b' : 'transparent', padding: '10px', marginBottom: '10px' }}>
          <label>
            <input
              type="checkbox"
              checked={option.selected}
              onChange={() => handleToggleSelection(index)}
            />
            {option.shortName}
          <br/>
          </label>
          <button onClick={() => toggleDetails(index)}>
            {option.showDetails ? "Hide Details" : "More Details"}
          </button>
          
          {option.selected && (
            <>
              <p>{option.label}</p>
              {console.log(`Rendering option: ${option.shortName}, Type: ${option.type}`)}
              {option.type === "range" && (
                <div>
                  <label>Length: </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={option.length}
                    onChange={(e) => setOptionLength(index, e.target.value)}
                  />
                  <span>{option.length}</span>
                </div>
              )}
              {option.type === "text" && (
                <InputField
                  label={option.label}
                  value={option.value}
                  onChange={(e) => setOption(index, e.target.value)}
                />
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default OptionSelector;
