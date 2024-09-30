import React from "react";
import {assets} from "../assets/frontend_assets/assets"
const Hero = () => {
  return (
    <div className="border border-gray-400 flex flex-col sm:flex-row">
      {/* Left Side */}
      <div className="flex justify-center items-center  w-full sm:w-1/2 py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="h-[2px] w-8 md:w-11 bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>
          <h2 className="text-4xl prata-regular sm:py-3 font-medium lg:text-6xl leading-relaxed">Latest Arrivals</h2>
          <div className="flex items-center gap-2">
           <p className="font-medium text-sm md:text-base">SHOP NOW</p>
           <p className=" w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full sm:w-1/2 ">
      <img src={assets.hero_img} className="w-full" alt="Hero Image" />
      </div>
    </div>
  );
};

export default Hero;
