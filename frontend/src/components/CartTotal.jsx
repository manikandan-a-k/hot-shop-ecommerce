import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { useNavigate } from "react-router-dom";

const CartTotal = () => {
  const { products, currency, delivery_fee, getCartTotalAmount } = useContext(ShopContext);
  const navigate=useNavigate()

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCartTotalAmount = async () => {
      const amount = await getCartTotalAmount();
      setTotalAmount(amount);
    };

    fetchCartTotalAmount();
  }, [getCartTotalAmount]);

  return (
    <div className="w-full">
      <div className=" text-xl sm:text-2xl">
        <Title text1={"CART"} text2={"TOTAL"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency} {totalAmount}.00</p> {/* Displaying the resolved total amount */}
        </div>
        <hr/>
        <div className="flex justify-between">
         <p>Shipping Fee</p>
         <p>{currency} {delivery_fee}.00</p>
        </div>
        <hr/>
        <div className="flex justify-between font-bold">
         <p>Total</p>
         <p>{currency} {totalAmount===0?totalAmount:totalAmount+delivery_fee}.00</p>
        </div>

      </div>
    </div>
  );
};

export default CartTotal;
