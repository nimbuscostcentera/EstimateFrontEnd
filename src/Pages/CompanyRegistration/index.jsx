import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col } from "react-bootstrap";

import InputBox from "../../Component/InputBox";
import SubmitButton from "../../Component/SubmitButton";
import SelectOption from "../../Component/SelectOption";
import ResetButton from "../../Component/ResetButton";
import UserImg from "../../Asset/Daco_1063376.png";
import JobImg from "../../Asset/job.png";
import PhnoValidation from "../../GlobalFunctions/PhnoValidation";
import PanCardValidation from "../../GlobalFunctions/PanCardValidation";
import GSTINValidation from "../../GlobalFunctions/GSTINValidation";

import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "./comreg.css";

import { ClearState15, CompanyRegFunc } from "../../Slice/CompanyRegSlice";

function CompanyRegistration() {
  const dispatch = useDispatch();
  const { isloading15, isSuccess15, error15, Result15, isError15 } =
    useSelector((state) => state.compreg);
  const [regData, setRegData] = useState({
    GSTIN: null,
    PANNo: null,
    companyName: null,
    LoginCode: null,
    Address: null,
    ContactNumber: null,
    Country: null,
    state: null,
  });
  const [inputVal, setInputVal] = useState({
    GSTIN: true,
    PANno: true,
    ContactNumber: true,
  });
  const SubmitHandler = (e) => {
    e.preventDefault();
    dispatch(CompanyRegFunc(regData));
  };
  const InputHandler = (e) => {
    let value = e.target.value;
    let key = e.target.name;
    setRegData({ ...regData, [key]: value });
  };
  useEffect(() => {
    if (isSuccess15 && !isloading15) {
      toast.success(Result15, { autoClose: 5000, position: "top-right" });
      setRegData({
        GSTIN: null,
        PANNo: null,
        companyName: null,
        LoginCode: null,
        Address: null,
        ContactNumber: null,
        Country: null,
        state: null,
      });
      setInputVal({
        GSTIN: true,
        PANno: true,
        ContactNumber: true,
      });
    }
    if (isError15 && !isloading15) {
      toast.error(error15, { autoClose: 5000, position: "top-right" });
    }
    dispatch(ClearState15());
  }, [isSuccess15, isError15, isloading15]);
  return (
    <div className="container-fluid">
      <ToastContainer />
      <div className="row">
        <div className="col-md-7 d-flex justify-content-center align-items-center">
          <div className="form_wrapper mt-4">
            <div className="form_container">
              <div className="d-flex justify-content-center align-items-center">
                <img src={UserImg} alt="adduser" width="15%" />
              </div>
              <div className="title_container">
                <h3>Company Registration Form</h3>
              </div>
              <form>
                <Container>
                  <Row>
                    <Col>
                      <InputBox
                        Icon={<i className="bi bi-building-fill-check"></i>}
                        type={"text"}
                        placeholder={"Company Name"}
                        label={"companyName"}
                        Name={"companyName"}
                        value={regData?.companyName || ""}
                        maxlen={50}
                        error={false}
                        errorMsg={"enter Correct Company Name"}
                        onChange={InputHandler}
                      />
                      <InputBox
                        Icon={<i className="bi bi-credit-card-2-back"></i>}
                        type={"text"}
                        placeholder={"GSTIN"}
                        label={"GSTIN"}
                        value={regData?.GSTIN || ""}
                        Name={"GSTIN"}
                        error={!inputVal?.GSTIN}
                        errorMsg={"Enter Correct GSTIN"}
                        maxlen={15}
                        onChange={(e) => {
                          if (
                            e?.target?.value !== "" &&
                            e?.target?.value !== null &&
                            e?.target?.value !== undefined
                          ) {
                            let res = GSTINValidation(e?.target?.value);
                            setInputVal({ ...inputVal, GSTIN: res });
                          } else {
                            setInputVal({ ...inputVal, GSTIN: true });
                          }
                          InputHandler(e);
                        }}
                      />
                      <InputBox
                        Icon={<i className="bi bi-credit-card-2-back"></i>}
                        type={"text"}
                        placeholder={"PANNo"}
                        label={"PANno"}
                        value={regData?.PANNo || ""}
                        Name={"PANNo"}
                        error={!inputVal?.PANno}
                        errorMsg={"Enter Correct PANno"}
                        maxlen={10}
                        onChange={(e) => {
                          if (
                            e?.target?.value !== "" &&
                            e?.target?.value !== null &&
                            e?.target?.value !== undefined
                          ) {
                            let res = PanCardValidation(e?.target?.value);
                            setInputVal({ ...inputVal, PANno: res });
                          } else {
                            setInputVal({ ...inputVal, PANno: true });
                          }
                          InputHandler(e);
                        }}
                      />
                      <InputBox
                        Icon={<i className="bi bi-braces-asterisk"></i>}
                        type={"text"}
                        placeholder={"CompanyCode"}
                        label={"CompanyCode"}
                        Name={"CompanyCode"}
                        value={regData?.CompanyCode || ""}
                        maxlen={50}
                        error={false}
                        errorMsg={"enter Correct CompanyCode"}
                        onChange={InputHandler}
                      />
                    </Col>
                    <Col>
                      {" "}
                      <InputBox
                        Icon={<i className="bi bi-globe"></i>}
                        type={"text"}
                        placeholder={"Country"}
                        label={"Country"}
                        Name={"Country"}
                        value={regData?.Country || ""}
                        maxlen={50}
                        error={false}
                        errorMsg={"enter Correct Company Name"}
                        onChange={InputHandler}
                      />
                      <InputBox
                        Icon={<i className="bi bi-airplane-fill"></i>}
                        type={"text"}
                        placeholder={"state"}
                        label={"state"}
                        Name={"state"}
                        value={regData?.state || ""}
                        maxlen={50}
                        error={false}
                        errorMsg={"enter Correct state"}
                        onChange={InputHandler}
                      />
                      <InputBox
                        Icon={<i className="bi bi-braces-asterisk"></i>}
                        type={"text"}
                        placeholder={"LoginCode"}
                        label={"LoginCode"}
                        Name={"LoginCode"}
                        value={regData?.LoginCode || ""}
                        maxlen={50}
                        error={false}
                        errorMsg={"enter Correct LoginCode"}
                        onChange={InputHandler}
                      />
                      <InputBox
                        Icon={<i className="bi bi-credit-card-2-back"></i>}
                        type={"text"}
                        placeholder={"ContactNumber"}
                        label={"ContactNumber"}
                        value={regData?.ContactNumber || ""}
                        Name={"ContactNumber"}
                        error={!inputVal?.ContactNumber}
                        errorMsg={"Enter Correct PANno"}
                        maxlen={10}
                        onChange={(e) => {
                          if (
                            e?.target?.value !== "" &&
                            e?.target?.value !== null &&
                            e?.target?.value !== undefined
                          ) {
                            let res = PhnoValidation(e?.target?.value);
                            setInputVal({ ...inputVal, PANno: res });
                          } else {
                            setInputVal({ ...inputVal, PANno: true });
                          }
                          InputHandler(e);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <InputBox
                        Icon={<i className="bi bi-geo-alt-fill"></i>}
                        type={"text"}
                        placeholder={"Address"}
                        label={"Address"}
                        Name={"Address"}
                        value={regData?.Address || ""}
                        maxlen={50}
                        error={false}
                        errorMsg={"enter Correct Address"}
                        onChange={InputHandler}
                      />
                    </Col>
                  </Row>
                </Container>

                <div className="btn-grp mt-1 d-flex justify-content-between align-items-center">
                  <SubmitButton
                    OnClickBtn={SubmitHandler}
                    type={"submit"}
                    isdisable={
                      !(
                        regData?.companyName !== null &&
                        regData?.CompanyCode !== null &&
                        regData?.ContactNumber !== null &&
                        regData?.Country !== null &&
                        regData?.state !== null &&
                        regData?.GSTIN !== null &&
                        regData?.PANNo !== null
                      )
                    }
                  />
                  <ResetButton
                    type={"reset"}
                    onClick={(e) => {
                      setRegData({
                        EmailId: null,
                        UserName: null,
                        Phonenumber: null,
                        Utype: null,
                        CompanyCode: null,
                        Password: null,
                      });
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-5 container-fluid pt-1 d-none d-md-block">
          <div className="px-3 d-flex justify-content-center align-items-center">
            <div className="d-flex justify-content-center align-items-center">
              <img src={JobImg} alt="user-reg" width="98%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyRegistration;
