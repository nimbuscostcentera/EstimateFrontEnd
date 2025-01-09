import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./TableSelector.css";
function TableSelector(col, row,FetchRowID,ID) {
  return (
    <div className="table-wrapper border mb-4">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">SRL</th>
            {col?.map((item, index) => {
              return (
                <th scope="col" key={index}>
                  {item?.key}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {row.map((item, index) => {
            return (
              <tr key={index} onClick={FetchRowID(item?.[ID])}>
                {col.map((c) => {
                  return <td>{row?.[c?.key]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TableSelector;
