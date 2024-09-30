import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/admin_assets/assets";
import { VscDashboard } from "react-icons/vsc";
import { AiOutlineHome } from "react-icons/ai";
const SideBar = () => {
  return (
    <div className="border-r-2 min-h-screen  w-[18%]">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          to={"/"}
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded"
        >
         <div>
            <AiOutlineHome size={29} />
         </div>
          <p className="hidden text-sm  md:block">Dashboard</p>
        </NavLink>
        <NavLink
          to={"/add"}
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded"
        >
          <img src={assets.add_icon} alt="Add Icon Image" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>
        <NavLink
          to={"/list"}
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded"
        >
          <img src={assets.order_icon} alt="Add Icon Image" />
          <p className="hidden md:block">List Items</p>
        </NavLink>
        <NavLink
          to={"/orders"}
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded"
        >
          <img src={assets.order_icon} alt="Add Icon Image" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
