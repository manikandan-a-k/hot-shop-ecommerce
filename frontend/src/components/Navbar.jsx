import { ArrowLeft, Search, User } from "lucide-react";
import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { TbMenuDeep } from "react-icons/tb";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { token, setToken } = useContext(ShopContext);
  const { showSearch, setShowSearch, getCartCount } = useContext(ShopContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
    setToken("");
    localStorage.removeItem("token"); // Clear token from localStorage on logout
    setVisible(false);
  };

  return (
    <div className="flex items-center bg-white py-4 justify-between">
      {/* Logo */}
      <Link to={"/"}>
        <h1 className=" text-4xl  pacifico-regular">Hot</h1>
      </Link>

      {/* Desktop Navbar items */}
      <ul className="hidden sm:flex font-[500] items-center text-[15px] text-gray-700 gap-4">
        <NavLink
          to={"/"}
          className="flex hover:text-black flex-col items-center gap-1"
        >
          <p>HOME</p>
          <hr className="w-2/4 hidden bg-gray-700 border-none h-[2px]" />
        </NavLink>
        <NavLink
          to={"/collection"}
          className="flex flex-col hover:text-black items-center gap-1"
        >
          <p>COLLECTION</p>
          <hr className="w-2/4 hidden bg-gray-700 border-none h-[2px]" />
        </NavLink>
        <NavLink
          to={"/about"}
          className="flex hover:text-black flex-col items-center gap-1"
        >
          <p>ABOUT</p>
          <hr className="w-2/4 hidden bg-gray-700 border-none h-[2px]" />
        </NavLink>
        <NavLink
          to={"/contact"}
          className="flex hover:text-black flex-col items-center gap-1"
        >
          <p>CONTACT</p>
          <hr className="w-2/4 hidden bg-gray-700 border-none h-[2px]" />
        </NavLink>
      </ul>

      {/* Right side Icons */}
      <div className="flex items-center gap-4 sm:gap-6 text-gray-700">
        <Link
          to={"/collection"}
          onClick={() => setShowSearch(true)}
          className="cursor-pointer hover:text-black"
        >
          <Search strokeWidth={1.5} size={23} />
        </Link>
        {token && (
          <div className="group relative">
            <div className="hover:text-black">
              <User strokeWidth={1.5} size={23} className="cursor-pointer" />
            </div>
            <div className="hidden group-hover:block pt-4 absolute right-0">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 shadow-lg">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
              </div>
            </div>
          </div>
        )}
        {token && (
          <Link
            to={"/cart"}
            className="relative cursor-pointer hover:text-black"
          >
            <HiOutlineShoppingBag size={23} strokeWidth={1.5} />
            <p className="absolute bg-black text-white rounded-3xl text-center w-4 leading-4 right-[-5px] bottom-[-5px] text-[8px] sm:text-[10px]">
              {getCartCount()}
            </p>
          </Link>
        )}

        {!token ? (
          <Link to={"/login"} className="hidden sm:block">
            <button className="bg-black text-white py-2 px-7 font-medium rounded-sm">
              Login
            </button>
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-black text-white hidden sm:block py-2 px-7 font-medium rounded-sm"
          >
            Logout
          </button>
        )}

        <div
          onClick={() => setVisible(true)}
          className="cursor-pointer sm:hidden"
        >
          <TbMenuDeep size={23} strokeWidth={1.5} />
        </div>
      </div>

      {/* Side bar for small Screens */}
      <div
        className={`fixed z-50 bg-white top-0 left-0 h-full shadow-xl text-gray-600 transition-all duration-300 transform ${
          visible ? "translate-x-0 w-3/4" : "-translate-x-full w-0"
        } overflow-hidden`}
      >
        <div className="p-4 flex flex-col gap-4 h-full">
          <div
            onClick={() => setVisible(false)}
            className="flex gap-2 items-center cursor-pointer"
          >
            <ArrowLeft size={20} strokeWidth={1.5} />
            <p>Back</p>
          </div>
          <div className="text-sm flex flex-col font-[500] text-gray-600 gap-4">
            <NavLink
              onClick={() => setVisible(false)}
              className="border-b cursor-pointer py-2 pl-2"
              to={"/"}
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="border-b cursor-pointer py-2 pl-2"
              to={"/collection"}
            >
              COLLECTION
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="border-b cursor-pointer py-2 pl-2"
              to={"/about"}
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="border-b cursor-pointer py-2 pl-2"
              to={"/contact"}
            >
              CONTACT
            </NavLink>
          </div>

          {!token ? (
            <Link to={"/login"} onClick={() => setVisible(false)}>
              <button className="bg-black w-full rounded-md text-white py-2 px-7">
                Login
              </button>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-black  w-full rounded-md text-white py-2 px-7"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
