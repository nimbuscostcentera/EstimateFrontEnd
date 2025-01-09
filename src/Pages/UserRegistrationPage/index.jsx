import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Container, Row, Col } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

import InputBox from "../../Component/InputBox";
import SubmitButton from "../../Component/SubmitButton";
import SelectOption from "../../Component/SelectOption";
import ResetButton from "../../Component/ResetButton";
import UserImg from "../../Asset/Daco_1063376.png";
import JobImg from "../../Asset/job.png";
import RadioButton from "../../Component/RadioButton.jsx";
import PhnoValidation from "../../GlobalFunctions/PhnoValidation";
import EmailValidation from "../../GlobalFunctions/EmailValidation";

import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "./UserReg.css";

import { RegFunc, ClearState1 } from "../../Slice/RegSlice";
import useFetchCompany from "../../Custom_Hooks/useFetchCompany.js";
import useFetchLocation from "../../Custom_Hooks/useFetchLocation.js";
function UserReg() {
  const dispatch = useDispatch();
  const { isloading1, Result1, error1, isError1, isSuccess1 } = useSelector(
    (state) => state.reg
  );
  const { userInfo } = useSelector((state) => state.auth);
  const [regData, setRegData] = useState({
    EmailId: null,
    UserName: null,
    Phonenumber: null,
    Utype: null,
    CompanyCode: null,
    Password: null,
    LOCID: null,
    LOGINCODE: null,
    EndDate: null,
    Reminder: null,
  });
  const [inputVal, setInputVal] = useState({
    EmailId: true,
    Phonenumber: true,
  });
  const { companylist } = useFetchCompany(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
      LoggerID: userInfo?.details?.ID,
    },
    []
  );
  let SelectCompList = useMemo(() => {
    if (!companylist) return [];
    let arr = [];
    arr.push({ Name: "---Select Company", Value: 0 });
    let arr1 = companylist.map((item) => ({
      Name: item?.companyName,
      Value: item?.CompanyCode,
    }));
    return [...arr, ...arr1];
  }, [companylist]);

  const { LocationList } = useFetchLocation(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
      LoggerID: userInfo?.details?.ID,
    },
    []
  );

  let SelectLocList = useMemo(() => {
    if (!LocationList) return [];
    let arr = [];
    arr.push({ Name: "---Select Location", Value: 0 });
    let arr1 = LocationList.map((item) => ({
      Name: item?.Location,
      Value: item?.LOCID,
    }));
    return [...arr, ...arr1];
  }, [LocationList]);

  useEffect(() => {
    if (isSuccess1 && !isError1 & !isloading1) {
      toast.success(Result1, { autoClose: 6000, position: "top-right" });
      setRegData({
        EmailId: null,
        UserName: null,
        Phonenumber: null,
        Utype: null,
        CompanyCode: null,
        Password: null,
        LOCID: null,
        LOGINCODE: null,
        EndDate: null,
        Reminder: null,
      });
    } else if (isError1 && !isSuccess1 && !isloading1) {
      toast.error(error1, { autoClose: 6000, position: "top-right" });
    }
    dispatch(ClearState1());
  }, [isError1, isSuccess1, isloading1]);

  const InputHandler = (e) => {
    var key = e.target.name;
    var value = e.target.value;
    let string = value.trim();
    if (key === "Utype") {
      if (value === "Admin") {
        setRegData({ ...regData, [key]: 1 });
      } else {
        setRegData({ ...regData, [key]: 2 });
      }
    } else {
      setRegData({ ...regData, [key]: string });
    }
  };
  const SubmitHandler = (e) => {
    e.preventDefault();
    console.log(regData);
    dispatch(RegFunc(regData));
  };

  return (
    <div className="container-fluid">
      <ToastContainer />
      <div className="row">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="form_wrapper mt-4">
            <div className="form_container">
              <div className="d-flex justify-content-center align-items-center">
                <img src={UserImg} alt="adduser" width="15%" />
              </div>
              <div className="title_container">
                <h3>User Registration Form</h3>
              </div>
              <form>
                <Container>
                  <Row>
                    <Col>
                      <InputBox
                        Icon={<i className="bi bi-person fs-5"></i>}
                        type={"text"}
                        placeholder={"User Name"}
                        label={"uname"}
                        Name={"UserName"}
                        value={regData?.UserName || ""}
                        maxlen={50}
                        error={false}
                        errorMsg={"enter Correct name"}
                        onChange={InputHandler}
                      />
                      <InputBox
                        Icon={<i className="bi bi-telephone fs-5"></i>}
                        type={"tel"}
                        placeholder={"Phone Number"}
                        label={"phone"}
                        value={regData?.Phonenumber || ""}
                        Name={"Phonenumber"}
                        error={!inputVal?.Phonenumber}
                        errorMsg={"Enter Correct Phone Number"}
                        maxlen={10}
                        onChange={(e) => {
                          if (
                            e?.target?.value !== "" &&
                            e?.target?.value !== null &&
                            e?.target?.value !== undefined
                          ) {
                            let res = PhnoValidation(e?.target?.value);
                            setInputVal({ ...inputVal, Phonenumber: res });
                          } else {
                            setInputVal({ ...inputVal, Phonenumber: true });
                          }
                          InputHandler(e);
                        }}
                      />
                      <InputBox
                        Icon={<i className="bi bi-code fs-5"></i>}
                        type={"number"}
                        placeholder={"LOGINCODE"}
                        label={"LOGINCODE"}
                        value={regData?.LOGINCODE || ""}
                        Name={"LOGINCODE"}
                        error={false}
                        errorMsg={"Enter Correct LOCID"}
                        maxlen={10}
                        onChange={InputHandler}
                      />
                      <InputBox
                        Icon={<i className="bi bi-key fs-5"></i>}
                        type={"text"}
                        placeholder={"Password"}
                        label={"Password"}
                        value={regData?.Password || ""}
                        Name={"Password"}
                        error={false}
                        errorMsg={"Enter Correct Password"}
                        maxlen={10}
                        onChange={InputHandler}
                      />
                      <div className="mb-3 mt-2">
                        <SelectOption
                          Soptions={SelectLocList}
                          SName={"LOCID"}
                          OnSelect={InputHandler}
                          Value={regData?.LOCID || 0}
                          PlaceHolder={"Select Location"}
                        />
                      </div>
                    </Col>
                    <Col>
                      {" "}
                      <InputBox
                        Icon={<i className="bi bi-envelope fs-5"></i>}
                        type={"email"}
                        placeholder={"EmailId"}
                        label={"EmailId"}
                        value={regData?.EmailId || ""}
                        Name={"EmailId"}
                        error={!inputVal?.EmailId}
                        errorMsg={"Enter Correct Phone Number"}
                        maxlen={50}
                        onChange={(e) => {
                          if (
                            e?.target?.value !== "" &&
                            e?.target?.value !== null &&
                            e?.target?.value !== undefined
                          ) {
                            let res = EmailValidation(e?.target?.value);
                            setInputVal({ ...inputVal, EmailId: res });
                          } else {
                            setInputVal({ ...inputVal, EmailId: true });
                          }
                          InputHandler(e);
                        }}
                      />
                      <InputBox
                        Icon={<i className="bi bi-calendar fs-5"></i>}
                        type={"date"}
                        placeholder={"EndDate"}
                        label={"EndDate"}
                        value={regData?.EndDate || ""}
                        Name={"EndDate"}
                        error={false}
                        errorMsg={"Enter Correct EndDate"}
                        maxlen={10}
                        onChange={InputHandler}
                      />
                      <InputBox
                        Icon={<i className="bi bi-bell-fill"></i>}
                        type={"Reminder"}
                        placeholder={"Reminder"}
                        label={"Reminder"}
                        value={regData?.Reminder || ""}
                        Name={"Reminder"}
                        error={false}
                        errorMsg={"Enter Correct Reminder"}
                        maxlen={10}
                        onChange={InputHandler}
                      />
                      <div>
                        <RadioButton
                          OptionArray={["Admin", "User"]}
                          RName={"Utype"}
                          OnClick={InputHandler}
                          value={regData?.Utype || ""}
                        />
                      </div>
                      <div className="mt-4 pt-2">
                        <SelectOption
                          Soptions={SelectCompList}
                          SName={"CompanyCode"}
                          OnSelect={InputHandler}
                          Value={regData?.CompanyCode || ""}
                          PlaceHolder={"Select Company"}
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>

                <div className="btn-grp mt-1 d-flex justify-content-between align-items-center">
                  <SubmitButton
                    OnClickBtn={SubmitHandler}
                    type={"submit"}
                    isdisable={
                      !(
                        regData?.Phonenumber !== null &&
                        regData?.LOCID !== null &&
                        regData?.EmailId !== null &&
                        regData?.UserName !== null &&
                        regData?.Utype !== null &&
                        regData?.CompanyCode !== null &&
                        regData?.Password !== null &&
                        regData?.LOGINCODE !== null &&
                        regData?.EndDate !== null &&
                        regData?.Reminder !== null
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
                        LOCID: null,
                        LOGINCODE: null,
                        EndDate: null,
                        Reminder: null,
                      });
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6 container-fluid pt-1 d-none d-md-block">
          <div className="px-3 d-flex justify-content-center align-items-center">
            <div className="d-flex justify-content-center align-items-center">
              <img src={JobImg} alt="user-reg" width="80%" height="100%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserReg;
