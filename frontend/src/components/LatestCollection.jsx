import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItems from "./ProductItems";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
 
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);
  return (
    <div className="my-10">
      <div className="text-center text-2xl md:text-3xl py-8">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          " Discover the latest collection at HOT Shop, featuring timeless
          styles crafted for every occasion."
        </p>
      </div>
      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, i) => (
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

export default LatestCollection;
