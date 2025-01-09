import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SelectOption from "../../Component/SelectOption";
import ImgReport from "../../Asset/mywork.png";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "./ReportView.css";
import ReusableModal from "../../Component/Modal";
import { DocsViewFunc, ClearState3 } from "../../Slice/DocsViewSlice";
import { Row, Col, Container } from "react-bootstrap";
function ReportView() {
  const dispatch = useDispatch();
  const iframeRef = useRef(null);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false); // Track if iframe is loaded
  const [show, setShow] = useState(false);
  const [viewData, setViewData] = useState({
    ReportType: null,
    Date: null,
    Vendor: null,
  });

  const [url, setUrl] = useState("");

  const { isloading3, Result3, error3, isError3, isSuccess3 } = useSelector(
    (state) => state.view
  );

  const InputHandler = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    let string = value.trim();
    setViewData({ ...viewData, [key]: string });
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    console.log(viewData);
    dispatch(DocsViewFunc(viewData));
    setShow(true);
  };
  const HandleClose = () => {
    setShow(false);
  };
  const PrinterHandler = (e) => {
    e.preventDefault();
    iframeRef.current.focus();

    if (isIframeLoaded) {
      iframeRef.current.contentWindow.print();
    } else {
      console.error("Iframe is not loaded yet or reference is missing");
    }
  };
  const handleIframeLoad = () => {
    setIsIframeLoaded(true);
  };

  useEffect(() => {
    if (isSuccess3 && !isloading3) {
      let string = encodeURIComponent(Result3?.Doc);
      setUrl(string);
    } else if (isError3 && !isloading3) {
      toast.error(error3, { autoClose: 6000, position: "top-right" });
    }
    dispatch(ClearState3());
  }, [isError3, isSuccess3, Result3?.Doc]);

  return (
    <div className="d-flex justify-content-center align-items-center fullBody">
      <Container fluid>
        <ToastContainer />
        <Row>
          <Col xl={5} lg={6} md={6} sm={12} xs={12}>
            <div className="mt-3 px-3 pb-4 pt-2 d-flex-column justify-content-start align-item-center  filter-box">
              <div style={{ color: "white", fontSize: "18px" }}>
                <i className="bi bi-funnel-fill"></i>
                <hr style={{ margin: 0 }} />
              </div>
              <form className="form-decor">
                {/* <div className="DateRange">
                  <label>Start Date </label>
                  <br />
                  <input
                    type="date"
                    name="StartDate"
                    onChange={InputHandler}
                    value={viewData?.StartDate}
                    className="DateInput"
                  />
                </div> */}

                <div className="DateRange">
                  <label>
                    Date
                    <br />{" "}
                  </label>
                  <input
                    type="date"
                    name="Date"
                    onChange={InputHandler}
                    className="DateInput"
                    value={viewData?.Date}
                  />
                </div>

                <div className="mb-3 DateRange">
                  <label>Report Type </label>
                  <SelectOption
                    Soptions={[
                      {
                        Name: "--Select Report Type--",
                        Value: -1,
                      },
                      {
                        Name: "Rookra Book Detail",
                        Value: "Rookra_Book_Detail",
                      },
                      {
                        Name: "Rookra Book Summary",
                        Value: "Rookra_Book_Summary",
                      },
                      {
                        Name: "Stock Book Summary",
                        Value: "Stock_Book_Summary",
                      },
                    ]}
                    SName={"ReportType"}
                    OnSelect={InputHandler}
                    Value={viewData?.ReportType}
                    PlaceHolder={"--Select Report Type--"}
                  />
                </div>

                <div className="DateRange mb-3">
                  <label>Vendor </label>
                  <SelectOption
                    Soptions={[
                      {
                        Name: "--Select Vendor--",
                        Value: -1,
                      },
                      {
                        Name: "NSPL",
                        Value: "NSPL",
                      },
                      {
                        Name: "EMRL",
                        Value: "EMRL",
                      },
                      {
                        Name: "BJPL",
                        Value: "BJPL",
                      },
                    ]}
                    SName={"Vendor"}
                    OnSelect={InputHandler}
                    Value={viewData?.Vendor || ""}
                    PlaceHolder={"--Select Vendor--"}
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center mx-5">
                  <div>
                    <button
                      className="btn bg-success-subtle"
                      type={"button"}
                      name={"Show"}
                      onClick={SubmitHandler}
                    >
                      Show
                    </button>
                  </div>
                  <div>
                    <button
                      className="btn bg-warning-subtle"
                      type={"button"}
                      name={"print"}
                      onClick={PrinterHandler}
                      disabled={!isIframeLoaded}
                    >
                      Print
                    </button>
                    <ReusableModal
                      Title={"Report"}
                      show={show}
                      handleClose={HandleClose}
                      body={
                        <div
                          style={{ height: "800px" }}
                          className="d-flex-column justify-content-start align-item-center text-center border mt-3"
                        >
                          {url !== undefined && url !== "" && url !== null ? (
                            <iframe
                              id="PdfFrame"
                              ref={iframeRef}
                              src={`http://api.nimbussystemscloud.com/images/${url}.pdf`}
                              title="W3Schools Free Online Web Tutorials"
                              style={{ height: "100%", width: "100%" }}
                              onLoad={handleIframeLoad}
                            ></iframe>
                          ) : (
                            <p>
                              Enter Date and Select Report type to View Report
                            </p>
                          )}
                        </div>
                      }
                    />
                  </div>
                </div>
              </form>
            </div>
          </Col>

          <Col xl={7} lg={6} md={6} sm={12} xs={12}>
            <img src={ImgReport} width={"100%"} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ReportView;
