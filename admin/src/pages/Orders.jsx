import React from "react";
import axios from "axios";
import {  currecy } from "../App";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";
const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.get(`/api/order/allorders`, {
        headers: { token },
      });
      if (response.data.success) {
        setOrders(response.data.ordersData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `/api/order/status`,
        {
          orderId,
          status: event.target.value,
        },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAllOrders()
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);
  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.reverse().map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr,2fr,1fr] lg:grid-cols-[0.5fr,2fr,1fr,1fr,1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
          >
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order?.items?.map((item, index) => {
                  if (index === order?.items?.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {item?.name} x <span>{item?.quantity}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {item?.name} x <span>{item?.quantity}</span>,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="font-medium mt-3 mb-2">{`${order?.address?.firstName} ${order?.address?.lastName} `}</p>
              <div>
                <p className="">{`${order?.address?.street} ,`}</p>
                <p className="">{`${order?.address?.city} , ${order?.address?.state} , ${order?.address?.country} , ${order?.address?.zipcode}`}</p>
              </div>
              <p>{`${order?.address?.phone}`}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">
                Items : {order?.items?.length}
              </p>
              <p className="mt-3">Method : {order?.paymentMethod}</p>
              <p>Payment : {order?.payment ? "Done" : "Pending"}</p>
              <p>Date : {new Date(order?.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px] font-medium">
              {currecy} {order?.amount}
            </p>
            <select
              value={order?.status}
              onChange={(event) => statusHandler(event, order?._id)}
              className="p-2 font-semibold"
            >
              <option value="OrderPlaced">OrderPlaced</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out For delivery">Out For delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
