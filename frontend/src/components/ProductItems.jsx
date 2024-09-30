import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItems = ({ id, name, images, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          src={ images[0]}
          alt="Latest Collection Image"
          className="hover:scale-110  transition ease-in-out"
        />
      </div>
      <p className="pt-3 pb-1 text-sm h-14">{name}</p>
      <p className="text-sm font-medium">
        {currency} {price}
      </p>
    </Link>
  );
};

export default ProductItems;
