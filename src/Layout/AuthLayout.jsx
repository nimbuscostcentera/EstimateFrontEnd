import React from "react";
import { Outlet } from "react-router-dom";
import LoginHeader from "../Component/LoginHeader";
import SideImg from "../../src/Asset/meeting.webp";
import Footer from "../Component/Footer/Footer";
import "./AuthLayout.css";
function AuthLayout() {
  return (
    <div className="main-div">
      <LoginHeader />
      <div className="d-flex justify-content-center align-items-center sub-container">
        <div className="row">
          <div
            className="col-md-6 col-lg-6 col-xl-7 d-flex justify-content-center align-items-center"
            id="SidePage"
          >
            <div className="py-3 px-2 mt-3">
              <img src={SideImg} width="100%" alt="sideimg" id="sideimg" />
            </div>
          </div>
          <div
            className="col-sm-12 col-md-6 col-lg-6 col-xl-5 py-2 d-flex justify-content-center"
            id="formGrid"
          >
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AuthLayout;
