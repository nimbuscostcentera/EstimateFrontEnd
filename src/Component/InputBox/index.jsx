import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "./InputBox.css";
import { Button } from "react-bootstrap";

function InputBox({
  Icon,
  type,
  placeholder,
  label,
  Name,
  onChange,
  error,
  errorMsg,
  maxlen,
  value,
  InputStyle,
  OnClick,
  SearchButton,
  SearchHandler,
}) {
  return (
    <>
      <div className="input-group flex-nowrap my-1">
        <span className="input-group-text color-label" id="addon-wrapping">
          {Icon}
        </span>
        <input
          value={value}
          type={type}
          className="form-input"
          placeholder={placeholder}
          aria-label={label}
          onChange={onChange}
          name={Name}
          maxLength={maxlen}
          style={InputStyle}
          onClick={type === "button" ? OnClick : () => {}}
        />
        {SearchButton ? (
          <Button className="search" onClick={SearchHandler} style={{padding:"1px 6px"}}>
            <i className="bi bi-search"></i>
          </Button>
        ) : null}
      </div>
      <div
        style={{
          visibility: error ? "inherit" : "hidden",
          color: "red",
          fontSize: "12px",
        }}
      >
        {errorMsg}
      </div>
    </>
  );
}

export default InputBox;
