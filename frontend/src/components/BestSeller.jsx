import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItems from "./ProductItems";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const bestSeller = products.filter((item) => item.bestseller);
      setBestSellers(bestSeller.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-2xl md:text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          " Elevate your style with our best sellers, combining chic design and
          unbeatable comfort."
        </p>
      </div>
      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSellers.map((item, i) => (
          <ProductItems
            key={i}
            id={item._id}
            name={item.name}
            images={item.images}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
