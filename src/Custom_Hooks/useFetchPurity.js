import React, { useEffect, useMemo, useState } from "react";
import { ClearState8, PurityListFunc } from "../Slice/PurityListSlice";
import { useDispatch, useSelector } from "react-redux";
const useFetchPurity = (obj = {},dep=[])=> {
  const dispatch = useDispatch();
  const { isloading8, Result8, error8, isError8, isSuccess8 } = useSelector(
    (state) => state.purity
  );
  useEffect(() => {
    dispatch(PurityListFunc(obj));
  }, dep);
    
  let purity = useMemo(() => {
    if (Result8) {
      return Result8;
    } else {
      return [];
    }
  }, [isSuccess8, isError8, isloading8]);

  return { purity, isSuccess8, isError8, isloading8, error8 };
}

export default useFetchPurity;
