import React, { useState } from "react";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";
import {useNavigate} from "react-router-dom"

const Login = ({setToken}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const navigate=useNavigate()

  //Form Validation
  const handleFormValidation = () => {
    let isValid = true;
    const error = {};
    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      isValid = false;
      error.email = "Email field is required";
    } else if (!validEmail.test(formData.email)) {
      isValid = false;
      error.email = "Invalid email";
    }
    if (!formData.password) {
      isValid = false;
      error.password = "Password field is required";
    }
    setError(error);
    return isValid;
  };
  //Form Data
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //Admin Login
  const handleLogin = async (e) => {
    e.preventDefault();
    const isValid = handleFormValidation();
    if (isValid) {
      try {
        const response = await axios.post(
          backendUrl + "/api/auth/admin",
          formData
        );
        console.log(response.data)
        if(response.data.success)
        {
          setToken(response.data.token)
          navigate("/")
          toast.success("Welcome back")
        }
        else{
            toast.error(response.data.message)
        }
      } catch (error) {
       
        toast.error(error.response.data.message)
      }
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-80 md:max-w-sm mx-auto flex flex-col  shadow-md px-6 py-10 bg-white rounded-lg  gap-6"
      >
        <div>
          <h1 className="font-bold text-center pacifico-regular text-2xl md:text-4xl">
            Hot
          </h1>
          <p className="text-center mt-3 text-gray-600 text-sm">
            Welcome back to admin panel
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              placeholder="your@gmail.com"
              onChange={handleFormData}
              name="email"
              value={formData.email}
              className="w-full rounded-md px-3 py-2 border border-gray-300 outline-none"
            />
            {error.email && (
              <p className="text-xs mt-1 text-red-500">{error.email}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <div className="relative flex items-center">
              <input
                placeholder="Enter your password"
                type={passwordVisible ? "text" : "password"}
                onChange={handleFormData}
                name="password"
                value={formData.password}
                className="w-full rounded-md px-3 py-2 border border-gray-300 outline-none"
              />
              <div
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute cursor-pointer right-2 "
              >
                {passwordVisible ? <VscEye /> : <VscEyeClosed />}
              </div>
            </div>

            {error.password && (
              <p className="text-xs mt-1 text-red-500">{error.password}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-black text-sm md:text-base text-white py-2.5 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
