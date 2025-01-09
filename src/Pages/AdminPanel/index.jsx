import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./Admin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Table from "../../Component/Table";
import SelectOption from "../../Component/SelectOption";
import useFetchUser from "../../Custom_Hooks/useFetchUser";
import { useDispatch, useSelector } from "react-redux";
import { ClearState17, UserEditFunc } from "../../Slice/UserEditSlice";
import CrossFilterIcon from "../../Component/icons/CrossFilterIcon";



function AdminPanel() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { isloading17, isSuccess17, isError17, error17, Result17 } =
    useSelector((state) => state.useredit);
  const { UserList = [] } = useFetchUser({
    CompanyCode: userInfo?.details?.CompanyCode,
  });

  const [data, setdata] = useState({
    Column: null,
    Order: null,
    search: null,
  });
  const [ActionId, SetActionId] = useState(null);
  const [tab, setTab] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  let option1 = [{ Value: -1, Name: "--Select Column--" }];
  if (UserList.length !== 0) {
    let arr = Object.keys(UserList[0]).reduce((acc, key) => {
      if (typeof UserList[0][key] === "number") {
        acc.push({ Name: key, Value: key });
      }
      return acc;
    }, []);
    option1 = [...option1, ...arr];
  };

  let option2 = [
    { Value:-1, Name: "--Select Order--" },
    { Value: "Asc", Name: "Ascending Order" },
    { Value: "Desc", Name: "Desceinding Oder" },
  ];
  const onChangeHandler = (e) => {
    var key = e.target.name;
    var value = e.target.value;
    setdata({ ...data, [key]: value });
    console.log("hi");
    
  };
  const ShortByFunc = (e) => {
    e.preventDefault();
    let Array1 = [...UserList];
    if (data?.Order === "Desc") {
      Array1.sort((a, b) => b[data?.Column] - a[data?.Column]);
    } else if (data?.Order === "Asc") {
      Array1.sort((a, b) => a[data?.Column] - b[data?.Column]);
    }
    console.log(Array1);
    setFilteredData([...Array1]);
  };
  const SearchFunction = (e) => {
    e.preventDefault();
    let SearchData = [];
    if (
      e?.target?.value === "" ||
      e?.target?.value === null ||
      e?.target?.value === undefined
    ) {
      setFilteredData(tab);
    } else {
      tab.map((item) => {
        let flag = false;
        let keyArray = Object.keys(item);
        for (let key = 0; key <= keyArray.length - 1; key++) {
          let text = item[`${keyArray[key]}`]?.toString().toUpperCase();
          let inputstring = String(data?.search).toUpperCase();
          let isin = text?.includes(inputstring);
          console.log(text, inputstring);
          if (isin) {
            flag = true;
            break;
          }
        }
        if (flag === true) {
          SearchData.push(item);
        }
      });
      setFilteredData(SearchData);
    }
  };
  const UpdateTable = (index, e) => {
    let SearchData = [];
    let mainArray = [...filteredData];
    let newobj = { ...mainArray[index] };
    let key = e.target.name;
    let value = e.target.value;
    newobj[key] = value;
    mainArray[index] = newobj;
    setFilteredData(mainArray);
  };
  const SaveChange = (obj, e) => {
    e.preventDefault();
    let filterTableIds = filteredData?.map((item) => item?.["User ID"]);
    let unchangedData = tab?.filter(
      (obj) => !filterTableIds.includes(obj?.["User ID"])
    );
    let array = [...unchangedData, ...filteredData];
    let shortedarray = array.sort((a, b) => a?.["User ID"] - b?.["User ID"]);
    setFilteredData(shortedarray);
    SetActionId(null);
    SetActionId(null);
    console.log(obj);
   dispatch(UserEditFunc(obj));
  };
  useEffect(() => {
    setTab(UserList);
    setFilteredData(UserList);
  }, [UserList]);
  useEffect(() => {
    if (isSuccess17 && !isloading17)
    {
      toast.success(Result17,{autoClose:5000,position:"top-right"})
    }
    else if (isError17 && !isloading17)
    {
      toast.error(error17, { autoClose: 5000, position: "top-right" });
    }
  },[isSuccess17,isError17])
  return (
    <div className="container-fluid Apanel">
      <ToastContainer />
      <div className="pt-3">
        <h5 className="text-secondary-emphasis">Admin Panel</h5>
        <hr />
      </div>
      <div className="pt-2">
        <div className="white-table border border">
          <div className="d-flex justify-content-between align-item-center pt-2 px-4 flex-wrap">
            <div className="d-flex justify-content-start align-item-center flex-wrap ">
              <div className="mx-1 mt-1">
                <SelectOption
                  PlaceHolder={"--Select Column"}
                  SName={"Column"}
                  Value={data?.Column}
                  Soptions={option1}
                  SelectStyle={{ color: "grey", marginRight: "20px",padding:"2px 5px" }}
                  OnSelect={onChangeHandler}
                />{" "}
              </div>
              <div className="mx-1 mt-1">
                <SelectOption
                  OnSelect={onChangeHandler}
                  PlaceHolder={"--Select Order"}
                  SName={"Order"}
                  Soptions={option2}
                  Value={data?.Order}
                  SelectStyle={{ color: "grey", marginRight: "20px",padding:"2px 5px"  }}
                />{" "}
              </div>
              <div className="mx-1">
                <button className="btn" type="button" onClick={ShortByFunc}>
                  <i className="bi bi-funnel" style={{fontSize:"18px",color:"grey"}}></i>
                </button>
              </div>

              <div className="mx-1">
                <button className="btn" type="button" onClick={() => { setFilteredData(UserList) }}>
                  <CrossFilterIcon width={"22px"}/>
                </button>
              </div>
            </div>

            <div className="float-end mt-1">
              <div className="d-flex justify-content-end align-items-center">
                <input
                  type="search"
                  id="form1"
                  className="form-control"
                  placeholder="Search...."
                  onChange={(e) => {
                    let value = e.target.value;
                    setdata({ ...data, search: value });
                    SearchFunction(e);
                  }}
                  style={{padding:"2px 5px"}}
                />
              </div>
            </div>
          </div>
          <div
            className="mt-3 table-responsive mx-4 "
            style={{ height: "300px" }}
          >
            <Table
              tab={filteredData}
              isAction={true}
              ActionFunc={(id) => {
                SetActionId(id);
              }}
              ActionId={ActionId}
              ChangeHandler={UpdateTable}
              Value={filteredData?.[ActionId]?.Reminder || ""}
              Value1={filteredData?.[ActionId]?.EndDate || ""}
              SaveChange={SaveChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
