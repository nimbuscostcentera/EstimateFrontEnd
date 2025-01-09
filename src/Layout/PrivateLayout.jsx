import React from 'react'
import Sidebar from '../Component/Sidebar'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./AuthLayout.css";
function PrivateWrapper({ children }) {
  return (
    <div className=".main-div">
      <Sidebar />
      <div className="inner-layout mx-4">
        <div>{children}</div>
      </div>
      <div className="d-flex justify-content-center align-items-center pt-1 pb-2 mt-3 fs-md-6 " style={{fontSize:"12px"}}>
        Copyright&copy;<a href="#">Nimbus System Pvt. Ltd. </a>2024
      </div>
    </div>
  );
}

export default PrivateWrapper;