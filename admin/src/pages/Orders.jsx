import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const { data } = await axios.get(`/api/order/allorders`, {
        headers: { token },
      });

      if (data.success) {
        setOrders(data.ordersData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error fetching orders: " + error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const { data } = await axios.post(
        `/api/order/status`,
        {
          orderId,
          status: event.target.value,
        },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchAllOrders(); // Refresh orders after updating status
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error updating order status: " + error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.reverse().map((order) => {
          const { items, address, paymentMethod, payment, date, amount, status } = order;
          return (
            <div
              key={order._id}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr,2fr,1fr] lg:grid-cols-[0.5fr,2fr,1fr,1fr,1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            >
              <img className="w-12" src={assets.parcel_icon} alt="Parcel Icon" />
              <div>
                <div>
                  {items.map((item, index) => (
                    <p className="py-0.5" key={item._id}>
                      {item.name} x <span>{item.quantity}</span>
                      {index < items.length - 1 && ","}
                    </p>
                  ))}
                </div>
                <p className="font-medium mt-3 mb-2">{`${address.firstName} ${address.lastName}`}</p>
                <p>{`${address.street}, ${address.city}, ${address.state}, ${address.country}, ${address.zipcode}`}</p>
                <p>{address.phone}</p>
              </div>
              <div>
                <p className="text-sm sm:text-[15px]">Items: {items.length}</p>
                <p className="mt-3">Method: {paymentMethod}</p>
                <p>Payment: {payment ? "Done" : "Pending"}</p>
                <p>Date: {new Date(date).toLocaleDateString()}</p>
              </div>
              <p className="text-sm sm:text-[15px] font-medium">₹ {amount}</p>
              <select
                value={status}
                onChange={(event) => statusHandler(event, order._id)}
                className="p-2 font-semibold"
              >
                {["OrderPlaced", "Packing", "Shipped", "Out For delivery", "Delivered"].map((statusOption) => (
                  <option key={statusOption} value={statusOption}>
                    {statusOption}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
