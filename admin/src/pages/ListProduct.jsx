import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ListProduct = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch All Products
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/product/list`);
      setLoading(false);

      if (data.success) {
        setList(data.productsData);
      } else {
        setList([]);
        toast.error("Failed to fetch products");
      }
    } catch (error) {
      setList([]);
      setLoading(false);
      toast.error("An error occurred while fetching products");
    }
  }, []);

  // Remove a Product
  const removeProduct = async (id) => {
    try {
      const { data } = await axios.delete(`/api/product/remove/${id}`, {
        headers: { token },
      });

      if (data.success) {
        toast.success(data.message);
        fetchProducts(); // Refresh product list after removal
      } else {
        toast.error("Failed to remove product");
      }
    } catch (error) {
      toast.error("An error occurred while removing the product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <p className="mb-2">All Products</p>
      <div className="flex flex-col gap-2">
        {/* List Table Header */}
        <div className="hidden md:grid grid-cols-[1fr,3fr,1fr,1fr,1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Products List */}
        <div className="flex flex-col gap-2 ">
          {!loading &&
            list.length > 0 &&
            list.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr,3fr,1fr] md:grid-cols-[1fr,3fr,1fr,1fr,1fr] items-center gap-2 py-1 px-2 border text-sm"
              >
                <img className="w-12" src={item.images[0]} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>₹ {item.price}</p>
                <p
                  onClick={() => removeProduct(item._id)}
                  className="text-right md:text-center text-lg cursor-pointer"
                >
                  <RxCross2 />
                </p>
              </div>
            ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="min-h-[80vh] bg-gray-100 animate-pulse flex justify-center items-center">
            <AiOutlineLoading3Quarters className="animate-spin text-3xl" />
          </div>
        )}

        {/* No Products State */}
        {!loading && list.length === 0 && (
          <div className="mt-2">
            <p className="text-center">No Products Added ...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ListProduct;
