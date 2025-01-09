import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import jsPDF from "jspdf";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, InputGroup, Form } from "react-bootstrap";
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";
import { Container, Row, Col } from "react-bootstrap";

import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "./Estimate.css";

import InputBox from "../../Component/InputBox";
import SubmitButton from "../../Component/SubmitButton";
import EstimateTable from "../../Component/EstimateTable";
import ReusableDataGrid from "../../Component/ReusableDataGrid";
import ReusableModal from "../../Component/Modal";

import useFetchCustomer from "../../Custom_Hooks/useFetchCustomer";
import useFetchItemCode from "../../Custom_Hooks/useFetchItemCode";
import useFetchPurity from "../../Custom_Hooks/useFetchPurity";
import useFetchSalesMan from "../../Custom_Hooks/useFetchSalesMan";
import useFetchStone from "../../Custom_Hooks/useFetchStone";
import useFetchStoneSubList from "../../Custom_Hooks/useFetchStoneSubList";
import useFetchItemId from "../../Custom_Hooks/useFetchItemId";
import { EstimateFunc, ClearState14 } from "../../Slice/EstimateSlice";
import { ClearState13 } from "../../Slice/StoneSubListSlice";

import PhnoValidation from "../../GlobalFunctions/PhnoValidation";

function Estimate() {
  const currentdatetime = moment();
  const dispatch = useDispatch();
  //const [iData, SetIData] = useState({});
  //  const [iData1, SetIData1] = useState({});
  const { userInfo } = useSelector((state) => state.auth);
  const { isloading14, isError14, error14, Result14, isSuccess14 } =
    useSelector((state) => state?.estimate);
  const [calData, setCalData] = useState({
    Narration: null,
    TotalMetalValue: 0.0,
    TotalStoneValue: 0.0,
    TotalMakingCharge: 0.0,
    TotalItemAmount: 0.0,
    ExciseDuty: 0.0,
    TotalGross: 0.0,
    TotalNet: 0.0,
    TotalHM: 0.0,
    Tax: 0.0,
    TaxAmt: 0.0,
    NetAmount: 0.0,
    CUSTNO: null,
    CustomerName: null,
    Address: null,
    Phn: null,
    SalesPerson: null,
    SPName: null,
    VOUDATE: currentdatetime.format("YYYY-MM-DD"),
  });
  const [vouno, setVouNo] = useState(null);
  const [showModal, setShowModal] = useState({
    customer: false,
    salesMan: false,
    itemcode: false,
    itemid: false,
    stone: false,
    others: false,
  });
  const [inputVal, setInputVal] = useState({
    Phn: true,
  });
  const [rowid, setRowId] = useState({
    stone: 0,
    itemcode: 0,
    itemid: 0,
    customer: 0,
    SalesPerson: 0,
  });
  const [parentId, setParentId] = useState(0);

  const [childId, setChildId] = useState(0);

  const { CustList } = useFetchCustomer(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
      LoggerID: userInfo?.details?.ID,
    },
    []
  );

  const { ItemCode: ItemData } = useFetchItemCode(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
      LoggerID: userInfo?.details?.ID,
    },
    []
  );
  const { Item: Item } = useFetchItemId(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
      LoggerID: userInfo?.details?.ID,
    },
    []
  );

  const { purity } = useFetchPurity(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
      LoggerID: userInfo?.details?.ID,
    },
    []
  );

  let PurityOption = useMemo(() => {
    let arr = [{ Name: "--Select--", Value: -1 }];
    purity.map((item) => {
      arr.push({ Name: item?.PURITY, Value: item?.PURITY });
    });
    return arr;
  }, [purity]);

  const { sman: salesMan } = useFetchSalesMan(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
      LoggerID: userInfo?.details?.ID,
    },
    []
  );

  const columns = [
    {
      key: "ITEMCODE",
      label: "Item Code",
      isTableSelection: true,
      PlaceHolder: "Item",
    },
    {
      key: "ItemId",
      label: "Item Id",
      isTableSelection: true,
      PlaceHolder: "Item",
    },
    {
      key: "Purity",
      label: "Purity",
      SelectOption: true,
      data: PurityOption || [
        { Name: "--Select--", Value: -1 },
        { Name: "14k", Value: "P003" },
        { Name: "18K", Value: "P001" },
        { Name: "22k", Value: "P002" },
        { Name: "24k", Value: "P004" },
      ],
      PlaceHolder: "Purity",
    },
    { key: "ManualId", label: "Manual Id", type: "text" },
    { key: "Description", label: "Description", type: "text" },
    { key: "Pcs", label: "Pcs.", type: "number" },
    { key: "GrossWt", label: "Gross Wt.", type: "number" },
    { key: "NettWt", label: "Nett Wt.", type: "number" },
    { key: "Rate", label: "Rate", type: "number" },
    { key: "MetalValue", label: "Metal Value", type: "number", ReadOnly: true },
    {
      key: "StoneValue",
      label: "Stone Value",
      isButton: true,
      type: "number",
      ReadOnly: true,
    },
    {
      key: "MkgType",
      label: "Mkg. Type",
      SelectOption: true,
      data: [
        { Value: -1, Name: "--Select--" },
        { Value: "Gm", Name: "Gross Wt" },
        { Value: "Pcs", Name: "Pcs" },
        { Value: "Nm", Name: "Net wt" },
        { Value: "PR", Name: "Percentage" },
        { Value: "Tot", Name: "Total" },
      ],
      PlaceHolder: "Mkg type",
    },
    { key: "MkgRate", label: "Mkg. Rate", type: "number" },
    { key: "MkgCharge", label: "Mkg. Chg.", type: "number" },
    { key: "OthersCharge", label: "Oth. Chg.", type: "number" },
    { key: "HMCharge", label: "H.M Chg.", type: "number" },
    { key: "TotalAmount", label: "Total Amount", type: "number" },
  ];

  const StoneEstimate = {
    Stone_ID: null,
    STONE_CODE: null,
    STONE_SUB: null,
    STONE_NAME: null,
    Pcs: null,
    StoneWt: null,
    RateType: null,
    Rate: null,
    StoneAmount: null,
    StoneSubList: [{ Name: "--Select-- ", Value: -1 }],
  };
  const EstimationTableObj = {
    ItemId: null,
    ITEMCODE: null,
    Purity: null,
    ManualId: null,
    Description: null,
    Detail: null,
    Pcs: null,
    GrossWt: null,
    NettWt: null,
    Rate: null,
    MetalValue: null,
    StoneValue: null,
    MkgType: null,
    MkgRate: null,
    MkgCharge: null,
    OthersCharge: null,
    HMCharge: null,
    TotalAmount: null,
    StoneDetails: [{ ...StoneEstimate, id: 1 }],
  };
  const CustomerCol = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      hideable: false,
    },
    {
      field: "CUSTNO",
      headerName: "Customer ID",
      width: 120,
      hideable: false,
    },
    {
      field: "NAME",
      headerName: "Customer Name",
      width: 200,
      hideable: false,
    },
    {
      field: "PHONE",
      headerName: "Pnone No.",
      width: 120,
      hideable: false,
    },
    {
      field: "ADDRESS1",
      headerName: "Address",
      width: 250,
      hideable: false,
    },
    {
      field: "GL_CODE",
      headerName: "Ac. No.",
      width: 160,
      hideable: false,
    },
    {
      field: "CompanyCode",
      headerName: "Company",
      width: 160,
      hideable: false,
    },
  ];
  const SalesManCol = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      hideable: false,
    },
    {
      field: "CODE",
      headerName: "SalesMan CODE",
      width: 140,
      hideable: false,
    },
    {
      field: "NAME",
      headerName: "NAME",
      width: 160,
      hideable: false,
    },
    {
      field: "PHONE",
      headerName: "Phone No.",
      width: 160,
      hideable: false,
    },
    {
      field: "CompanyCode",
      headerName: "CompanyCode",
      width: 120,
      hideable: false,
    },
    {
      field: "CONTACTPERSON",
      headerName: "Contact Person",
      width: 160,
      hideable: false,
    },
    {
      field: "TrgAmt",
      headerName: "Target Amt.",
      width: 120,
      hideable: false,
    },
    {
      field: "ADDRESS1",
      headerName: "ADDRESS",
      width: 200,
      hideable: false,
    },
    {
      field: "FAX",
      headerName: "FAX",
      width: 160,
      hideable: false,
    },

    {
      field: "LISCENCENO",
      headerName: "Lisence No.",
      width: 180,
      hideable: false,
    },
    {
      field: "GL_CODE",
      headerName: "Ac/no.",
      width: 180,
      hideable: false,
    },
    {
      field: "LOCID",
      headerName: "Location ID",
      width: 120,
      hideable: false,
    },

    {
      field: "vat_no",
      headerName: "Vat No.",
      width: 180,
      hideable: false,
    },
  ];
  const ItemCol = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      hideable: false,
    },
    {
      field: "ITEMCODE",
      headerName: "Item Code",
      width: 140,
      hideable: false,
    },

    {
      field: "DESCRIPTION",
      headerName: "Description",
      width: 140,
      hideable: false,
    },
    {
      field: "GROUP",
      headerName: "Group",
      width: 140,
      hideable: false,
    },
    {
      field: "TYPE",
      headerName: "Type",
      width: 140,
      hideable: false,
    },
    {
      field: "fpcs",
      headerName: "pcs.",
      width: 140,
      hideable: false,
    },
    {
      field: "fweight",
      headerName: "weight",
      width: 140,
      hideable: false,
    },
    {
      field: "Detail",
      headerName: "Detail",
      width: 140,
      hideable: false,
    },
    {
      field: "Rate",
      headerName: "Rate",
      width: 140,
      hideable: false,
    },
    {
      field: "Rate_Type",
      headerName: "Rate Type",
      width: 140,
      hideable: false,
    },
    {
      field: "Percentage",
      headerName: "Percentage",
      width: 140,
      hideable: false,
    },
    {
      field: "Brand",
      headerName: "Brand",
      width: 140,
      hideable: false,
    },
    {
      field: "ITEM_TYPE",
      headerName: "Item Type",
      width: 140,
      hideable: false,
    },
    {
      field: "LOOSE_STONE",
      headerName: "LOOSE STONE",
      width: 140,
      hideable: false,
    },
    {
      field: "Silver",
      headerName: "Silver",
      width: 140,
      hideable: false,
    },
    {
      field: "CompanyCode",
      headerName: "CompanyCode",
      width: 140,
      hideable: false,
    },
  ];
  const IdHeader = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      hideable: false,
    },
    {
      field: "IDNUM",
      headerName: "IDNUM",
      width: 120,
      hideable: false,
    },
    {
      field: "ITEM",
      headerName: "Item Code",
      width: 100,
      hideable: false,
    },
    {
      field: "ID_STONE ",
      headerName: "ID_STONE ",
      width: 100,
      hideable: false,
    },
    {
      field: "DETAIL",
      headerName: "DETAIL",
      width: 120,
      hideable: false,
    },
    {
      field: "GRADE",
      headerName: "GRADE",
      width: 100,
      hideable: false,
    },
    {
      field: "PURITY",
      headerName: "PURITY",
      width: 100,
      hideable: false,
    },
    {
      field: "PCS",
      headerName: "PCS",
      width: 90,
      hideable: false,
    },
    {
      field: "GROSS_WT",
      headerName: "GROSS_WT",
      width: 120,
      hideable: false,
    },
    {
      field: "NETT_WT",
      headerName: "NET WT",
      width: 120,
      hideable: false,
    },
    {
      field: "TRANCODE",
      headerName: "TRANCODE",
      width: 120,
      hideable: false,
    },
    {
      field: "VOUNUM",
      headerName: "VOUCHER No.",
      width: 130,
      hideable: false,
    },
    {
      field: "ARTISAN ",
      headerName: "ARTISAN",
      width: 120,
      hideable: false,
    },
    {
      field: "MANUALID",
      headerName: "MANUAL ID",
      width: 130,
      hideable: false,
    },

    {
      field: "MAKING_TYPE",
      headerName: "MAKING TYPE",
      width: 120,
      hideable: false,
    },
    {
      field: "MAKING_RAT",
      headerName: "MAKING RATE",
      width: 120,
      hideable: false,
    },
    {
      field: "MAKING",
      headerName: "MAKING CHARGE",
      width: 140,
      hideable: false,
    },
    {
      field: "OTHER_CHARGES",
      headerName: "Oth. Chg.",
      width: 100,
      hideable: false,
    },
    {
      field: "TOT_VALUE",
      headerName: "TOTAL VALUE",
      width: 140,
      hideable: false,
    },
  ];
  const TotCal = [
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      hideable: false,
    },
    {
      field: "TotalNet",
      headerName: "Tot.Net.Wt.(g)",
      width: 108,
      hideable: false,
      renderCell: (item) => {
        return <div className="text-end">{item?.row?.TotalNet || 0.0}</div>;
      },
    },
    {
      field: "TotalGross",
      headerName: "Tot.Gr.Wt.(g)",
      width: 99,
      hideable: false,
      renderCell: (item) => {
        return <div className="text-end">{calData?.TotalGross || 0.0}</div>;
      },
    },

    {
      field: "TotalMetalValue",
      headerName: "Tot.Met.Val.",
      width: 110,
      hideable: false,
      renderCell: (item) => {
        return (
          <div className="text-end">{item?.row?.TotalMetalValue || 0.0}</div>
        );
      },
    },
    {
      field: "TotalStoneValue",
      headerName: "Tot.St.Val.",
      width: 100,
      hideable: false,
      renderCell: (item) => {
        return (
          <div className="text-end">{item?.row?.TotalStoneValue || 0.0}</div>
        );
      },
    },
    {
      field: "TotalMakingCharge",
      headerName: "Tot.Mkg.Ch",
      width: 110,
      hideable: false,
      renderCell: (item) => {
        return (
          <div className="text-end">{item?.row?.TotalMakingCharge || 0.0}</div>
        );
      },
    },
    {
      field: "TotalHM.",
      headerName: "Tot.HM",
      width: 94,
      hideable: false,
      renderCell: (item) => {
        return <div className="text-end">{item?.row?.TotalHM || 0.0}</div>;
      },
    },
    {
      field: "TotalItemAmount",
      headerName: "Tot.Item Amt.",
      width: 120,
      hideable: false,
      renderCell: (item) => {
        return (
          <div className="text-end">{item?.row?.TotalItemAmount || 0.0}</div>
        );
      },
    },
    {
      field: "NetAmount",
      headerName: "Net.Amount",
      width: 110,
      hideable: false,
      renderCell: (item) => {
        return <div className="text-end">{item?.row?.NetAmount || 0.0}</div>;
      },
    },
  ];
  // State to hold row data
  const [rows, setRows] = useState([{ id: 1, ...EstimationTableObj }]);
  const { StoneList } = useFetchStone(
    {
      CompanyCode: userInfo?.details?.CompanyCode,
      LoggerID: userInfo?.details?.ID,
    },
    []
  );
  let SelectStone = useMemo(() => {
    let arr = [{ Name: "--Select-- ", Value: -1 }];
    StoneList.map((item) => {
      arr.push({ Name: item?.STONE_CODE, Value: item?.Stone_CODE });
    });
    return arr;
  }, [StoneList]);
  const { StoneSubList, isSuccess13, isError13, isloading13 } =
    useFetchStoneSubList(
      {
        CompanyCode: userInfo?.details?.CompanyCode,
        LoggerID: userInfo?.details?.ID,
        STONE_CODE: rows[parentId]?.StoneDetails[childId]?.STONE_CODE,
      },
      [rows[parentId]?.StoneDetails[childId]?.STONE_CODE, parentId, childId]
    );
  let SelectStoneSub = useMemo(() => {
    let arr = [{ Name: "--Select-- ", Value: -1 }];
    StoneSubList.map((item) => {
      arr.push({ Name: item?.STONE_SUB, Value: item?.STONE_SUB });
    });
    return arr;
  }, [StoneSubList, rows[parentId]?.StoneDetails[childId]?.STONE_CODE]);

  //toaster
  useEffect(() => {
    if (isSuccess14 && !isloading14 && !isError14) {
      toast.success(Result14?.toaster, {
        autoClose: 6000,
        position: "top-right",
      });
    } else if (isError14 && !isloading14 && !isSuccess14) {
      toast.error(error14, { autoClose: 6000, position: "top-right" });
    }
  }, [isSuccess14, isError14]);

  //set stone sub list
  useEffect(() => {
    if (!isloading13 && isSuccess13) {
      console.log("stone");

      rows[parentId].StoneDetails[childId].StoneSubList = SelectStoneSub;
      dispatch(ClearState13());
    }
    // console.log(childId, parentId);
  }, [isloading13, isSuccess13]);

  // Function to add a new row
  const addRow = () => {
    const newRow = { id: rows.length + 1, ...EstimationTableObj };
    setRows([...rows, newRow]);
  };
  //add stone
  const addRow1 = () => {
    let mainArray = [...rows];
    let rowobj = { ...EstimationTableObj };
    let newArray = [{ ...StoneEstimate }];
    rowobj = { ...rowobj, ...rows[parentId] };
    newArray = rowobj?.StoneDetails;
    const StoneRow = { ...StoneEstimate, id: newArray.length + 1 };
    newArray.push(StoneRow);
    rowobj["StoneDetails"] = newArray;
    mainArray[parentId] = rowobj;
    // console.log(mainArray);
    setRows(mainArray);
  };
  // Function to handle input change
  const handleChange = (id, key, e) => {
    let newobj = { ...EstimationTableObj };
    const newArray = [...rows];
    // console.log(parentId, rows);
    const index = newArray.findIndex((obj) => obj?.id === id);
    // console.log(id, index);
    setParentId(index);
    newobj = { ...newobj, ...newArray[index] };
    //console.log(newobj);
    const regexWt = /^\d*\.?\d{0,3}$/;
    const regexAmt = /^\d*\.?\d{0,2}$/;
    const regexWholeNumber = /^\d*$/;
    // console.log(regexWt.test(e.target.value) && key === "GrossWt");
    //handle decimal places
    if (key === "GrossWt" && regexWt.test(e.target.value)) {
      newobj["GrossWt"] = Number(e.target.value);
    } else if (
      key === "NettWt" &&
      regexWt.test(e.target.value) &&
      e.target.value <= newobj?.GrossWt
    ) {
      newobj["NettWt"] = Number(e.target.value);
    } else if (key === "HMCharge" && regexAmt.test(e.target.value)) {
      newobj["HMCharge"] = Number(e.target.value);
    } else if (key === "MkgRate" && regexAmt.test(e.target.value)) {
      newobj["MkgRate"] = Number(e.target.value);
    } else if (key === "OthersCharge" && regexAmt.test(e.target.value)) {
      newobj["OthersCharge"] = Number(e.target.value);
    } else if (key === "Rate" && regexAmt.test(e.target.value)) {
      newobj["Rate"] = Number(e.target.value);
    } else if (key === "Pcs" && regexWholeNumber.test(e.target.value)) {
      newobj["Pcs"] = Number(e.target.value);
    } else if (
      key !== "Rate" &&
      key !== "OthersCharge" &&
      key !== "MkgRate" &&
      key !== "HMCharge" &&
      key !== "NettWt" &&
      key !== "GrossWt" &&
      key !== "Pcs"
    ) {
      newobj[key] = e.target.value;
    }
    //handle total amt calculation

    //metal value
    if (newobj?.NettWt && newobj?.Rate) {
      newobj["MetalValue"] = (
        Number(newobj?.NettWt) * Number(newobj?.Rate)
      ).toFixed(2);
    }

    //making charge
    if (newobj?.MkgRate && newobj?.MkgType) {
      // console.log(newobj?.MkgRate, newobj?.MkgType);
      if (newobj?.MkgType === "Gm") {
        newobj["MkgCharge"] = (
          Number(newobj?.GrossWt) * Number(newobj?.MkgRate)
        ).toFixed(2);
      } else if (newobj?.MkgType === "Pcs") {
        newobj["MkgCharge"] = (
          Number(newobj?.Pcs) * Number(newobj?.MkgRate)
        ).toFixed(2);
      } else if (newobj?.MkgType === "Nm") {
        newobj["MkgCharge"] = (
          Number(newobj?.NettWt) * Number(newobj?.MkgRate)
        ).toFixed(2);
      } else if (newobj?.MkgType === "PR") {
        newobj["MkgCharge"] = (
          Number(newobj?.MetalValue) *
          Number(newobj?.MkgRate) *
          0.01
        ).toFixed(2);
      } else if (newobj?.MkgType === "Tot") {
        if (key === "MkgRate" && regexAmt.test(e.target.value)) {
          newobj["MkgRate"] = e.target.value;
          newobj["MkgCharge"] = newobj["MkgRate"];
        } else if (key === "MkgCharge" && regexAmt.test(e.target.value)) {
          newobj["MkgCharge"] = e.target.value;
          newobj["MkgRate"] = newobj["MkgCharge"];
        }
      }
    }

    newobj["TotalAmount"] = (
      Number(newobj["MetalValue"]) +
      Number(newobj["MkgCharge"]) +
      Number(newobj["StoneValue"]) +
      Number(newobj["HMCharge"]) +
      Number(newobj["OthersCharge"])
    ).toFixed(2);
    //  console.log(newobj);
    newArray[index] = newobj;
    setRows(newArray);
    // AllTotalCal();
    let TotalMValue = Number(0);
    let TotalSValue = Number(0);
    let TotalMCharge = Number(0);
    let TotItemVal = Number(0);
    let AllTotal = Number(0);
    let TotGr = Number(0);
    let TotNet = Number(0);
    let TotHM = Number(0);

    for (let i = 0; i <= rows?.length - 1; i++) {
      if (i !== parentId) {
        TotalMCharge = Number(TotalMCharge) + Number(rows[i]["MkgCharge"]);
        TotalMValue = Number(TotalMValue) + Number(rows[i]["MetalValue"]);
        TotalSValue = Number(TotalSValue) + Number(rows[i]["StoneValue"]);
        TotItemVal = Number(TotItemVal) + Number(rows[i]["TotalAmount"]);
        TotHM = Number(TotHM) + Number(rows[i]?.["HMCharge"]);
        TotNet = Number(TotNet) + Number(rows[i]?.["NettWt"]);
        TotGr = Number(TotGr) + Number(rows[i]?.["GrossWt"]);
      }
    }
    TotalMCharge = Number(TotalMCharge) + Number(newobj["MkgCharge"]);
    TotalSValue = Number(TotalSValue) + Number(newobj["StoneValue"]);
    TotalMValue = Number(TotalMValue) + Number(newobj["MetalValue"]);
    AllTotal = Number(TotItemVal) + Number(newobj["TotalAmount"]);
    TotHM = Number(TotHM) + Number(newobj["HMCharge"]);
    TotNet = Number(TotNet) + Number(newobj["NettWt"]);
    TotGr = Number(TotGr) + Number(newobj["GrossWt"]);
    let netValue =
      Number(AllTotal) +
      Number(calData?.ExciseDuty || 0) +
      Number(calData?.Tax * 0.01 * AllTotal || 0);

    setCalData({
      ...calData,
      TotalMakingCharge: TotalMCharge.toFixed(2),
      TotalMetalValue: TotalMValue.toFixed(2),
      TotalStoneValue: TotalSValue.toFixed(2),
      TotalItemAmount: AllTotal.toFixed(2),
      TotalGross: TotGr.toFixed(3),
      TotalNet: TotNet.toFixed(3),
      TotalHM: TotHM.toFixed(2),
      NetAmount: netValue.toFixed(2),
    });
  };
  // //stone table input change
  const handleChange1 = (id, key, e, cid) => {
    const value = e.target.value;
    let mainArray = [...rows];
    let StoneArray = mainArray[parentId]?.StoneDetails || [];
    let newobj = { ...StoneEstimate };
    newobj = { ...newobj, ...StoneArray[cid] };
    // console.log(e.target.value, key);
    const regexWt = /^\d*\.?\d{0,3}$/;
    const regexAmt = /^\d*\.?\d{0,2}$/;
    const regexWholeNumber = /^\d*$/;
    if (key === "StoneWt" && regexWt.test(value)) {
      newobj["StoneWt"] = value;
    } else if (key === "Rate" && regexAmt.test(value)) {
      newobj["Rate"] = value;
    } else if (key === "STONE_CODE") {
      newobj["STONE_SUB"] = null;
      newobj["STONE_NAME"] = null;
      newobj["Stone_ID"] = null;
      newobj["STONE_CODE"] = value;
      // console.log(newobj);
    } else if (key === "STONE_SUB") {
      newobj["STONE_NAME"] = null;
      newobj["Stone_ID"] = null;
      newobj["STONE_SUB"] = value;
      let obj = StoneSubList.filter((item) => item?.STONE_SUB === value)[0];
      newobj["STONE_NAME"] = obj?.STONE_NAME;
      newobj["Stone_ID"] = obj?.Stone_ID;
      // console.log(obj, newobj);
    } else if (key === "Pcs" && regexWholeNumber.test(value)) {
      newobj["Pcs"] = value;
    } else if (
      key !== "Rate" &&
      key !== "StoneWt" &&
      key !== "STONE_CODE" &&
      key !== "STONE_SUB" &&
      key !== "STONE_NAME" &&
      key !== "Pcs"
    ) {
      newobj[key] = value;
    }

    if (newobj?.Rate && newobj?.RateType && newobj?.Pcs && newobj?.StoneWt) {
      if (newobj?.RateType === "Pcs") {
        newobj["StoneAmount"] = (
          Number(newobj?.Pcs) * Number(newobj?.Rate)
        ).toFixed(2);
      } else if (newobj?.RateType === "Wt") {
        newobj["StoneAmount"] = (
          Number(newobj?.StoneWt) * Number(newobj?.Rate)
        ).toFixed(2);
      }
    }
    // console.log(newobj);

    StoneArray[cid] = newobj;
    mainArray[parentId]["StoneDetails"] = StoneArray;
    setRows(mainArray);
    AllTotalCal();
  };
  // Function to delete a row
  const deleteRow = (id) => {
    let ExistingRows = rows.filter((row) => row.id !== id);
    let n = ExistingRows?.length;
    for (let i = 0; i < n; i++) {
      ExistingRows[i].id = i + 1;
    }
    setRows(ExistingRows);
    AllTotalCal();
  };
  const deleteRow1 = (sid) => {
    let mainArray = [...rows];
    let stoneArray = mainArray[parentId]?.StoneDetails || [];
    let ExistingRows = stoneArray?.filter((row) => row.id !== sid);
    //console.log(sid);
    let i = 1;
    let arr = ExistingRows.reduce((acc, item) => {
      item.id = i;
      acc.push({ ...item, id: i });
      i++;
      return acc;
    }, []);
    mainArray[parentId]["StoneDetails"] = arr;
    // console.log(mainArray);
    setRows(mainArray);
  };
  const Calculate1 = () => {
    let TotalStoneRate = 0;
    let mainArray = [...rows];
    let rows1 = mainArray[parentId]?.StoneDetails || [];
    rows1.map((item) => {
      TotalStoneRate = Number(TotalStoneRate) + Number(item["StoneAmount"]);
    });
    mainArray[parentId]["StoneValue"] = TotalStoneRate;
    console.log(mainArray[parentId]["MetalValue"]);

    mainArray[parentId]["TotalAmount"] = (
      Number(mainArray[parentId]["MetalValue"]) +
      Number(mainArray[parentId]["MkgCharge"]) +
      Number(mainArray[parentId]["OthersCharge"]) +
      Number(mainArray[parentId]["HMCharge"]) +
      Number(TotalStoneRate)
    ).toFixed(2);
    setRows(mainArray);
    let totalStoneAmt = 0;
    AllTotalCal();
  };
  const ManageCustDetails = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    let finalValue = null;
    let finalkey = null;
    const regexAmt = /^\d*\.?\d{0,2}$/;
    let totAmt = 0;
    rows?.map((item) => {
      totAmt = Number(totAmt) + Number(item?.TotalAmount);
    });

    if (key === "Tax" && regexAmt.test(value)) {
      let taxamt = (Number(value) * 0.01 * Number(totAmt)).toFixed(2);
      let amt = (
        Number(totAmt) +
        Number(taxamt) +
        Number(calData?.ExciseDuty)
      ).toFixed(2);
      setCalData({
        ...calData,
        [key]: value,
        ["NetAmount"]: amt,
        ["TaxAmt"]: taxamt,
      });
    }
    if (key === "ExciseDuty" && regexAmt.test(value)) {
      let Exe = (
        Number(totAmt) +
        Number(value) +
        Number(calData?.Tax) * 0.01 * Number(totAmt)
      ).toFixed(2);
      setCalData({ ...calData, [key]: value, ["NetAmount"]: Exe });
    }
    if (key !== "Tax" && key !== "ExciseDuty") {
      console.log(calData, "hi");

      setCalData({ ...calData, [key]: value });
    }
  };
  const rightAlignText = (doc, text, x, y) => {
    const textWidth = doc.getTextWidth(text);
    doc.text(text, x - textWidth, y); // Adjust X by subtracting the text width
  };
  const generateChalanPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt", // Points (1 inch = 72 points)
      format: [360, 1440], // 4 inches width (288pt) and 20 inches height (1440pt)
    });
    // Adjusted margins
    const leftMargin = 20; // Decreased left margin

    // Add title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Estimate", 145, 36);
    doc.setFont("helvetica", "normal");

    // Add Customer Details
    //1st box
    doc.setLineWidth(1);
    doc.rect(leftMargin, 40, 190, 100, "S");
    doc.setFontSize(12);
    doc.text(`Name: ${calData.CustomerName || ""}`, leftMargin + 5, 55, {
      maxWidth: 200 - leftMargin,
    });
    doc.setFontSize(11);
    doc.text(`Address: ${calData.Address || ""}`, leftMargin + 5, 85, {
      maxWidth: 200 - leftMargin,
    }); // Adjusted maxWidth to keep within the paper
    doc.text(`Phone: ${calData.Phn || ""}`, leftMargin + 5, 138); // Added margin to avoid overlap
    //2nd box
    doc.setLineWidth(1);
    doc.rect(leftMargin + 190, 40, 130, 100, "S");
    doc.text(`Voucher: ${vouno || ""}`, leftMargin + 195, 55);
    doc.text(
      `Vou Date: ${moment(calData?.VOUDATE).format("DD/MM/YY") || ""}`,
      leftMargin + 195,
      75
    );
    doc.text(
      `S.M: ${calData.SPName}(${calData?.SalesPerson})`,
      leftMargin + 195,
      95
    );
    doc.text(
      `Time: ${currentdatetime.format("HH:mm:ss") || ""}`,
      leftMargin + 195,
      115
    );

    // Set up table headers
    doc.setLineWidth(1);
    doc.rect(leftMargin, 150, 320, 20, "S");
    let yOffset = 130 + 35;
    doc.setFontSize(12); // Smaller font size for the table

    doc.text("SL", leftMargin + 5, yOffset);
    doc.text("Description", leftMargin + 28, yOffset);
    doc.text("Pcs", leftMargin + 110, yOffset);
    doc.text("Pty", leftMargin + 150, yOffset);
    doc.text("NW", leftMargin + 205, yOffset);
    doc.text("Value", leftMargin + 280, yOffset);
    const jYstart = yOffset + 5;
    yOffset += 20;

    doc.setLineWidth(1);

    // Loop through each row and add to the table
    rows.forEach((row) => {
      doc.text(`${row["id"]}`, leftMargin + 5, yOffset);
      doc.text(row["Detail"] || "", leftMargin + 28, yOffset);
      rightAlignText(doc, `${row["Pcs"] || "0"}`, leftMargin + 135, yOffset);
      rightAlignText(
        doc,
        `${row["Purity"] || "0.000"}`,
        leftMargin + 165,
        yOffset
      );
      rightAlignText(
        doc,
        `${Number(row["NettWt"]).toFixed(3) || "0.000"}`,
        leftMargin + 230,
        yOffset
      );
      rightAlignText(
        doc,
        `${Number(row["TotalAmount"]).toFixed(2) || "0.00"}`,
        leftMargin + 315,
        yOffset
      );
      yOffset += 15;
    });
    doc.rect(leftMargin, jYstart, 320, yOffset - jYstart - 10, "S");
    yOffset += 5;
    doc.setFontSize(14);
    doc.text("Item Detail", 148, yOffset + 5);
    //item details
    doc.setLineWidth(1);
    doc.rect(leftMargin, yOffset + 10, 320, 20, "S"); //

    doc.setFontSize(12);
    yOffset += 25;
    doc.text("SL", leftMargin + 5, yOffset);
    doc.text("GW", leftMargin + 45, yOffset);
    doc.text("M.Type", leftMargin + 90, yOffset);
    doc.text("M.Rate", leftMargin + 145, yOffset);
    doc.text("M.C", leftMargin + 220, yOffset);
    doc.text("HM", leftMargin + 290, yOffset);
    const itemYstart = yOffset;

    doc.setLineWidth(1);
    yOffset += 20;
    rows.forEach((row) => {
      doc.text(`${row["id"]}`, leftMargin + 5, yOffset);
      rightAlignText(
        doc,
        `${Number(row["GrossWt"]).toFixed(3)}` || "0.000",
        leftMargin + 80,
        yOffset
      );
      doc.text(row["MkgType"] || "", leftMargin + 98, yOffset);
      rightAlignText(
        doc,
        `${Number(row["MkgRate"]).toFixed(2)}` || "0.0",
        leftMargin + 185,
        yOffset
      );
      rightAlignText(
        doc,
        `${Number(row["MkgCharge"]).toFixed(2)}` || "0.0",
        leftMargin + 265,
        yOffset
      );
      rightAlignText(
        doc,
        `${Number(row["HMCharge"]).toFixed(2)}` || "0.0",
        leftMargin + 315,
        yOffset
      );
      yOffset += 15;
    });
    doc.rect(leftMargin, itemYstart + 5, 320, yOffset - itemYstart - 10, "S");
    //stone details
    doc.setFontSize(13);
    yOffset += 15;
    doc.text("Stone Detail", 148, yOffset);
    doc.setLineWidth(1);
    doc.rect(leftMargin, yOffset + 5, 320, 20, "S");
    doc.setFontSize(12);
    yOffset += 20;
    doc.text("SL", leftMargin + 5, yOffset);
    doc.text("St.Name", leftMargin + 30, yOffset);
    doc.text("Pcs", leftMargin + 120, yOffset);
    doc.text("Wt", leftMargin + 160, yOffset);
    doc.text("Rate", leftMargin + 210, yOffset);
    doc.text("Value", leftMargin + 270, yOffset);
    const stoneYstart = yOffset + 5;
    doc.setLineWidth(1);
    yOffset += 25;
    rows.forEach((row) => {
      row?.StoneDetails.forEach((stone) => {
        if (stone["STONE_CODE"] !== null) {
          doc.text(`${row["id"] || ""}`, leftMargin + 5, yOffset);
          doc.text(stone["STONE_NAME"] || "", leftMargin + 30, yOffset);
          //doc.text(`${stone["Pcs"] || ""}`, leftMargin + 120, yOffset);
          rightAlignText(
            doc,
            `${stone["Pcs"] || ""}`,
            leftMargin + 135,
            yOffset
          );
          //doc.text(`${stone["StoneWt"] || "0"}`, leftMargin + 175, yOffset);
          rightAlignText(
            doc,
            `${stone["StoneWt"] || "0"}`,
            leftMargin + 180,
            yOffset
          );
          rightAlignText(
            doc,
            `${Number(stone["Rate"]).toFixed(2) || "0"}`,
            leftMargin + 240,
            yOffset
          );
          doc.text(
            `${Number(stone["StoneAmount"]).toFixed(2) || "0"}`,
            leftMargin + 265,
            yOffset
          );
          yOffset += 20;
        }
      });
    });
    doc.rect(leftMargin, stoneYstart, 320, yOffset - stoneYstart, "S");
    doc.setFontSize(14);
    yOffset += 10;

    doc.rect(leftMargin, yOffset, 320, 22, "S");
    yOffset += 14;
    doc.text("Summary", leftMargin + 5, yOffset);
    doc.text("Wt", leftMargin + 160, yOffset);
    doc.text("Amt.", leftMargin + 280, yOffset);
    // Add Summary Data
    doc.rect(leftMargin, yOffset + 4, 320, 125, "S");

    yOffset += 20;
    doc.setFontSize(12); // Return to the default font size for the summary
    doc.text(`Tot. Gross Wt.`, leftMargin + 5, yOffset);
    rightAlignText(
      doc,
      `${calData.TotalGross || 0.0}`,
      190 + leftMargin,
      yOffset
    );
    yOffset += 14;
    doc.text(`Tot. Net. Wt.`, leftMargin + 5, yOffset);
    rightAlignText(
      doc,
      `${calData.TotalNet || 0.0}`,
      190 + leftMargin,
      yOffset
    );
    yOffset += 14;
    doc.text(`Tot. HM. Chg.`, leftMargin + 5, yOffset);
    rightAlignText(doc, `${calData.TotalHM || 0.0}`, 310 + leftMargin, yOffset);
    yOffset += 14;
    doc.text(`Tot. Metal Val.`, leftMargin + 5, yOffset);
    rightAlignText(
      doc,
      `${calData.TotalMetalValue || 0.0}`,
      310 + leftMargin,
      yOffset
    );
    yOffset += 16;
    doc.text(`Tot. St. Val`, leftMargin + 5, yOffset);
    rightAlignText(
      doc,
      `${calData.TotalStoneValue || 0.0}`,
      310 + leftMargin,
      yOffset
    );
    yOffset += 16;
    doc.text(`Tot. Mkg. Chg`, leftMargin + 5, yOffset);
    rightAlignText(
      doc,
      `${calData.TotalMakingCharge || 0.0}`,
      310 + leftMargin,
      yOffset
    );
    yOffset += 16;
    doc.text(`Excise Duty`, leftMargin + 5, yOffset);
    rightAlignText(
      doc,
      `${Number(calData.ExciseDuty).toFixed(2) || 0.0}`,
      310 + leftMargin,
      yOffset
    );
    yOffset += 16;
    doc.text(`Tax`, leftMargin + 5, yOffset);
    rightAlignText(
      doc,
      `${Number(calData.Tax).toFixed(2) || 0.0}`,
      310 + leftMargin,
      yOffset
    );
    // doc.text(`${Number(calData.Tax).toFixed(2) || 0.0}`, leftMargin + 252, yOffset);

    doc.line(leftMargin, yOffset + 8, 340, yOffset + 8);
    yOffset += 16;
    rightAlignText(
      doc,
      `Net Amount: ${Number(calData.NetAmount).toFixed(2) || 0.0}`,
      leftMargin + 315,
      yOffset + 8
    );
    yOffset += 8;
    doc.line(leftMargin, yOffset + 8, 340, yOffset + 8);
    yOffset += 25;
    doc.text(
      "***Received the ornament mention above by Customer Handle with care. Longibity is your responsibility.***",
      leftMargin + 20,
      yOffset,
      { maxWidth: 320 }
    );
    yOffset += 50;
    doc.line(leftMargin, yOffset, leftMargin + 110, yOffset);
    doc.line(leftMargin + 130, yOffset, leftMargin + 210, yOffset);
    doc.line(leftMargin + 240, yOffset, leftMargin + 320, yOffset);
    yOffset += 15;
    doc.text("Customer Signature", leftMargin, yOffset);
    doc.text("Checked By", leftMargin + 135, yOffset);
    doc.text("Org.Signature", leftMargin + 245, yOffset);
    doc.line(leftMargin, yOffset + 8, 340, yOffset + 8);
    yOffset += 20;
    doc.text("Thank You and visit again", leftMargin + 90, yOffset + 5, {
      maxWidth: 360,
    });
    window.open(doc.output("bloburl"), "_blank");

    // Save the PDF
    //doc.save(`Estimate-${currentdatetime.format("DD/MM/YYYY-HH:mm:ss")}.pdf`);
    dispatch(ClearState14());
  };
  const handleClose = () => {
    setShowModal({
      customer: false,
      agent: false,
      itemid: false,
      itemcode: false,
      stone: false,
      others: false,
    });
  };
  const SaveCustomerData = () => {
    let CustObj = CustList.filter(
      (item) => item?.CUSTNO === rowid?.customer
    )[0];
    setCalData({
      ...calData,
      CUSTNO: CustObj?.CUSTNO,
      CustomerName: CustObj?.NAME,
      Address: CustObj?.ADDRESS1,
      Phn: CustObj?.PHONE,
    });
    handleClose();
  };
  const columns1 = [
    {
      key: "STONE_CODE",
      label: "Stone Code",
      SelectOption: true,
      data: SelectStone,
      PlaceHolder: "Stone",
    },
    {
      key: "STONE_SUB",
      label: "Sub Code",
      SelectOption: true,
      isCustomized: true,
      PlaceHolder: "Sub Code",
    },
    { key: "STONE_NAME", label: "Stone Name", type: "text" },
    { key: "Pcs", label: "Pcs.", type: "number" },
    { key: "StoneWt", label: "Stone Wt.", type: "number" },
    {
      key: "RateType",
      label: "Rate Type",
      SelectOption: true,
      data: [
        { Value: -1, Name: "--Select--" },
        { Value: "Wt", Name: "Weight" },
        { Value: "Pcs", Name: "Pcs" },
      ],
      PlaceHolder: "Rate type",
    },
    { key: "Rate", label: "Rate", type: "number" },
    { key: "StoneAmount", label: "Amount", type: "number", ReadOnly: true },
  ];
  const AllTotalCal = () => {
    let totMkgChg = 0,
      totStAmt = 0,
      totMVAmt = 0,
      totItemAmt = 0,
      totalGW = 0,
      totalNW = 0,
      totalHM = 0.0;
    rows?.map((item) => {
      totMVAmt = Number(totMVAmt) + Number(item?.MetalValue);
      totStAmt = Number(totStAmt) + Number(item?.StoneValue);
      totMkgChg = Number(totMkgChg) + Number(item?.MkgCharge);
      totItemAmt = Number(totItemAmt) + Number(item?.TotalAmount);
      totalGW = Number(totalGW) + Number(item?.GrossWt);
      totalNW = Number(totalNW) + Number(item?.NettWt);
      totalHM = Number(totalHM) + Number(item?.HMCharge);
    });
    let taxCal = 0,
      netAmt = 0;

    taxCal = Number(totItemAmt) * Number(calData?.Tax * 0.01);
    netAmt =
      Number(totItemAmt) +
      Number(taxCal || 0) +
      Number(calData?.ExciseDuty || 0);

    setCalData({
      ...calData,
      TotalMetalValue: totMVAmt.toFixed(2),
      TotalStoneValue: totStAmt.toFixed(2),
      TotalMakingCharge: totMkgChg.toFixed(2),
      TotalItemAmount: totItemAmt.toFixed(2),
      TotalGross: totalGW,
      TotalNet: totalNW,
      TotalHM: totalHM,
      TaxAmt: taxCal.toFixed(2),
      NetAmount: netAmt.toFixed(2),
    });
    dispatch(ClearState14());
  };
  const SaveEstimation = () => {
    dispatch(
      EstimateFunc({
        CompanyCode: userInfo?.details?.CompanyCode,
        ...calData,
        data: rows,
      })
    )
      .then(async (resp) => {
        console.log(resp?.payload?.uniqueData);
        setVouNo(resp?.payload?.uniqueData);
      })
      .catch(() => {
        toast.error("Error occur to generate Estimate", {
          position: "top-right",
          autoClose: 5000,
        });
      });
  };
  console.log(rows);

  return (
    <Container fluid>
      <ToastContainer />
      <Row>
        <Col xs={12} sm={6} style={{ height: "55px" }}>
          <h5 className="mt-2 text-nowrap">Estimate Items</h5>
        </Col>
        <Col
          className="d-flex justify-content-sm-end align-items-center"
          xs={12}
          sm={6}
          style={{ height: "55px" }}
        >
          <div className="mt-3">
            <InputBox
              Icon={<i className="bi bi-calendar3"></i>}
              Name={"VOUDATE"}
              error={false}
              errorMsg={"Enter name"}
              label={"cust-name"}
              maxlen={50}
              onChange={ManageCustDetails}
              placeholder={"Vouter Date"}
              type={"date"}
              value={calData?.VOUDATE || ""}
              InputStyle={{ width: "200px" }}
            />
          </div>{" "}
        </Col>
        <hr />
      </Row>

      {/*customer input*/}
      <Row>
        <Col sm={12} md={6}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={6} xl={6}>
              <InputBox
                Icon={<i className="bi bi-person "></i>}
                Name={"CustomerName"}
                error={false}
                errorMsg={"Enter name"}
                label={"cust-name"}
                maxlen={50}
                onChange={ManageCustDetails}
                placeholder={"Customer Name"}
                type={"text"}
                value={calData?.CustomerName || ""}
                SearchButton={true}
                SearchHandler={(id, key) => {
                  setShowModal({ ...showModal, customer: true });
                  // setShowModal({...showModal,customer:false});
                }}
              />
              <ReusableModal
                Title={"Item List"}
                body={
                  <ReusableDataGrid
                    col={CustomerCol}
                    row={CustList}
                    uniquekey={"CUSTNO"}
                    id={rowid?.customer}
                    onChangeRow={(id) => {
                      setRowId({ ...rowid, customer: id });
                    }}
                    key={1}
                  />
                }
                isPrimary={true}
                isSuccess={false}
                handleClose={handleClose}
                handlePrimary={SaveCustomerData}
                show={showModal?.customer}
                key={1}
              />
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} xl={6}>
              <InputBox
                Icon={<i className="bi bi-telephone "></i>}
                Name={"Phn"}
                error={!inputVal?.Phn}
                errorMsg={"Enter Correct Phone Number"}
                label={"cust-phn"}
                maxlen={10}
                onChange={(e) => {
                  if (
                    e.target.value === "" ||
                    e.target.value === null ||
                    e.target.value === undefined
                  ) {
                    setInputVal({ ...inputVal, Phn: true });
                  } else {
                    let res = PhnoValidation(e.target.value);
                    setInputVal({ ...inputVal, Phn: res });
                  }
                  ManageCustDetails(e);
                }}
                placeholder={"Customer Phone Number"}
                type={"tel"}
                value={calData?.Phn || ""}
              />
            </Col>
          </Row>
        </Col>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={6}
          xl={6}
          className="d-flex justify-content-end"
        >
          <div>
            <InputBox
              Icon={<i className="bi bi-person "></i>}
              Name={"SalesPerson"}
              error={false}
              errorMsg={"Enter name"}
              label={"salesman-name"}
              maxlen={50}
              onChange={ManageCustDetails}
              placeholder={"Sales Person"}
              type={"text"}
              value={calData?.SPName || ""}
              SearchButton={true}
              SearchHandler={(id, key) => {
                setShowModal({ ...showModal, salesMan: true });
                // setShowModal({...showModal,customer:false});
              }}
            />

            <ReusableModal
              Title={"Sales Person"}
              body={
                <ReusableDataGrid
                  col={SalesManCol}
                  row={salesMan}
                  uniquekey={"CODE"}
                  id={rowid?.SalesPerson}
                  onChangeRow={(id) => {
                    setRowId({ ...rowid, SalesPerson: id });
                  }}
                  key={rowid?.SalesPerson}
                />
              }
              isPrimary={true}
              isSuccess={false}
              handleClose={handleClose}
              handlePrimary={() => {
                let SalesData = (salesMan &&
                  salesMan?.filter(
                    (item) => item?.CODE === rowid?.SalesPerson
                  ))[0];
                setCalData({
                  ...calData,
                  SalesPerson: SalesData?.CODE,
                  SPName: SalesData?.NAME,
                });
                handleClose();
              }}
              show={showModal?.salesMan}
              key={1}
            />
          </div>
        </Col>
        <Col>
          <Row>
            <Col>
              <InputGroup>
                <InputGroup.Text
                  style={{ backgroundColor: "#2f2d66", color: "white" }}
                >
                  <i className="bi bi-geo-alt "></i>
                </InputGroup.Text>
                <Form.Control
                  as="textarea"
                  aria-label="With textarea"
                  name={"Address"}
                  label={"cust-Address"}
                  maxlen={50}
                  style={{ color: "grey", fontSize: "14px" }}
                  onChange={ManageCustDetails}
                  placeholder={"Customer Address"}
                  value={calData?.Address || ""}
                />
              </InputGroup>
            </Col>
          </Row>
        </Col>
      </Row>

      {/**Estimate*/}
      <Row>
        <Col>
          {/**table gold jewellery */}
          <EstimateTable
            columns={columns || []}
            rows={rows || []}
            handleChange={handleChange}
            deleteRow={deleteRow}
            FetchRowId={(id) => {
              let index = rows?.findIndex((item) => item?.id === id);
              // console.log(index, id);
              setParentId(index);
              setShowModal({ ...showModal, stone: true });
            }}
            SearchHandler={(id, key) => {
              let index = rows?.findIndex((item) => item?.id === id);
              // console.log(id, index);
              setParentId(index);
              if (key === "ITEMCODE") {
                setShowModal({ ...showModal, itemcode: true });
              } else if (key === "ItemId") {
                setShowModal({ ...showModal, itemid: true });
              }
            }}
          />
          <ReusableModal
            Title={"Jewllery Items"}
            body={
              <ReusableDataGrid
                col={ItemCol}
                row={ItemData}
                uniquekey={"ITEMCODE"}
                id={rowid?.itemcode}
                onChangeRow={(id) => {
                  let iData1 = {};
                  iData1 = (ItemData?.filter(
                    (item) => item?.ITEMCODE === id
                  ))[0];
                  console.log("inItemCode", iData1);

                  if (
                    iData1?.ITEMCODE !== undefined &&
                    iData1?.ITEMCODE !== null
                  ) {
                    // SetIData1(Data);
                    let newObj = {
                      ...EstimationTableObj,
                      id: rows[parentId]?.id,
                    };
                    newObj = {
                      ...newObj,
                      id: rows[parentId]?.id,
                      ITEMCODE: iData1?.ITEMCODE,
                      Description: iData1?.DESCRIPTION,
                      Detail: iData1?.DETAIL,
                    };
                    //  console.log(newObj, "check");
                    console.log(iData1, newObj);
                    rows[parentId] = newObj;
                  }
                }}
                key={rowid?.SalesPerson}
              />
            }
            isPrimary={true}
            isSuccess={false}
            handleClose={handleClose}
            handlePrimary={() => {
              handleClose();
            }}
            show={showModal?.itemcode}
            key={1}
          />
          <ReusableModal
            Title={"Jewllery Items"}
            body={
              <ReusableDataGrid
                col={IdHeader}
                row={Item}
                uniquekey={"IDNUM"}
                id={rowid?.itemid}
                onChangeRow={(id) => {
                  let iData = {};
                  iData = (Item?.filter((item) => item?.IDNUM === id))[0];
                  console.log(id);
                  if (iData?.IDNUM !== undefined && iData?.IDNUM !== null) {
                    // SetIData(Data);
                    let newObj = {
                      ...EstimationTableObj,
                      id: rows[parentId]?.id,
                    };

                    newObj = {
                      ...newObj,
                      id: rows[parentId]?.id,
                      ItemId: iData?.IDNUM,
                      ITEMCODE: iData?.ITEM,
                      Description: iData?.ITEMDESCRIPTION,
                      Detail: iData?.DETAIL,
                      Pcs: iData?.PCS,
                      Rate: iData?.GOLD_RATE,
                      ManualId: iData?.MANUALID,
                      GrossWt: iData?.GROSS_WT,
                      NettWt: iData?.NETT_WT,
                      MkgType: iData?.MAKING_TYPE,
                      MkgRate: iData?.MAKING_RATE,
                      MkgCharge: iData?.MAKING,
                      OthersCharge: iData?.OTHER_CHARGES,
                      MetalValue: iData?.GOLD_VALUE,
                      StoneValue: iData?.STONE_VALUE,
                      TotalAmount: iData?.TOT_VALUE,
                      Purity: iData?.PURITY,
                      HMCharge: iData?.HMCHARGE,
                    };
                    console.log(newObj, iData, "findme");

                    rows[parentId] = newObj;
                  }
                }}
                key={rowid?.itemid}
              />
            }
            isPrimary={true}
            isSuccess={false}
            handleClose={handleClose}
            handlePrimary={() => {
              handleClose();
            }}
            show={showModal?.itemid}
            key={1}
          />
          {/**table stone */}

          <ReusableModal
            show={showModal?.stone}
            Title={"Stone Value Estimation"}
            isPrimary={true}
            isSuccess={true}
            handleClose={handleClose}
            handlePrimary={() => {
              Calculate1();
              handleClose();
            }}
            handleSuccess={addRow1}
            SuccessButtonName={"Add Row"}
            PrimaryButtonName={"Calculate"}
            key={4}
            body={
              <EstimateTable
                columns={columns1}
                rows={
                  rows[parentId]?.StoneDetails || [{ ...StoneEstimate, id: 1 }]
                }
                handleChange={(rid, colkey, e) => {
                  let mainArray = [...rows];

                  let StoneArray = mainArray[parentId]?.StoneDetails || [];
                  let childIndex = StoneArray?.findIndex(
                    (item) => item?.id === rid
                  );
                  //  console.log(childIndex, rid);
                  setChildId(childIndex);

                  handleChange1(rid, colkey, e, childIndex);
                }}
                deleteRow={(id) => {
                  let mainArray = { ...rows };
                  let stoneArray = mainArray[parentId]?.StoneDetails;
                  let stoneIndex = stoneArray.findIndex(
                    (item) => item?.id === id
                  );
                  setChildId(stoneIndex);
                  deleteRow1(id);
                }}
                FetchRowId={(id) => {
                  // setChildId(id);
                  //console.log(id,parentId,"open stone modal");
                  // setShowModal({ ...showModal, stone: true });
                }}
                SearchHandler={(id, key) => {
                  // setChildId(id);
                  // setShowModal({ ...showModal, item: true });
                }}
              />
            }
          />

          {/**Buttons*/}
          <div className="text-end">
            <Button
              variant="link"
              onClick={addRow}
              aria-label={"Add Row"}
              type={"button"}
              style={{
                padding: 0,
                margin: "0px 5px",
                fontSize: "25px",
                color: "green",
              }}
            >
              <i className="bi bi-plus-square-fill"></i>
            </Button>
          </div>
        </Col>
      </Row>

      {/** others input of Estimation */}
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <div className="mb-3">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="2"
              name="Narration"
              maxlen={500}
              onChange={ManageCustDetails}
              placeholder={"Narration"}
              type={"text"}
              value={calData?.Narration || ""}
            ></textarea>{" "}
          </div>
        </Col>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={8}
          xl={8}
          style={{ marginBottom: "25px" }}
        >
          <DataGrid
            rows={[{ ...calData, srl: 1 }]}
            columns={TotCal}
            getRowId={(item) => {
              if (item) {
                return item?.srl;
              } else {
                return -1;
              }
            }}
            autoHeight
            hideFooter
            hideFooterPagination
            density={"compact"}
          />
        </Col>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={4}
          xl={4}
          className="d-flex justify-content-end"
        >
          <div style={{ width: "420px" }}>
            <InputBox
              Icon={
                <span style={{ padding: "2px 5px", fontSize: "12px" }}>
                  ExciseDuty
                </span>
              }
              Name={"ExciseDuty"}
              error={false}
              errorMsg={"Enter ExciseDuty"}
              label={"cust-ExciseDuty"}
              onChange={ManageCustDetails}
              placeholder={"ExciseDuty"}
              type={"number"}
              value={calData?.ExciseDuty || ""}
              InputStyle={{ TextAlign: "end" }}
            />
            <InputBox
              Icon={
                <span style={{ padding: "2px 5px", fontSize: "12px" }}>
                  Tax (%)
                </span>
              }
              Name={"Tax"}
              error={false}
              errorMsg={"Enter Tax"}
              label={"cust-Tax"}
              onChange={ManageCustDetails}
              placeholder={"Tax"}
              type={"number"}
              value={calData?.Tax || ""}
              InputStyle={{ TextAlign: "end" }}
            />
            <InputBox
              Icon={
                <span style={{ padding: "2px 5px", fontSize: "12px" }}>
                  Tax Amt
                </span>
              }
              Name={"TaxAmt"}
              error={false}
              errorMsg={"Enter Tax"}
              label={"cust-Tax-amount"}
              placeholder={"Tax Amount"}
              type={"number"}
              ReadOnly
              value={calData?.TaxAmt || ""}
              InputStyle={{ TextAlign: "end" }}
            />
            <InputBox
              Icon={
                <span style={{ padding: "3px 5px", fontSize: "12px" }}>
                  Net Amount
                </span>
              }
              Name={"NetAmount"}
              error={false}
              errorMsg={"Enter NetAmount"}
              label={"cust-NetAmount"}
              ReadOnly
              placeholder={"NetAmount"}
              type={"number"}
              value={calData?.NetAmount || ""}
              InputStyle={{ TextAlign: "end" }}
            />
          </div>
        </Col>
      </Row>

      {/** Print */}
      <div className="d-flex justify-content-evenly align-items-center px-1">
        <SubmitButton
          ButtonNm={"Print"}
          OnClickBtn={generateChalanPDF}
          disabled={!isSuccess14}
        />
        <Button
          variant="primary"
          onClick={SaveEstimation}
          disabled={
            !(
              calData?.CustomerName !== null &&
              calData?.VOUDATE !== null &&
              calData?.NetAmount !== 0 &&
              calData?.SalesPerson !== null &&
              calData?.TotalItemAmount !== 0 &&
              calData?.TotalMetalValue !== 0
            )
          }
        >
          Save
        </Button>
      </div>
    </Container>
  );
}

export default Estimate;
