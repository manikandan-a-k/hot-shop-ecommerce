import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const OurPolicy = () => {
  return (
    <div className='text-gray-700 my-10 flex flex-col sm:flex-row items-center gap-12 sm:gap-2 justify-around text-xs text-center sm:text-sm md:text-base '>
     <div className=''>
  <img src={assets.exchange_icon} alt="Exchange Icon" className='w-12   m-auto mb-5 ' />
  <p className='font-bold'>Easy Exchange Policy</p>
  <p  className='text-gray-400'>We offer hassle free exchange policy</p>
     </div>
     <div className=''>
  <img src={assets.quality_icon} alt="Exchange Icon" className='w-12 m-auto  mb-5 ' />
  <p className='font-bold'>7 days return Policy</p>
  <p className='text-gray-400'>We provide 7 days return policy</p>
     </div>
     <div className=''>
  <img src={assets.support_img} alt="Exchange Icon" className='w-12 m-auto  mb-5 ' />
  <p  className='font-bold'>Best customer support</p>
  <p className='text-gray-400'>we provide 24/7 customer support</p>
     </div>
    </div>
  )
}

export default OurPolicy