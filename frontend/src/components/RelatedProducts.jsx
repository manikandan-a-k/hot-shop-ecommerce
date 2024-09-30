import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItems from "./ProductItems";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const fetchRelatedProducts = () => {
    const filteredProducts = products.filter(
      (item) =>
        item.category.includes(category) &&
        item.subCategory.includes(subCategory)
    );
    setRelatedProducts(filteredProducts); // Use filteredProducts instead of spreading into a new array
  };

  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    fetchRelatedProducts();
  }, [category, subCategory, products]); // Ensure products is in the dependency array

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
      {relatedProducts.map((item, i) => (
        <div key={i} onClick={handleScroll}>
          <ProductItems
            id={item._id}
            name={item.name}
            price={item.price}
            images={item.images}
          />
        </div>
      ))}
    </div>
  );
};

export default RelatedProducts;
