import React, { useContext } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext';

const SearchBar = () => {
    const { search,setSearch,showSearch,setShowSearch } = useContext(ShopContext);
  return (
    <div className='bg-gray-50 border-t border-b flex gap-4 justify-center items-center text-center my-5'>
     <div className='border  border-gray-500 shadow-md px-5 py-2 flex justify-between items-center rounded-full w-3/4 sm:w-1/2 my-3 sm:my-5'>
      <input type='text' value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='Search' className=' outline-none text-sm bg-inherit w-full'/>
      <img src={assets.search_icon} alt="" className='w-4' />
     </div>
     <img onClick={()=>setShowSearch(false)} src={assets.cross_icon} alt="" className='w-3 hover:scale-110  cursor-pointer'/>
    </div>
  )
}

export default SearchBar