import React from 'react';
import { Outlet, Navigate } from "react-router-dom";
function AuthLayout({ authenticated }) {
  return authenticated ? <Outlet /> : <Navigate to="/"/>;
}

export default AuthLayout;