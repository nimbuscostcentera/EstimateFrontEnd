import React, { useEffect, useMemo, useState } from "react";
import { ClearState7, GoldRateTypeFunc } from "../Slice/GoldRateTypeListSlice";
import { useDispatch, useSelector } from "react-redux";
const useFetchGoldRateType = (obj = {}, dep=[]) =>{
  const dispatch = useDispatch();
  const { isloading7, Result7, error7, isError7, isSuccess7 } = useSelector(
    (state) => state.grtype
  );
  useEffect(() => {
    dispatch(GoldRateTypeFunc(obj));
  }, dep);
  let GoldRateType = useMemo(() => {
    if (Result7) {
      return Result7;
    } else {
      return [];
    }
  }, [isSuccess7, isError7, isloading7]);

  return { GoldRateType, isSuccess7, isError7, isloading7, error7 };
}

export default useFetchGoldRateType;
