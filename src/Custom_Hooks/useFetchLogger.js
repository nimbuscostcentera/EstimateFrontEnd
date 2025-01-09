import React, {useMemo,useState} from "react";
import { useSelector } from "react-redux";
const useFetchLogger = () => {
  const { isloading, userInfo, error, isError, isSuccess } = useSelector(
    (state) => state.auth
  );

  let global={
    LoggerID: userInfo?.details?.ID,
      CompanyCode: userInfo?.details?.CompanyCode
  }

  return { global, isSuccess, isError, isloading, error };
}

export default useFetchLogger;
