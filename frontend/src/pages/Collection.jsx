import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItems from "../components/ProductItems";
import SearchBar from "../components/SearchBar";

const Collection = () => {
  const { products, search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  //  filter logic
  const applyFilterAndSort = () => {
    let productsCopy = products.slice();
    //Appy filters for searchbar
    if (showSearch && search.length > 0) {
      productsCopy=productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }

    // Apply filters for category
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    //Apply filters for subcategory
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // Apply sorting for selection
    if (sortType === "low-high") {
      productsCopy.sort((a, b) => a.price - b.price); // Sort ascending by price
    } else if (sortType === "high-low") {
      productsCopy.sort((a, b) => b.price - a.price); // Sort descending by price
    }

    setAllProducts(productsCopy);
  };

  useEffect(() => {
    applyFilterAndSort();
  }, [category, subCategory, sortType, products,search]);

  return (
    <div className="border-t pt-4">
      {showSearch ? <SearchBar /> : ""}

      <div className="flex flex-col my-5 sm:flex-row gap-3 sm:gap-10 ">
        {/* Filter Options */}
        <div className="min-w-60">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="text-xl my-2 flex items-center gap-2 cursor-pointer"
          >
            FILTERS
            <img
              src={assets.dropdown_icon}
              className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
              alt="dropdown-img"
            />
          </p>
          {/* Category Filters */}
          <div
            className={`border border-gray-300 py-3 mt-6 pl-5 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={"Men"}
                  onChange={toggleCategory}
                  className="w-3 cursor-pointer"
                />
                Men
              </p>
              <p className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={"Women"}
                  onChange={toggleCategory}
                  className="w-3 cursor-pointer"
                />
                Women
              </p>
              <p className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={"Kids"}
                  className="w-3 cursor-pointer"
                  onChange={toggleCategory}
                />
                Kids
              </p>
            </div>
          </div>
          {/* Sub Category Filters */}
          <div
            className={`border border-gray-300 py-3 mt-6 pl-5 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium">TYPE</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex items-center gap-2 cursor-pointer">
                <input
                  onChange={toggleSubCategory}
                  type="checkbox"
                  value={"Topwear"}
                  className="w-3 cursor-pointer"
                />
                Topwear
              </p>
              <p className="flex items-center gap-2 cursor-pointer">
                <input
                  onChange={toggleSubCategory}
                  type="checkbox"
                  value={"Bottomwear"}
                  className="w-3 cursor-pointer"
                />
                Bottomwear
              </p>
              <p className="flex items-center gap-2 cursor-pointer">
                <input
                  onChange={toggleSubCategory}
                  type="checkbox"
                  value={"Winterwear"}
                  className="w-3 cursor-pointer"
                />
                Winterwear
              </p>
            </div>
          </div>
        </div>
        {/* Products */}
        <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-4">
            <Title text1={"ALL"} text2={"PRODUCTS"} />
            {/* Product Sort */}
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="text-sm cursor-pointer px-2 border border-gray-300"
            >
              <option value="relevent">Sort by: Relevent</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>
          {/* Map Products */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {allProducts.map((item, i) => (
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
      </div>
    </div>
  );
};

export default Collection;
