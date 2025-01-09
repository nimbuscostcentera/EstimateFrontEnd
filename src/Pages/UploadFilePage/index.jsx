import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.min";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./UploadFile.css";

import AddUserImg from "../../Asset/general-upload-file.png";
import sidePageImage from "../../Asset/about-inPg.svg";
import InputBox from "../../Component/InputBox";
import SelectOption from "../../Component/SelectOption";
import SubmitButton from "../../Component/SubmitButton";
import ResetButton from "../../Component/ResetButton";

import ValidateImage from "../../GlobalFunctions/ValidateImage";

import { UploadFileFunc, ClearState2 } from "../../Slice/UploadFilesSlice";

function UploadFile() {
  const dispatch = useDispatch();
  const { isloading2, Result2, error2, isError2, isSuccess2 } = useSelector(
    (state) => state.upFile
  );
    const { isloading, userInfo, error, isError, isSuccess } = useSelector(
    (state) => state.auth
  );
  const [ufData, setUfData] = useState({
    CompanyCode: userInfo?.details?.CompanyCode,
    ReportType: null,
    Date: null,
    Files: null,
  });
  const e = document.getElementById("uploadFiles");
  console.log(ufData);
  
  const [msg, Imgbool] = ValidateImage(e);
  const InputHandler = (e) => {
    var key = e.target.name;
    var rawInput = e.target.value;
    var value = rawInput.trim();
    setUfData({ ...ufData, [key]: value });
  };
  const FileHandler = (e) => {
    var key = e.target.name;
    let files = e.target.files;
    console.log(typeof files, files, "hello my state");
    setUfData({ ...ufData, [key]: files });
  };
  const SubmitHandler = (e) => {
    e.preventDefault();
    console.log(ufData);
    setUfData({ ...ufData, CompanyCode: userInfo?.details?.CompanyCode });
    let newformData = new FormData();
    Object.keys(ufData).forEach((key) => {
      if (key === "Files") {
        Array.from(ufData[key]).forEach((file) => {
          newformData.append(key, file);
        });
      } else {
        newformData.append(key, ufData[key]);
      }
    });
    for (var pair of newformData.entries()) {
      console.log(pair[0] + ":" + pair[1]);
    }
    dispatch(UploadFileFunc(newformData));
  };
  useEffect(() => {
    if (isSuccess2) {
      toast.success(Result2, { position: "top-right", autoClose: 6000 });
      setUfData({
        CompanyCode: userInfo?.details?.CompanyCode,
        ReportType: null,
        Date: null,
        User: null,
        Files: null
      });
    } else if (isError2) {
      toast.error(error2, { autoClose: 6000, position: "top-right" });
    }
    dispatch(ClearState2());
  }, [isError2, isSuccess2, isloading2]);

  return (
    <div className="container-fluid">
      <ToastContainer />
      <div className="row">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="form_wrapper1 mt-3 py-3">
            <div className="form_container">
              <div className="d-flex justify-content-center align-items-center">
                <img src={AddUserImg} alt="adduser" width="22%" />
              </div>
              <div className="title_container">
                <h2>Upload Docs</h2>
              </div>
              <form>
                {/* <div className="mb-4 mt-1">
                  <SelectOption
                    Soptions={[
                      { Name: "Nimbus Systems Pvt. Ltd.", Value: "NSPL" },
                      { Name: "Emerald Jewellery Pvt. Ltd.", Value: "EJPL" },
                    ]}
                    SName={"User"}
                    OnSelect={InputHandler}
                    value={ufData?.User}
                    PlaceHolder={"Select Docs Company"}
                  />
                </div> */}

                <InputBox
                  Icon={<i className="bi bi-calendar fs-5"></i>}
                  label={"Date"}
                  placeholder={"Date"}
                  type={"date"}
                  Name={"Date"}
                  error={false}
                  errorMsg={"File size exceded"}
                  onChange={InputHandler}
                  value={ufData?.Date || "00-00-0000"}
                />
                <div className="mb-3 mt-2">
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
                    Value={ufData?.ReportType || ""}
                    PlaceHolder={"Select Report Type"}
                  />
                </div>
                {/* <div className="my-4">
                  <SelectOption
                    Soptions={[
                      { Name: "Nimbus Systems Pvt. Ltd.", Value: "NSPL" },
                      { Name: "Emerald Jewellery Pvt. Ltd.", Value: "EJPL" },
                    ]}
                    SName={"CompanyCode"}
                    OnSelect={InputHandler}
                    value={ufData?.CompanyCode}
                    PlaceHolder={"Select Your Company"}
                  />
                </div> */}
                <InputBox
                  Icon={
                    <i aria-hidden="true" className="bi bi-upload fs-5"></i>
                  }
                  label={"File"}
                  placeholder={"file"}
                  type={"file"}
                  error={Imgbool}
                  Name={"Files"}
                  onChange={FileHandler}
                  errorMsg={msg}
                  key={2}
                />

                <div className="btn-grp pt-3 pb-1 d-flex justify-content-between align-items-center">
                  <SubmitButton
                    type={"submit"}
                    OnClickBtn={SubmitHandler}
                    isdisable={
                      !(
                        !Imgbool &&
                        ufData?.Date !== null &&
                        ufData?.Files !== null &&
                        ufData?.ReportType !== null
                      )
                    }
                  />
                  <ResetButton
                    type={"reset"}
                    onClick={(e) => {
                      e.preventDefault();
                      setUfData({
                        CompanyCode: null,
                        ReportType: null,
                        Date: null,
                        User: null,
                        Files: null,
                      });
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6  d-none d-md-flex justify-content-center align-items-center">
          <div className="px-3 py-2 mt-3">
            <img src={sidePageImage} alt="user-reg" width="80%" height="100%" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadFile;
