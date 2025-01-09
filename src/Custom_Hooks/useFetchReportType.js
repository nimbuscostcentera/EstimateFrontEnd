import React, { useEffect, useMemo, useState } from "react";
import { ClearState9, ReportTypeListFunc } from "../Slice/ReportTypeListSlice";
import { useDispatch, useSelector } from "react-redux";
const useFetchReportType = (obj = {}, dep=[])=> {
  const dispatch = useDispatch();
  const { isloading9, Result9, error9, isError9, isSuccess9 } = useSelector(
    (state) => state.reportType
  );
  useEffect(() => {
    dispatch(ReportTypeListFunc(obj));
  }, dep);

  let rtype = useMemo(() => {
    if (Result9) {
      return Result9;
    } else {
      return [];
    }
  }, [isSuccess9, isError9, isloading9]);

  return { rtype, isSuccess9, isError9, isloading9, error9 };
}

export default useFetchReportType;
