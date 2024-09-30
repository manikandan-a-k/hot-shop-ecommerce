import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'

const About = () => {
  return (
    <div className='border-t pt-8'>
      <div className='text-xl sm:text-2xl text-center'>
       <Title text1={"ABOUT"} text2={"US"}/>
      </div>
      <div className='my-10 flex flex-col sm:flex-row gap-16 items-center'>
        <img src={assets.about_img} alt="About Image" className='w-full rounded-md sm:max-w-[450px]' />
        <div className=' justify-center text-sm md:text-base text-gray-700  md:w-2/4  flex flex-col gap-6'>
        <p>HOT Shop is an exclusive online store that specializes in offering stylish, all-black fashion items. Our curated collection features a range of apparel, accessories, and footwear, catering to those who embrace sleek, minimalist designs. We are committed to providing a seamless shopping experience with an intuitive and responsive website, making it easy to browse, select, and purchase your favorite items</p>
        <b>OUR MISSION</b>
        <p>At HOT Shop, we value quality, style, and customer satisfaction, ensuring every product meets the highest standards of craftsmanship and trend. Shop with us for the ultimate  fashion statement!</p>
        </div>
      </div>
    </div>
  )
}

export default About