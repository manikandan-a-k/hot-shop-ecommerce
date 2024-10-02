import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import AddProduct from "./pages/AddProduct";
import ListProduct from "./pages/ListProduct";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";

// Global Axios settings
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://hot-shop-backend.onrender.com";

// Currency constant
export  const currency = "₹";

const App = () => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  // Store the token in localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } 
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {token ? (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <SideBar />
            <div className="w-[75%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddProduct token={token} />} />
                <Route path="/list" element={<ListProduct token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Login setToken={setToken} />
      )}
      <ToastContainer position="top-center" autoClose={2000} theme="light" />
    </div>
  );
};

export default App;
