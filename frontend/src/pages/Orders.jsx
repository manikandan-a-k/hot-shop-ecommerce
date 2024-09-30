import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const Orders = () => {
  const { currency, userOrders, getUserOrders } = useContext(ShopContext);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    if (userOrders) {
      setLoading(false); 
    }
  }, [userOrders]);

  return (
    <div className="border-t pt-16">
      <div className="text-xl sm:text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {loading ? (
          <div className="min-h-screen bg-gray-50 flex justify-center items-center">
            <div>
              <AiOutlineLoading3Quarters className="animate-spin"/>
            </div>
          </div>
        ) : userOrders && userOrders.length > 0 ? (
          userOrders.map((order, i) => (
            <div
              key={i}
              className="py-4 gap-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-start gap-6 text-sm">
                
                {Array.isArray(order.images) && order.images[0] ? (
                  <img
                    src={order.images[0]}
                    alt={order.name}
                    className="w-16 sm:w-20"
                  />
                ) : (
                  <div>No image available</div>
                )}
                <div>
                  <p className="sm:text-base font-medium">{order?.name}</p>
                  <div className="flex items-center mt-2 gap-3 text-base text-gray-500">
                    <p className="text-lg">
                      {currency} {order?.price}
                    </p>
                    <p>Quantity: {order?.quantity}</p>
                    <p>Size: {order?.size}</p>
                  </div>
                  <p className="mt-2">
                    Date:{" "}
                    <span className="text-gray-400">
                      {new Date(order?.date).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="mt-2">
                    Payment Method:{" "}
                    <span className="text-gray-400">{order?.paymentMethod}</span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-3xl bg-green-500"></p>
                  <p>{order?.status}</p>
                </div>
                <button
                  onClick={getUserOrders}
                  className="border px-4 py-2 text-sm font-medium rounded-sm"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className=" flex justify-center items-center">
            <div>No orders placed</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
