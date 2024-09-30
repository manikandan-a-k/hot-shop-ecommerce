import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const AddProduct = ({ token }) => {
  const [productDetails, setProductDetails] = useState({
    productName: "",
    productDescription: "",
    productCategory: "Men",
    subCategory: "Topwear",
    productPrice: 0,
    productSizes: [],
    isBestseller: false,
    images: ["", "", "", ""],
  });
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productSizes: "",
    images: "",
  });

  const handleFormValidation = () => {
    let isValid = true;
    const error = {};

    if (!productDetails.productName) {
      error.productName = "Product Name field is required";
      isValid = false;
    }

    if (!productDetails.productDescription) {
      error.productDescription = "Product description field is required";
      isValid = false;
    }

    if (productDetails.productPrice <= 0) {
      error.productPrice = "Product Price must be greater than 0";
      isValid = false;
    }

    if (productDetails.productSizes.length < 1) {
      error.productSizes = "Please select at least one size of the product";
      isValid = false;
    }
    const hasValidImage = productDetails.images.some((image) => image !== "");
    if (!hasValidImage) {
      error.images = "Please upload at least one image of the product";
      isValid = false;
    }

    setError(error);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({
      ...prev,
      [name]: name === "productPrice" ? parseFloat(value) : value,
    }));
  };

  const handleImageChange = (e, index) => {
    const updatedImages = [...productDetails.images];
    updatedImages[index] = e.target.files[0];
    setProductDetails((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  const handleSizeSelection = (size) => {
    const { productSizes } = productDetails;
    setProductDetails((prev) => ({
      ...prev,
      productSizes: productSizes.includes(size)
        ? productSizes.filter((s) => s !== size)
        : [...productSizes, size],
    }));
  };

  const handleCheckboxChange = (e) => {
    setProductDetails((prev) => ({ ...prev, isBestseller: e.target.checked }));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const isValid = handleFormValidation();
    if (isValid) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("name", productDetails.productName);
        formData.append("description", productDetails.productDescription);
        formData.append("price", productDetails.productPrice);
        formData.append("category", productDetails.productCategory);
        formData.append("subCategory", productDetails.subCategory);
        formData.append("bestseller", productDetails.isBestseller);
        formData.append("sizes", JSON.stringify(productDetails.productSizes));

        productDetails.images.forEach((image, index) => {
          if (image) {
            formData.append(`images`, image);
          }
        });

        const response = await axios.post(
          `${backendUrl}/api/product/add`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              token,
            },
          }
        );
        if (response.data.success) {
          setLoading(false);
          toast.success(response.data.message);
          setProductDetails({
            productName: "",
            productDescription: "",
            productCategory: "Men",
            subCategory: "Topwear",
            productPrice: 0,
            productSizes: [],
            isBestseller: false,
            images: ["", "", "", ""],
          });
        }
      } catch (error) {
        toast.error(error.response.data.message);
        setLoading(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleProductSubmit}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p>Upload Image</p>
        <div className="mt-2 flex gap-2 items-center">
          {productDetails.images.map((image, index) => (
            <label
              key={index}
              htmlFor={`image${index}`}
              className="cursor-pointer"
            >
              <img
                className="w-20 rounded-md"
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Upload Image"
              />
              <input
                onChange={(e) => handleImageChange(e, index)}
                type="file"
                id={`image${index}`}
                className="hidden"
              />
            </label>
          ))}
        </div>
        {error.images && (
          <p className="text-red-500 text-xs mt-1">{error.images}</p>
        )}
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          type="text"
          name="productName"
          value={productDetails.productName}
          onChange={handleInputChange}
          placeholder="Type here"
          className="px-3 py-2 w-full max-w-[500px]"
        />
        {error.productName && (
          <p className="text-red-500 text-xs mt-1">{error.productName}</p>
        )}
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          name="productDescription"
          value={productDetails.productDescription}
          onChange={handleInputChange}
          placeholder="Write content here"
          className="px-3 py-2 w-full max-w-[500px]"
        />
        {error.productDescription && (
          <p className="text-red-500 text-xs mt-1">
            {error.productDescription}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            name="productCategory"
            value={productDetails.productCategory}
            onChange={handleInputChange}
            className="px-3 cursor-pointer py-2 w-full"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          <select
            name="subCategory"
            value={productDetails.subCategory}
            onChange={handleInputChange}
            className="px-3 cursor-pointer py-2 w-full"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            name="productPrice"
            value={productDetails.productPrice}
            onChange={handleInputChange}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="0"
          />
          {error.productPrice && (
            <p className="text-red-500 text-xs mt-1">{error.productPrice}</p>
          )}
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-2 items-center">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() => handleSizeSelection(size)}
              className={`px-3 py-1 cursor-pointer ${
                productDetails.productSizes.includes(size)
                  ? "bg-pink-200"
                  : "bg-slate-200"
              }`}
            >
              <p>{size}</p>
            </div>
          ))}
        </div>
        {error.productSizes && (
          <p className="text-red-500 text-xs mt-1">{error.productSizes}</p>
        )}
      </div>

      <div className="flex items-center gap-2 cursor-pointer mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={productDetails.isBestseller}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to bestseller
        </label>
      </div>

      <button disabled={loading===true} type="submit" className="py-2 px-8 bg-black text-white">
        {loading ? (
          <>
            {" "}
            <AiOutlineLoading3Quarters className="animate-spin" />
          </>
        ) : (
          "ADD"
        )}
      </button>
    </form>
  );
};

export default AddProduct;
