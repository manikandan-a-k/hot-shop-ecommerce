import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import Title from "../components/Title";
import axios from "axios";

const Product = () => {
  const { productId } = useParams();
  const { currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [error, setError] = useState(false);

  // Fetch Product Details
  const fetchProductData = async () => {
    try {
      const response = await axios.get(
        `/api/product/single/${productId}`
      );
      if (response.data.success) {
        setProductData(response.data.productData); // Change to set object instead of array
        setImage(response.data.productData.images[0]); // Set the default image
      }
    } catch (error) {
      
      setProductData("");
    }
  };

  const handleSize = (item) => {
    setSize(item);
    setError(false);
  };

  const handleADDToCart = () => {
    if (size.length !== 0) {
      addToCart(productData._id, size);
      setError(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity duration-500 opacity-100 ease-in px-4 sm:px-8 lg:px-16">
      {/* Product Data */}
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
        {/* Product Image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex flex-row scrollbar sm:flex-col overflow-x-auto sm:overflow-y-scroll gap-2">
            {productData.images.map((item, i) => (
              <img
                src={item}
                key={i}
                onClick={() => setImage(item)}
                alt=""
                className="w-[24%] sm:w-full flex-shrink-0 cursor-pointer rounded-lg hover:opacity-80 transition-opacity duration-200"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%] flex-shrink-0">
            <img
              src={image || productData.images[0]} // Display selected image or default image
              alt=""
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
        {/* Product Details */}
        <div className="flex-1">
          <h2 className="font-medium text-2xl mt-2">{productData.name}</h2>
          <p className="text-3xl mt-5 font-medium">
            {currency} {productData.price}
          </p>
          <p className="mt-5 text-gray-500 sm:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2 items-center">
              {productData.sizes.map((item, i) => {
                return (
                  <button
                    onClick={() => handleSize(item)}
                    key={i}
                    className={`border py-2 ${
                      item === size ? "border-orange-500" : ""
                    } px-4 text-center bg-gray-100`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            {error && (
              <p className="text-red-500 text-xs">Select product size</p>
            )}
          </div>
          <button
            onClick={handleADDToCart}
            className="bg-black py-3 px-8 text-xs sm:text-sm text-white active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
        </div>
      </div>
      <div>
        <div className="text-center text-2xl md:text-3xl my-10">
          <Title text1={"RELATED"} text2={"PRODUCTS"} />
        </div>

        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  ) : (
    <div className="text-center py-20">Loading...</div>
  );
};

export default Product;
