import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [payment, setPayment] = useState("cod");
  const navigate = useNavigate();
  const {
    token,
    cartItems,
    setCartItems,
    getCartTotalAmount,
    products,
    delivery_fee,
    getCartData,
    getUserOrders,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const handleFormValidation = () => {
    const error = {};
    let isValid = true;

    const validName = /^[a-zA-Z\s]+$/;
    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validZipCode = /^\d{6}$/;
    const validPhone = /^\d{10}$/;

    if (!formData.firstName) {
      error.firstName = "First name field is required";
      isValid = false;
    } else if (!validName.test(formData.firstName)) {
      error.firstName = "Invalid first name";
      isValid = false;
    }

    if (!formData.lastName) {
      error.lastName = "Last name field is required";
      isValid = false;
    } else if (!validName.test(formData.lastName)) {
      error.lastName = "Invalid last name";
      isValid = false;
    }

    if (!formData.email) {
      error.email = "Email field is required";
      isValid = false;
    } else if (!validEmail.test(formData.email)) {
      error.email = "Invalid email";
      isValid = false;
    }

    if (!formData.street) {
      error.street = "Street address is required";
      isValid = false;
    }

    if (!formData.city) {
      error.city = "City is required";
      isValid = false;
    }

    if (!formData.state) {
      error.state = "State is required";
      isValid = false;
    }

    if (!formData.zipcode) {
      error.zipcode = "Zipcode is required";
      isValid = false;
    } else if (!validZipCode.test(formData.zipcode)) {
      error.zipcode = "Invalid zipcode";
      isValid = false;
    }

    if (!formData.country) {
      error.country = "Country is required";
      isValid = false;
    }

    if (!formData.phone) {
      error.phone = "Phone number is required";
      isValid = false;
    } else if (!validPhone.test(formData.phone)) {
      error.phone = "Invalid phone number";
      isValid = false;
    }

    setError(error);
    return isValid;
  };
  //Place Order
  const handlePlaceOrder = async () => {
    const isValid = handleFormValidation();
    if (isValid) {
      try {
        let orderItems = [];
        for (const items in cartItems) {
          for (const item in cartItems[items]) {
            if (cartItems[items][item] > 0) {
              let itemInfo = structuredClone(
                products.find((product) => product._id === items)
              );
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
        let orderData = {
          address: formData,
          items: orderItems,
          amount: (await getCartTotalAmount()) + delivery_fee,
        };

        switch (payment) {
          //API Calls For  COD
          case "cod":
            const response = await axios.post(
              `/api/order/${payment}`,
              orderData,
              { headers: { token } }
            );
            if (response.data.success) {
              navigate("/orders");
              toast.success(response.data.message);
              getCartData();
              getUserOrders();
            } else {
              toast.error(response.data.message);
            }
            break;
          //API Call For Stripe
          case "stripe":
            const responseStripe = await axios.post(
              `${backendUrl}/api/order/stripe`,
              orderData,
              {
                headers: {
                  token,
                  origin: window.location.origin
                },
              }
            );
            if (responseStripe.data.success) {
              const { session_url } = responseStripe.data;
              window.location.replace(session_url);
            } else {
              toast.error(responseStripe.data.message);
            }
            break;
          default:
            break;
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  return (
    <div className="flex flex-col sm:flex-row justify-between min-h-[80vh] gap-4 pt-5 sm:pt-14">
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <div>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleFormData}
              placeholder="First name"
              className="border outline-none focus:ring-1 rounded border-gray-300 px-3.5 w-full py-1.5"
            />
            {error.firstName && (
              <p className="text-xs text-red-500 mt-1">{error.firstName}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleFormData}
              placeholder="Last name"
              className="border border-gray-300 px-3.5 rounded focus:ring-1 outline-none w-full py-1.5"
            />
            {error.lastName && (
              <p className="text-xs text-red-500 mt-1">{error.lastName}</p>
            )}
          </div>
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleFormData}
            placeholder="email"
            className="border border-gray-300 px-3.5 rounded focus:ring-1 outline-none w-full py-1.5"
          />
          {error.email && (
            <p className="text-xs text-red-500 mt-1">{error.email}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleFormData}
            placeholder="Street"
            className="border border-gray-300 px-3.5 rounded focus:ring-1 outline-none w-full py-1.5"
          />
          {error.street && (
            <p className="text-xs text-red-500 mt-1">{error.street}</p>
          )}
        </div>

        <div className="flex gap-3">
          <div>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleFormData}
              placeholder="City"
              className="border outline-none focus:ring-1 rounded border-gray-300 px-3.5 w-full py-1.5"
            />
            {error.city && (
              <p className="text-xs text-red-500 mt-1">{error.city}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleFormData}
              placeholder="State"
              className="border border-gray-300 px-3.5 rounded focus:ring-1 outline-none w-full py-1.5"
            />
            {error.state && (
              <p className="text-xs text-red-500 mt-1">{error.state}</p>
            )}
          </div>
        </div>
        <div className="flex gap-3">
          <div>
            <input
              type="number"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleFormData}
              placeholder="Zipcode"
              className="border outline-none focus:ring-1 rounded border-gray-300 px-3.5 w-full py-1.5"
            />
            {error.zipcode && (
              <p className="text-xs text-red-500 mt-1">{error.zipcode}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleFormData}
              placeholder="Country"
              className="border border-gray-300 px-3.5 rounded focus:ring-1 outline-none w-full py-1.5"
            />
            {error.country && (
              <p className="text-xs text-red-500 mt-1">{error.country}</p>
            )}
          </div>
        </div>
        <div>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleFormData}
            placeholder="Phone"
            className="border border-gray-300 px-3.5 rounded focus:ring-1 outline-none w-full py-1.5"
          />
          {error.phone && (
            <p className="text-xs text-red-500 mt-1">{error.phone}</p>
          )}
        </div>
      </div>
      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className=" mt-8">
          <div className="text-xl ">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
          </div>
          {/* Payment Method */}
          <div className="flex gap-3 flex-col sm:flex-row">
            
            
            <div
              onClick={() => setPayment("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full border-gray-600 ${
                  payment === "cod" ? "bg-green-500" : ""
                }`}
              ></p>
              <p className="mx-4 text-sm font-medium text-gray-500">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
        </div>
        <div className="text-end w-full mt-6">
          <button
            onClick={handlePlaceOrder}
            className="bg-black text-white text-sm px-16 py-3"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
