import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Cart = () => {
  const { products, currency, cartItems, updateCart, backendUrl, token } =
    useContext(ShopContext);
  
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  const navigate = useNavigate();

  const getCartData = () => {
    let tempData = [];
    for (let items in cartItems) {
      for (let item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
   
  };

  useEffect(() => {
    getCartData();
    if(cartItems)
    {
     setLoading(false)
    }
  }, [cartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* Check if the cart is still loading */}
      {loading ? (
        <div className="min-h-screen flex justify-center items-center">
          <div>Loading...</div>
        </div>
      ) : (
        <>
          {cartData.length > 0 ? (
            <div>
              {cartData.map((item, index) => {
                let productData = products.find(
                  (product) => product._id === item._id
                );

                return (
                  <div
                    key={index}
                    className="py-4 border-t text-gray-700 grid grid-cols-[3fr,1fr,0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-2"
                  >
                    <div className="flex items-start gap-2">
                      <div>
                        <img
                          src={productData?.images[0]}
                          alt="product image"
                          className="w-16 sm:w-20 object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-medium sm:text-lg">
                          {productData?.name}
                        </p>
                        <div className="flex items-center gap-5 mt-2">
                          <p className="text-sm sm:text-base">
                            {currency} {productData?.price}
                          </p>
                          <p className="border bg-slate-50 px-2 sm:px-3 sm:py-1 text-xs sm:text-sm">
                            {item.size}
                          </p>
                        </div>
                      </div>
                    </div>
                    <input
                      type="number"
                      min={1}
                      onChange={(e) =>
                        e.target.value === "" || e.target.value === "0"
                          ? null
                          : updateCart(item._id, item.size, Number(e.target.value))
                      }
                      defaultValue={item.quantity}
                      className="border max-w-[3rem] sm:max-w-[4rem] px-1 sm:px-2 py-1"
                    />
                    <img
                      onClick={() => updateCart(item._id, item.size, 0)}
                      src={assets.bin_icon}
                      alt="Delete icon"
                      className="w-4 sm:w-5 mr-4 cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            // Display message when cartData is empty
            <div className="text-xl text-red-500 min-h-[40vh] flex justify-center items-center">
              No Products added
            </div>
          )}

          {/* Display CartTotal and Checkout button when cartData is not empty */}
          {cartData.length > 0 && (
            <div className="flex justify-end my-20">
              <div className="w-full sm:w-[450px]">
                <CartTotal />
                <div className="w-full text-end">
                  <button
                    onClick={() => navigate("/place-order")}
                    className="bg-black text-white px-8 py-3 my-8 text-xs sm:text-sm"
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
