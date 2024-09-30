import React from 'react'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14  text-sm my-10'>
        <div>
            <h2 className='pacifico-regular text-4xl mb-5'>Hot</h2>
            <p className='text-gray-600 w-full md:w-2/3'>we specialize in timeless fashion that blends elegance and everyday comfort. With a focus on quality craftsmanship and customer satisfaction, we aim to provide an exceptional shopping experience. Our curated collections are designed to inspire confidence and style for every occasion.</p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
             <li>Home</li>
             <li>About us</li>
             <li>Delivery</li>
             <li>Privacy policy</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
             <li>+1-212-456-7890</li>
             <li>contact@hot.com</li>
        
            </ul>
        </div>
        </div>
        <div>
            <hr/>
            <p className='text-center py-5 text-sm text-gray-900'>Copyright 2024 &copy; hot.com - All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footer