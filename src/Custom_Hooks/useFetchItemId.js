import React, { useEffect, useMemo, useState } from "react";
import { ClearState5, ItemIdListFunc } from "../Slice/ItemIdListSlice";
import { useDispatch, useSelector } from "react-redux";
const useFetchItemId = (obj = {},dep=[])=> {
  const dispatch = useDispatch();
  const { isloading5, Result5, error5, isError5, isSuccess5 } = useSelector(
    (state) => state.ItemId
  );
  useEffect(() => {
    dispatch(ItemIdListFunc(obj));
  }, dep);
  let Item = useMemo(() => {
    if (Result5) {
      return Result5;
    } else {
      return [];
    }
  }, [isSuccess5, isError5, isloading5]);

  return { Item, isSuccess5, isError5, isloading5, error5 };
}

export default useFetchItemId;
