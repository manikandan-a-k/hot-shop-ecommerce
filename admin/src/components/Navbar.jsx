import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({setToken}) => {
  return (
    <div className='flex justify-between px-[4%] py-2 items-center'>
        <Link to={"/"}>
        <h1 className=" text-4xl  pacifico-regular">Hot</h1>
      </Link>
      <button onClick={()=>setToken("")} className='bg-gray-600 text-white px-5 py-2 sm:px-7 text-xs rounded-full sm:text-base'>Logout</button>
    </div>
  )
}

export default Navbar