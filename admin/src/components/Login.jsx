import React, { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();

  // Form validation logic
  const handleFormValidation = () => {
    let isValid = true;
    const errors = {};
    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.email) {
      isValid = false;
      errors.email = "Email field is required";
    } else if (!validEmail.test(formData.email)) {
      isValid = false;
      errors.email = "Invalid email";
    }

    if (!formData.password) {
      isValid = false;
      errors.password = "Password field is required";
    }

    setError(errors);
    return isValid;
  };

  // Form input handler
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Admin login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    const isValid = handleFormValidation();

    if (isValid) {
      try {
        const { data } = await axios.post("/api/auth/admin", formData);

        if (data.success) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
          navigate("/");
          toast.success("Welcome back");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-80 md:max-w-sm mx-auto flex flex-col shadow-md px-6 py-10 bg-white rounded-lg gap-6"
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
                className="absolute cursor-pointer right-2"
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
