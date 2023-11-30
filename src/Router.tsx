import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Main from "./pages/Main";
import Settings from "./pages/Settings";
import Calendar from "./pages/Calendar";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
// 라우팅은 여기에
function Router() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/calendar" element={<Calendar />}></Route>
        <Route path="/detail" element={<Detail />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/*" element={<Navigate to="/main" />} />
      </Routes>
    </>
  );
}

export default Router;
