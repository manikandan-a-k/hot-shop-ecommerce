import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='border-t text-center text-xl pt-8 sm:text-2xl '>
      <Title text1={"CONTACT"} text2={"US"}/>
      </div>
      <div className='my-10 mb-28 flex flex-col justify-center items-center sm:flex-row gap-10'>
       <img src={assets.contact_img} alt="Contact image" className='w-full sm:max-w-[450px]' />
       <div className='flex flex-col justify-center items-start gap-6'>
        <p className='text-gray-600 text-xl font-semibold'>Our Store</p>
        <p className='text-gray-500'>54/76  Wxxxam xxxxn <br/>bxxxe , kuxxxe , Banxxxxxe</p>
        <p className='text-gray-500'>Tel: (+91) 63xxxxxx73 <br/> Email : admin@hot.com</p>
        <p className='text-xl font-semibold text-gray-600'>Careers at HOT</p>
        <p className='text-gray-500'>Learn more about our teams and job openings.</p>
        <button className='py-4 px-8 border border-black text-sm hover:bg-black hover:text-white transition-all duration-500 '>Explore Jobs</button>
       </div>
      </div>
    </div>
  )
}

export default Contact