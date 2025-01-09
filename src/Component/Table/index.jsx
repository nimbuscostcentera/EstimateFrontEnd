import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./table.css";
import moment from "moment";

function Table({
  tab,
  isAction,
  ActionFunc,
  ActionId,
  ChangeHandler,
  Value,
  Value1,
  SaveChange,
}) {
  return (
    <div className="table-wrapper border mb-4">
      <table className="table table-sm table-hover">
        <thead>
          <tr className="table-secondary">
            <th scope="col" style={{ minWidth: "80px" }}>
              User Id
            </th>
            <th scope="col" style={{ minWidth: "140px" }}>
              User Name
            </th>
            <th scope="col" style={{ minWidth: "120px" }}>
              Phone Number
            </th>
            <th scope="col" style={{ minWidth: "120px" }}>
              Login Code
            </th>
            <th scope="col" style={{ minWidth: "100px" }}>
              Password
            </th>
            <th scope="col" style={{ minWidth: "100px" }}>
              Start Date
            </th>
            <th scope="col" style={{ minWidth: "100px" }}>
              End Date
            </th>
            <th scope="col" style={{ minWidth: "80px" }}>
              Remaining
            </th>
            <th scope="col" style={{ minWidth: "80px" }}>
              Reminder
            </th>
            <th scope="col" style={{ minWidth: "80px" }}>
              Overdue
            </th>
            <th scope="col" style={{ minWidth: "100px" }}>
              Status
            </th>
            {isAction ? (
              <th scope="col" style={{ minWidth: "100px" }}>
                Edit
              </th>
            ) : null}
            {isAction ? (
              <th scope="col" style={{ minWidth: "100px" }}>
                Save
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {tab.map((item, index) => {
            return (
              <tr key={index}>
                <td scope="row">{item["ID"]}</td>
                <td>{item["Name"]}</td>
                <td>{item["PhoneNumber"]}</td>
                <td>{item["LoginCode"]}</td>
                <td>{item["Pass"]}</td>
                <td>{moment(item["createdAt"]).format("DD/MM/YYYY")}</td>
                <td>
                  {index === ActionId ? (
                    <input
                      name="EndDate"
                      label="EndDate"
                      placeholder="EndDate"
                      value={Value1}
                      type="date"
                      onChange={(e) => {
                        ChangeHandler(index, e);
                      }}
                      className="ActionInput"
                    />
                  ) : (
                    moment(item["EndDate"]).format("DD/MM/YYYY")
                  )}
                </td>
                <td>
                  {moment(item["EndDate"]).diff(moment(), "days") > 0
                    ? moment(item["EndDate"]).diff(moment(), "days")
                    : 0}
                </td>
                <td>
                  {index === ActionId ? (
                    <input
                      type="number"
                      name="Reminder"
                      label="Reminder"
                      placeholder="Enter Days"
                      value={Value}
                      onChange={(e) => {
                        ChangeHandler(index, e);
                      }}
                      className="ActionInput"
                    />
                  ) : (
                    item["Reminder"]
                  )}
                </td>
                <td>
                  {moment().diff(moment(item["EndDate"]), "days") > 0
                    ? moment().diff(moment(item["EndDate"]), "days")
                    : 0}
                </td>
                <td>{item["Active"] === 1 ? "Active" : "Inactive"}</td>
                {isAction ? (
                  <td>
                    <button
                      style={{
                        width: "35px",
                        height: "35px",
                        padding: 0,
                      }}
                      className="btn"
                      onClick={() => {
                        ActionFunc(index);
                      }}
                    >
                      <i
                        className="bi bi-pencil-square"
                        style={{
                          color: ActionId === index ? "dodgerblue" : "grey",
                        }}
                      ></i>
                    </button>
                  </td>
                ) : null}
                {isAction ? (
                  <td>
                    <button
                      disabled={ActionId === index ? false : true}
                      style={{
                        width: "35px",
                        height: "35px",
                        border: "none",
                      }}
                      className="btn"
                      onClick={(e) => {
                        SaveChange(
                          {
                            ID: item?.ID,
                            CompanyCode: item?.CompanyCode,
                            LoginCode: item?.LoginCode,
                            Name: item?.Name,
                            Password: item?.Password,
                            Utype: item?.Utype,
                            Active: item?.Active,
                            EndDate: Value1 || item?.EndDate,
                            Reminder: Value || item?.Reminder,
                            OverDue: item?.OverDue,
                            UUid: item?.UUid,
                            password: item?.Pass,
                            Phonenumber: item?.PhoneNumber,
                          },
                          e
                        );
                      }}
                    >
                      <i
                        className="bi bi-floppy"
                        style={{ color: ActionId === index ? "green" : "grey" }}
                      ></i>
                    </button>
                  </td>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
