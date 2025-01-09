import React from "react";
import "./RadioButton.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "bootstrap-icons/font/bootstrap-icons.min.css";
function RadioButton({ OptionArray=[],OnClick,RName }) {
  return (
    <div className="container-fluid d-flex justify-content-start align-items-center flex-wrap mt-2">
      {OptionArray?.map((item,index) => {
        return (
          <div className="px-3 mt-2" key={index}>
            <label className="text-secondary fs-6" htmlFor="flexRadioDefault1">
              <input
                type="radio"
                name={RName}
                value={item}
                id={`radio${index}`}
                onChange={OnClick}
              />
              &nbsp;
              {item}
            </label>
          </div>
        );
      })}
    </div>
  );
}

export default RadioButton;
