import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { ClearState } from "../../Slice/AuthSlice";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "./Sidebar.css";
import img from "../../Asset/Nimbus_Logo_Transparent_white.png";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <nav className="navbar navbar-expand-lg top-head sticky-top">
      <div className="container-fluid ">
        <div className="logo-box header-container">
          <a className="navbar-brand" href="https://www.nimbussystems.co.in/">
            <img src={img} alt="Nimbus System Pvt. Ltd." width="70%" />
          </a>
        </div>

        <button
          id="menu-button"
          className="navbar-toggler border border-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list"></i>
        </button>

        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Menu
            </h5>
            <button
              type="button"
              className="offcanvas-button"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <div className="vanising-div">
            <hr />
          </div>
          <div className="offcanvas-body float-end">
            <ul className="navbar-nav justify-content-end flex-grow-1">
              {userInfo?.details?.Utype === 1 ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      id="Admin-panel"
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      aria-current="page"
                      to="/auth"
                      end
                    >
                      Admin Panel
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      id="Admin-Reports"
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      aria-current="page"
                      to="/auth/view-reports"
                    >
                      Reports
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      aria-current="page"
                      id="Admin-Estimate"
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to="/auth/estimate"
                    >
                      Estimate
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      aria-current="page"
                      id="Admin-upload"
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to="/auth/upload-files"
                    >
                      Upload Report
                    </NavLink>
                  </li>
                  <li className="nav-item-dropdown dropdown mt-1">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link reg-link" : "nav-link"
                      }
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Registration
                    </NavLink>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li className="nav-item-dropdown">
                        <NavLink
                          aria-current="page"
                          to="/auth/company-registration"
                          className={({ isActive }) =>
                            isActive
                              ? "nav-anchor active-dropdown"
                              : "nav-anchor"
                          }
                        >
                          <i
                            className="bi bi-building-add"
                            style={{ fontSize: "20px", marginRight: "10px" }}
                          ></i>
                          Company
                        </NavLink>
                      </li>
                      <li className="nav-item-dropdown">
                        <NavLink
                          aria-current="page"
                          to="/auth/user-registration"
                          className={({ isActive }) =>
                            isActive
                              ? "nav-anchor active-dropdown"
                              : "nav-anchor"
                          }
                        >
                          <i
                            className="bi bi-person-fill-add"
                            style={{ fontSize: "20px", marginRight: "10px" }}
                          ></i>
                          User
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item-dropdown dropdown">
                    <a
                      className="dropdown-toggle nav-link"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="true"
                    >
                      <i
                        className="bi bi-person-circle"
                        style={{ fontSize: "20px" }}
                      ></i>
                    </a>

                    <ul className="dropdown-menu dropdown-menu-end">
                      <li className="nav-item-dropdown">
                        <a
                          className="nav-anchor"
                          onClick={() => {
                            dispatch(ClearState());
                            window.localStorage.clear();
                            navigate("/");
                          }}
                        >
                          <i
                            className="bi bi-box-arrow-right"
                            style={{ fontSize: "20px" }}
                          >
                            {" "}
                          </i>
                          Log Out
                        </a>
                      </li>
                      <li className="nav-item-dropdown">
                        <a className="nav-anchor">
                          {" "}
                          <i
                            className="bi bi-gear-fill"
                            style={{ fontSize: "20px", marginRight: "5px" }}
                          ></i>
                          Settings
                        </a>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to="/auth/estimate"
                    >
                      Estimate
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      to="/auth/upload-files"
                    >
                      Upload Report
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="bi bi-person-circle"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li className="nav-item-dropdown">
                        <a
                          className="nav-anchor"
                          onClick={() => {
                            dispatch(ClearState());
                            window.localStorage.clear();
                            navigate("/");
                          }}
                        >
                          <i
                            className="bi bi-box-arrow-right"
                            style={{ fontSize: "20px" }}
                          >
                            {" "}
                          </i>
                          Log Out
                        </a>
                      </li>
                      <li className="nav-item-dropdown">
                        <a className="nav-anchor">
                          {" "}
                          <i
                            className="bi bi-gear-fill"
                            style={{ fontSize: "20px", marginRight: "5px" }}
                          ></i>
                          Settings
                        </a>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
