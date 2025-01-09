import React, { useEffect, useMemo, useState } from "react";
import { ClearState10, CustomerListFunc } from "../Slice/CustomerListSlice";
import { useDispatch, useSelector } from "react-redux";
const useFetchCustomer = (obj = {}, dep = []) => {
  const dispatch = useDispatch();
  const { isloading10, Result10, error10, isError10, isSuccess10 } =
    useSelector((state) => state.customer);
  useEffect(() => {
    dispatch(CustomerListFunc(obj));
  }, dep);
  let CustList = useMemo(() => {
    if (Result10) {
      return Result10;
    } else {
      return [];
    }
  }, [isSuccess10, isError10, isloading10]);

  return { CustList, isSuccess10, isError10, isloading10, error10 };
};

export default useFetchCustomer;
