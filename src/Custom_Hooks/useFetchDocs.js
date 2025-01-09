import React, { useEffect, useMemo, useState } from "react";
import { ClearState3, DocsViewFunc } from "../Slice/DocsViewSlice";
import { useDispatch, useSelector } from "react-redux";
const useFetchDocs = (obj = {}, dep = []) => {
  const dispatch = useDispatch();
  const { isloading3, Result3, error3, isError3, isSuccess3 } = useSelector(
    (state) => state.view
  );
  useEffect(() => {
    dispatch(DocsViewFunc(obj));
  }, dep);
  let docs = useMemo(() => {
    if (Result3) {
      return Result3;
    } else {
      return [];
    }
  }, [isSuccess3, isError3, isloading3]);

  return { docs, isSuccess3, isError3, isloading3, error3 };
};

export default useFetchDocs;
