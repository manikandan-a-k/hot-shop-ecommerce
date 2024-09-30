import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 50;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState("");
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [userOrders, setUserOrders] = useState([]);
  //Add To Cart
  const addToCart = async (itemId, size) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/add`,
        { itemId, size },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        getCartData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  //User Cart Data
  const getCartData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/cart/get`, {
        headers: { token },
      });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  //User Cart Count
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }
    return totalCount;
  };
  //Update Cart
  const updateCart = async (itemId, size, quantity) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/update`,
        { itemId, size, quantity },
        { headers: { token } }
      );
      if (response.data.success) {
        getCartData();
      }
    } catch (error) {
      toast.error(error.response);
    }
  };
  //Get Cart Total Amount
  const getCartTotalAmount = async () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const productInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalAmount += productInfo.price * cartItems[items][item];
        }
      }
    }
    return totalAmount;
  };
  //Get Product From Database
  const getProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);

      if (response.data.success) {
        setProducts(response.data.productsData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Get User Orders
  const getUserOrders = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/order/userorders`, {
        headers: { token },
      });
      console.log(response.data);
      if (response.data.success) {
        let allOrdersItems = [];
        response.data.ordersData.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItems.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });
        setUserOrders(allOrdersItems.reverse());
      }
    } catch (error) {}
  };

  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, [token]);
  useEffect(() => {
    if (token) {
      getCartData();
    }
  }, [token]);
  useEffect(() => {
    if (token) {
      getUserOrders();
    }
  }, [token]);
  const value = {
    products,
    currency,
    delivery_fee,
    backendUrl,
    token,
    setToken,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateCart,
    getCartTotalAmount,
    getCartData,
    userOrders,
    setUserOrders,
    getUserOrders,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
