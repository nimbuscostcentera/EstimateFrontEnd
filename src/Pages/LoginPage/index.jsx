import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ImgLogo from "../../Asset/nimbussystems_logo.jfif";

import InputBox from "../../Component/InputBox";
import SubmitButton from "../../Component/SubmitButton";
import CheckBox from "../../Component/CheckBox";
import { authenticate } from "../../Slice/AuthSlice";
import PhnoValidation from "../../GlobalFunctions/PhnoValidation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";

import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isloading, userInfo, error, isError, isSuccess } = useSelector(
    (state) => state.auth
  );
  //states
  const [showPass, setShowPass] = useState(false);
  const [inputVal, setInputVal] = useState({
    uniqueId: true,
    password: true,
  });
  const [data, setData] = useState({
    uniqueId: null,
    password: null,
    LoginCode: null,
  });

  //useEffects
  useEffect(() => {
    if (isSuccess && !isloading && !isError) {
      // toast.success(userInfo?.msg, { autoClose: 6000, position: "top-right" });
      if (userInfo?.details?.Utype === 1) {
        navigate("/auth");
      } else {
        navigate("/auth/estimate");
      }
    } else if (isError && !isloading && !isSuccess) {
      toast.error(error, { autoClose: 6000, position: "top-right" });
    }
  }, [isSuccess, isError, isloading]);

  //functions
  const InputHandler = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    let string = value.trimStart();
    setData({ ...data, [key]: string });
  };

  const SubmitHandler = (event) => {
    event.preventDefault();
    let newFormdata = new FormData();
    Object.keys(data).map((key) => {
      console.log(key, data[key]);
      newFormdata.set(key, data[key]);
    });
    for (var pair of newFormdata.entries()) {
      console.log(pair[0] + ":" + pair[1]);
    }
    dispatch(authenticate(newFormdata));
  };

  return (
    <div className="container-fluid m-0 p-0">
      <ToastContainer />
      <div className="formWrapper">
        <div className="form-layout mt-4 pt-2 pb-3 px-3">
          <div className="d-flex justify-content-center align-items-center">
            <img src={ImgLogo} width="20%" />
          </div>

          <div className="d-flex justify-content-center align-items-center">
            <p className="mt-1 fs-5 fw-normal color-header">
              Login In to Estimation System
            </p>
          </div>
          <form className="px-3">
            {/* <InputBox
              Icon={<i className="bi bi-telephone fs-5"></i>}
              type={"text"}
              label={"PhoneNumber"}
              placeholder={"Phone Number"}
              onChange={(e) => {
                if (
                  e?.target?.value !== "" &&
                  e?.target?.value !== null &&
                  e?.target?.value !== undefined
                ) {
                  let res = PhnoValidation(e?.target?.value);
                  setInputVal({ ...inputVal, uniqueId: res });
                } else {
                  setInputVal({ ...inputVal, uniqueId: true });
                }
                InputHandler(e);
              }}
              Name={"uniqueId"}
              error={!inputVal?.uniqueId}
              errorMsg={"Enter Correct Phone Number"}
              maxlen={10}
            /> */}
            <InputBox
              Icon={<i className="bi bi-braces-asterisk fs-5"></i>}
              type={"text"}
              label={"LoginCode"}
              placeholder={"Login Code"}
              onChange={(e) => {
                InputHandler(e);
              }}
              Name={"LoginCode"}
              error={false}
              errorMsg={"Enter Correct Phone Number"}
              maxlen={10}
            />
            <InputBox
              Icon={<i className="bi bi-key fs-5"></i>}
              type={showPass ? "text" : "password"}
              label={"password"}
              placeholder={"Password"}
              onChange={InputHandler}
              Name={"password"}
              error={false}
              errorMsg={""}
              maxlen={8}
            />
            <div className="d-flex justify-content-between align-items-center flex-wrap px-1 mt-3">
              <CheckBox
                Label={"Show Password"}
                onChange={(e) => {
                  setShowPass(!showPass);
                }}
              />
              <div className="mx-2 mt-1">
                <a href="#">Forgot password ?</a>
              </div>
            </div>
            <div className="my-3">
              <SubmitButton
                OnClickBtn={SubmitHandler}
                type={"submit"}
                isdisable={
                  !(
                    data?.LoginCode !== "" &&
                    data?.LoginCode !== null &&
                    data?.password !== null &&
                    data?.password !== ""
                  )
                }
              />
            </div>
          </form>
        </div>{" "}
      </div>
    </div>
  );
}

export default Login;
