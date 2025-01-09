import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "./SubmitButton.css";
function SubmitButton({ type, OnClickBtn, isdisable,ButtonNm }) {
  return (
    <div className="d-grid mt-3 mb-3">
      <button
        className="btn color-btn"
        type={type}
        onClick={OnClickBtn}
        disabled={isdisable}
      >
        {ButtonNm?ButtonNm:"Submit"}
      </button>
    </div>
  );
}

export default SubmitButton