import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Verify = () => {
  const {
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartTotalAmount,
    products,
    delivery_fee,
    getCartData,
    getUserOrders,
  } = useContext(ShopContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { success, orderId },
        { headers: { token } }
      );
      if (response.data.success) {
        navigate("/orders");
        getCartData();
        toast.success(response.data.message);
      } else {
        navigate("/cart");
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    verifyPayment();
  }, [token, success, orderId]);
  return <div>
    payment verification
  </div>;
};

export default Verify;
