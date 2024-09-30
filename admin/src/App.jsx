import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import AddProduct from "./pages/AddProduct";
import ListProduct from "./pages/ListProduct";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Home from "./pages/Home";
//Backend URL
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
//Currency
export const currecy="₹"

const App = () => {
  //Get the token in local strorage and set to token
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  //Store the token in localStorage
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  return (
    <div className="bg-gray-50 min-h-screen">
      {token == "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <SideBar />
            <div className="w-[75%]  mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/add" element={<AddProduct token={token} />}></Route>
                <Route
                  path="/list"
                  element={<ListProduct token={token} />}
                ></Route>
                <Route
                  path="/orders"
                  element={<Orders token={token} />}
                ></Route>
              </Routes>
            </div>
          </div>
        </>
      )}
      <ToastContainer position="top-center" autoClose={2000} theme="light" />
    </div>
  );
};

export default App;
