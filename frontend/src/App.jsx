import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import Transactions from "./pages/Transactions";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Register />} />
      <Route path="/homepage" element={<HomePage/>}/>
      <Route path="/showtransactions" element={<Transactions/>}/>
    </Routes>
  );
};

export default App;
