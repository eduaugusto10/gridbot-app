import React, { useContext } from "react";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Change from "./pages/Change";
import Login from "./pages/Login";
import AuthContext from "./context/auth";

import { Route, Routes, BrowserRouter } from "react-router-dom";

const HomeRoute = () => {
  const { signed } = useContext(AuthContext);
  return signed ? <Home /> : <Login />;
};
const ChangeRoute = () => {
  const { signed } = useContext(AuthContext);

  return signed ? <Change /> : <Login />;
};
const CreateRoute = () => {
  const { signed } = useContext(AuthContext);

  return signed ? <Create /> : <Login />;
};

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<HomeRoute />} />
      <Route path="/create" element={<CreateRoute />} />
      <Route path="/change" element={<ChangeRoute />} />
      <Route path="/home" element={<HomeRoute />} />
      <Route path="/" element={<HomeRoute />} />
      <Route path="*" element={<HomeRoute />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
