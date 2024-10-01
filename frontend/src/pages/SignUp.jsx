import React, { useContext, useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormError = () => {
    let isValid = true;
    const error = {};

    const validName = /^[a-zA-Z\s]+$/;
    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Name validation
    if (!formData.name) {
      error.name = "Name field is required";
      isValid = false;
    } else if (!validName.test(formData.name)) {
      error.name = "Name can only contain letters and spaces";
      isValid = false;
    } else if (formData.name.length < 2) {
      error.name = "Name must be at least 2 characters";
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      error.email = "Email field is required";
      isValid = false;
    } else if (!validEmail.test(formData.email)) {
      error.email = "Invalid email";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      error.password = "Password field is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      error.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setError(error);
    return isValid;
  };
  const {  token, setToken } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const isValid = handleFormError();
    if (isValid) {
      try {
        const response = await axios.post(
          `/api/auth/signup`,
          formData
        );
        if (response.data.success) {
          navigate("/");
          toast.success(response.data.message);
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
      
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-8 sm:mt-14 gap-3 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-6 sm:mt-10">
        <p className="text-2xl sm:text-3xl prata-regular">Sign Up</p>
        <hr className="border-none h-[1.5px] w-6 sm:w-8 bg-gray-800" />
      </div>

      <div className="w-full">
        <input
          type="text"
          value={formData.name}
          onChange={handleFormData}
          name="name"
          className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1  text-sm sm:text-base"
          placeholder="Name"
        />
        {error.name && (
          <p className="text-red-500 text-xs mt-2">{error.name}</p>
        )}
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

      <div className="relative w-full">
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
          className="text-black absolute right-2 top-2 sm:top-3 cursor-pointer"
        >
          {passwordVisible ? <VscEye /> : <VscEyeClosed />}
        </div>
        {error.password && (
          <p className="text-red-500 mt-2 text-xs">{error.password}</p>
        )}
      </div>

      <div className="w-full mt-3">
        <button
          type="submit"
          className="bg-black w-full text-white py-2 font-light"
        >
          Sign Up
        </button>
      </div>

      <div>
        <p>
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-black font-medium hover:underline cursor-pointer"
          >
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignUp;
