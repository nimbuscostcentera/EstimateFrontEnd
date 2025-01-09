import React, { useEffect, useMemo, useState } from "react";
import { ClearState11, SalesManListFunc } from "../Slice/SalesManListSlice";
import { useDispatch, useSelector } from "react-redux";
const useFetchSalesMan = (obj = {}, dep = [])=> {
  const dispatch = useDispatch();
  const { isloading11, Result11, error11, isError11, isSuccess11 } =
    useSelector((state) => state.salesMan);
  useEffect(() => {
    dispatch(SalesManListFunc(obj));
  }, dep);

  let sman = useMemo(() => {
    if (Result11) {
      return Result11;
    } else {
      return [];
    }
  }, [isSuccess11, isError11, isloading11]);

  return { sman, isSuccess11, isError11, isloading11, error11 };
}

export default useFetchSalesMan;
