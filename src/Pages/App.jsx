import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import CompanyRegistration from "./Pages/CompanyRegistration";
import PageNotFound from "./Pages/PageNotFound";
import Uploadfiles from "./Pages/UploadFilePage";
import UserReg from "./Pages/UserRegistrationPage";
import AdminPanel from "./Pages/AdminPanel";
import ReportView from "./Pages/ReportView";
import PrivateLayout from "./Layout/PrivateLayout";
import Estimate from "./Pages/Estimation";
import LoginPage from "./Pages/LoginPage";
import AuthNavigator from "./Layout/AuthNavigator";
import AuthLayout from "./Layout/AuthLayout";

import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "./App.css";

function App() {
  
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<LoginPage />}/>
      </Route>
      <Route
        path="/auth"
        element={<AuthNavigator authenticated={userInfo?.details?.ID} />}
      >
        <Route
          index
          element={
            <PrivateLayout>
              <AdminPanel />
            </PrivateLayout>
          }
        />
        <Route
          path="view-reports"
          element={
            <PrivateLayout>
              <ReportView />
            </PrivateLayout>
          }
        />
        <Route />
        <Route
          path="upload-files"
          element={
            <PrivateLayout>
              <Uploadfiles />
            </PrivateLayout>
          }
        />
        <Route
          path="user-registration"
          element={
            <PrivateLayout>
              <UserReg />
            </PrivateLayout>
          }
        />
        <Route
          path="estimate"
          element={
            <PrivateLayout>
              <Estimate />
            </PrivateLayout>
          }
        />
        <Route
          path="company-registration"
          element={
            <PrivateLayout>
              <CompanyRegistration />
            </PrivateLayout>
          }
        />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
