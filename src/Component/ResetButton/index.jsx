import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "./ResetButton.css";
function ResetButton({onClick,type,Buttonname}) {
  return (
    <div className="d-grid mt-3 mb-3">
      <button className="btn reset-btn-color" type={type} onClick={onClick}>
        {Buttonname?Buttonname:"Reset"}
      </button>
    </div>
  );
}

export default ResetButton;
