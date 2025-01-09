import React, { useEffect, useMemo, useState } from "react";
import { ClearState4,ItemCodeListFunc } from "../Slice/ItemCodeListSlice";
import { useDispatch, useSelector } from "react-redux";
const useFetchItemCode = (obj = {},dep=[]) =>{
  const dispatch = useDispatch();
  const { isloading4, Result4, error4, isError4, isSuccess4 } =
    useSelector((state) => state.icode);
  useEffect(() => {
    dispatch(ItemCodeListFunc(obj));
  }, dep);
  let ItemCode = useMemo(() => {
    if (Result4) {
      return Result4
    }
    else {
      return [];
    }
  }, [isSuccess4, isError4, isloading4]);

  return {ItemCode,isSuccess4,isError4,isloading4,error4};
}

export default useFetchItemCode;
