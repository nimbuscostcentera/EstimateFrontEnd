import React, { useEffect, useMemo, useState } from "react";
import { ClearState12, CompanyListFunc } from "../Slice/CompanyListSlice";
import { useDispatch, useSelector } from "react-redux";
const useFetchCompany = (obj = {}, dep=[])=>{
  const dispatch = useDispatch();
  const { isloading12, Result12, error12, isError12, isSuccess12 } =
    useSelector((state) => state.company);
  useEffect(() => {
    dispatch(CompanyListFunc(obj));
  }, dep);
  let companylist = useMemo(() => {
    if (Result12) {
      return Result12;
    } else {
      return [];
    }
  }, [isSuccess12, isError12, isloading12]);

  return { companylist, isSuccess12, isError12, isloading12, error12 };
}

export default useFetchCompany;
