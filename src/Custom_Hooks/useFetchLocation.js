import React, { useEffect, useMemo, useState } from "react";
import { ClearState16, LocationListFunc } from "../Slice/LocationListSlice";
import { useDispatch, useSelector } from "react-redux";
const useFetchLocation = (obj = {}, dep=[]) => {
  const dispatch = useDispatch();
  const { isloading16, Result16, error16, isError16, isSuccess16 } = useSelector(
    (state) => state.loclist
  );
  useEffect(() => {
    dispatch(LocationListFunc(obj));
  },dep);
  let LocationList = useMemo(() => {
    if (Result16) {
      return Result16;
    } else {
      return [];
    }
  }, [isSuccess16, isError16, isloading16]);

  return { LocationList, isSuccess16, isError16, isloading16, error16 };
};

export default useFetchLocation;
