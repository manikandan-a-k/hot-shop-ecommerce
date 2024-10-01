import React, { useState } from "react";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const { token, setToken } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormError = () => {
    let isValid = true;
    const error = {};

    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.email) {
      error.email = "Email field is required";
      isValid = false;
    } else if (!validEmail.test(formData.email)) {
      error.email = "Invalid email";
      isValid = false;
    }

    if (!formData.password) {
      error.password = "Password field is required";
      isValid = false;
    }

    setError(error);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const isValid = handleFormError();
    if (isValid) {
      try {
        setLoading(true);
        const response = await axios.post(
          `/api/auth/login`,
          formData
        );
        if (response.data.success) {
          toast.success(response.data.message);
          setToken(response.data.token);
          navigate("/");
          setLoading(false);
          localStorage.setItem("token",response.data.token)
        } else {
          toast.error(response.data.message);
          setLoading(false);
        }
       
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
        
      }
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col items-center w-[90%] sm:max-w-sm  m-auto mt-8 sm:mt-14 gap-3 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-6 sm:mt-10">
        <p className="text-2xl sm:text-3xl prata-regular">Login</p>
        <hr className="border-none h-[1.5px] w-6 sm:w-8 bg-gray-800" />
      </div>

      <div className="w-full">
        <input
          type="text"
          value={formData.email}
          onChange={handleFormData}
          name="email"
          className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1  text-sm sm:text-base"
          placeholder="Email"
        />
        {error.email && (
          <p className="text-red-500 text-xs mt-2">{error.email}</p>
        )}
      </div>

      <div className=" w-full">
        <div className="flex relative items-center">
          <input
            value={formData.password}
            onChange={handleFormData}
            name="password"
            type={passwordVisible ? "text" : "password"}
            className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1  text-sm sm:text-base"
            placeholder="Password"
          />
          <div
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="text-black absolute right-2   cursor-pointer"
          >
            {passwordVisible ? <VscEye /> : <VscEyeClosed />}
          </div>
        </div>

        {error.password && (
          <p className="text-red-500 mt-2 text-xs">{error.password}</p>
        )}
      </div>

      <div className="w-full text-end">
        <p className="text-xs mt-[-8px] cursor-pointer">
          Forgot your password ?
        </p>
      </div>

      <div className="w-full ">
        <button
          type="submit"
          disabled={loading === true}
          className="bg-black w-full flex justify-center text-white py-2 font-light"
        >
          {loading ? (
            <div className="py-1">
              <AiOutlineLoading3Quarters className="animate-spin" />
            </div>
          ) : (
            <p>Login</p>
          )}
        </button>
      </div>

      <div>
        <p>
          Don't have an account ?{" "}
          <Link
            to={"/signup"}
            className="text-black font-medium hover:underline cursor-pointer"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
