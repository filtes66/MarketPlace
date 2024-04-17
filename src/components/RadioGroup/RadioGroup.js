import React, { useState, useRef } from "react";
import Radio from "../Radio/Radio";
import "./RadioGroup.css";

function RadioGroup(props) {
  const [selectedOption, setSelectedOption] = useState(props.initOption);
  const [buttonText, setButtonText] = useState({
    panier: "AJOUTER AU PANIER",
    x: 1,
  });
  const nbClickBut = useRef(1);
  console.log("props RadioGroup", props);

  function selectOption(e) {
    setSelectedOption(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    // buttonText.x++;
    nbClickBut.current++;
    console.log("buttontext.x", nbClickBut.current);
    //  if (buttonText.x === 3) props.onSubmit(selectedOption,x);
    props.onSubmit(selectedOption, nbClickBut.current);
  }

  function onButtonClick() {
    setButtonText({ ...buttonText, panier: "VOIR LE PANIER" });
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        {props.radios.map((radio, index) => (
          <div key={index} className="radioGroup">
            <Radio
              radio={radio}
              selectOption={selectOption}
              selectedOption={selectedOption}
            />
          </div>
        ))}
        <button
          type="submit"
          onClick={onButtonClick}
          className={
            buttonText.panier === "VOIR LE PANIER"
              ? "radioGroup__button radioGroup__button--modifier"
              : "radioGroup__button"
          }
        >
          {buttonText.panier}
        </button>
      </form>
    </div>
  );
}

export default RadioGroup;
