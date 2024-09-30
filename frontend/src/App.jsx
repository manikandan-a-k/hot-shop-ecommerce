import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./pages/SignUp";
import Verify from "./pages/Verify";

const App = () => {
  return (
    <main className="px-4 sm:px[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer position="top-center" autoClose={2000} theme="light" />
      <Navbar /> {/* Display in All Pages */}
      {/* //routes */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/collection" element={<Collection />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
        <Route path="/place-order" element={<PlaceOrder />}></Route>
        <Route path="/product/:productId" element={<Product />}></Route>
        <Route path="/verify" element={<Verify />}></Route>
      </Routes>
      <Footer />
    </main>
  );
};

export default App;
