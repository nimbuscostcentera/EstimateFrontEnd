import React, { useEffect, useMemo, useState } from "react";
import { ClearState13, StoneSubListFunc } from "../Slice/StoneSubListSlice";
import { useDispatch, useSelector } from "react-redux";
const useFetchStoneSubList = (obj = {},dep=[]) => {
  const dispatch = useDispatch();
  const { isloading13, Result13, error13, isError13, isSuccess13 } = useSelector(
    (state) => state.stonesub
  );
  useEffect(() => {
    dispatch(StoneSubListFunc(obj));
  }, dep);

  let StoneSubList = useMemo(() => {
    if (Result13) {
      return Result13;
    } else {
      return [];
    }
  }, [isSuccess13, isError13, isloading13]);

  return { StoneSubList, isSuccess13, isError13, isloading13, error13 };
};

export default useFetchStoneSubList;
