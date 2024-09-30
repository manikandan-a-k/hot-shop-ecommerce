import React from "react";

const NewsletterBox = () => {



    const handleSubscribe=(e)=>{
     e.preventDefault()
    }
  return (
    <div className="text-center my-10">
      <div>
        <p className="text-gray-800 text-xl md:text-2xl font-medium">
          Subscibe now & get 20% off
        </p>
        <p className="text-gray-400 mt-3 text-xs md:text-sm">
          "Subscribe now and enjoy 20% off your next purchase – exclusive offers
          await!"
        </p>
      </div>
      <form onSubmit={handleSubscribe} className="w-full  sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
        <input
        type="email"
          placeholder="Enter your email"
          className="w-full sm:flex-1 outline-none "
          required
        />
        <button type="submit" className="bg-black text-white  px-10 text-xs py-3 md:py-4">
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
