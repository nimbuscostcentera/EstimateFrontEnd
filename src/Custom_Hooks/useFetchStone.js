import React, { useEffect, useMemo, useState } from "react";
import { ClearState6, StoneListFunc } from "../Slice/StoneListSlice";
import { useDispatch, useSelector } from "react-redux";
const useFetchStone = (obj = {}, dep=[])=> {
  const dispatch = useDispatch();
  const { isloading6, Result6, error6, isError6, isSuccess6 } = useSelector(
    (state) => state.stone
  );
  useEffect(() => {
    dispatch(StoneListFunc(obj));
  }, dep);

  let StoneList = useMemo(() => {
    if (Result6) {
      return Result6;
    } else {
      return [];
    }
  }, [isSuccess6, isError6, isloading6]);

  return { StoneList, isSuccess6, isError6, isloading6, error6 };
}

export default useFetchStone;
