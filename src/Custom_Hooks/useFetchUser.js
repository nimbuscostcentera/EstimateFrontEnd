import React, { useEffect, useMemo, useState } from "react";
import { ClearState16, UserListFunc } from "../Slice/UserListSlice";
import { useDispatch, useSelector } from "react-redux";
const useFetchUser = (obj = {}, dep=[]) => {
  const dispatch = useDispatch();
  const { isloading16, Result16, error16, isError16, isSuccess16 } =
    useSelector((state) => state.userlist);
  useEffect(() => {
    dispatch(UserListFunc(obj));
  }, dep);

  let UserList = useMemo(() => {
    if (Result16) {
      return Result16;
    } else {
      return [];
    }
  }, [isSuccess16, Result16]);

  return { UserList, isSuccess16, isError16, isloading16, error16 };
};

export default useFetchUser;
