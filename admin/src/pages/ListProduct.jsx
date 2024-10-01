import React, { useEffect, useState } from "react";
import axios from "axios";

import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ListProduct = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch All Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/product/list`);
      setLoading(false);

      if (response.data.success) {
        setList(response.data.productsData);
      }
    } catch (error) {
      setList([]);
      setLoading(false);
      console.log(error);
    }
  };
  //Romove a Product
  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(
        `/api/product/remove/${id}`,
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <p className="mb-2">All Products</p>
      <div className="flex flex-col gap-2">
        {/* List Table */}
        <div className="hidden md:grid grid-cols-[1fr,3fr,1fr,1fr,1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {/* Products List */}
        <div className="flex flex-col gap-2 ">
          {list.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr,3fr,1fr] md:grid-cols-[1fr,3fr,1fr,1fr,1fr] items-center  gap-2 py-1 px-2 border text-sm "
            >
              <img className="w-12" src={item.images[0]} alt={`${i}`} />
              <p className="">{item.name}</p>
              <p>{item.category}</p>
              <p>
                {currecy} {item.price}
              </p>
              <p
                onClick={() => removeProduct(item._id)}
                className="text-right md:text-center text-lg cursor-pointer"
              >
                x
              </p>
            </div>
          ))}
        </div>

        {loading && (
          <div className="min-h-[80vh] bg-gray-100 animate-pulse flex justify-center items-center">
            <div className="">
              <AiOutlineLoading3Quarters className="animate-spin" />
            </div>
          </div>
        )}
        {loading === false && list.length == 0 && (
          <div className="mt-2">
            <p className="text-center">No Products Added ...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ListProduct;
