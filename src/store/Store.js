import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AuthSlice from "../Slice/AuthSlice";
import RegSlice from "../Slice/RegSlice";
import UploadFilesSlice from "../Slice/UploadFilesSlice";
import DocsViewSlice from "../Slice/DocsViewSlice";
import ItemCodeListSlice from "../Slice/ItemCodeListSlice";
import ItemIdListSlice from "../Slice/ItemIdListSlice";
import GoldRateTypeListSlice from "../Slice/GoldRateTypeListSlice";
import PurityListSlice from "../Slice/PurityListSlice";
import ReportTypeListSlice from "../Slice/ReportTypeListSlice";
import CustomerListSlice from "../Slice/CustomerListSlice";
import SalesManListSlice from "../Slice/SalesManListSlice";
import StoneListSlice from "../Slice/StoneListSlice";
import CompanyListSlice from "../Slice/CompanyListSlice";
import StoneSubList from "../Slice/StoneSubListSlice";
import EstimateSlice from "../Slice/EstimateSlice";
import CompanyRegSlice from "../Slice/CompanyRegSlice";
import LocationListSlice from "../Slice/LocationListSlice";
import UserListSlice from "../Slice/UserListSlice";
import UserEditSlice from "../Slice/UserEditSlice";
const rootReducer = combineReducers({
  auth: AuthSlice,
  reg: RegSlice,
  upFile: UploadFilesSlice,
  view: DocsViewSlice,
  icode: ItemCodeListSlice,
  ItemId: ItemIdListSlice,
  grtype: GoldRateTypeListSlice,
  purity: PurityListSlice,
  reportType: ReportTypeListSlice,
  customer: CustomerListSlice,
  salesMan: SalesManListSlice,
  stone: StoneListSlice,
  company: CompanyListSlice,
  stonesub: StoneSubList,
  estimate: EstimateSlice,
  compreg: CompanyRegSlice,
  loclist: LocationListSlice,
  userlist: UserListSlice,
  useredit:UserEditSlice
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredActionPaths: ["register", "rehydrate"],
        ignoredPaths: ["register", "rehydrate"],
      },
    }), // Correctly setting middleware,
});

export const persistor = persistStore(store);
