import React from "react";
import "./Radio.css";

function Radio({ text, radio, selectOption, selectedOption }) {
  return (
    <div className="radio" style={radio.style}>
      <div className="radio__radio-button">
        <input
          type="radio"
          name="photo"
          value={radio.value}
          checked={selectedOption === radio.value}
          onChange={(e) => selectOption(e)}
        />
      </div>
      <div className="radio__label">
        <label>{radio.prix}</label>
      </div>
    </div>
  );
}

export default Radio;
