import React, { useEffect, useState } from 'react'
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import image1 from '../assest/banner/banner1.jpg'
import image2 from '../assest/banner/Banner2.jpg'
import image3 from '../assest/banner/Banner3.jpg'


import image1Mobile from '../assest/banner/img1_mobile.jpg'


const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)
    const desktopImages = [
        image1,
        image2,
        image3,
        
    ]
    const mobileImages = [
        image1Mobile,
        

    ]
    const nextImage =()=>{
        if(desktopImages.length-1>currentImage){
            setCurrentImage(preve =>preve +1)
        }
        
    }
    const preveImage =()=>{
        if(currentImage!=0){
            setCurrentImage(preve =>preve - 1)
        }
    }
    useEffect(()=>{
        const intervel = setInterval(()=>{
            if(desktopImages.length-1>currentImage){
                nextImage() 
            }else{
                setCurrentImage(0)
            }
        },5000)

        return()=>clearInterval(intervel)
    },[currentImage])
    return (
        <div className='container mx-auto px-4 rounded '>
            <div className='h-56 md:h-72 w-full bg-slate-200 relative'>
                <div className='absolute z-10 h-full w-full md:flex items-center hidden '>
                    <div className=' flex justify-between w-full text-2xl'>
                        <button onClick={preveImage } className='bg-white shadow-md rounded-full p-1'><FaAngleLeft /></button>
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight /></button>
                    </div>
                </div>

                <div className='hidden md:flex h-full w-full overflow-hidden'>
                    {
                        desktopImages.map((imageURL, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    <img src={imageURL} className='w-full h-full' />
                                </div>
                            )
                        })
                    }
                </div>
                {/**phần layout cho mobile */}
                <div className='flex h-full w-full overflow-hidden md:hidden '>
                    {
                        mobileImages.map((imageURL, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    <img src={imageURL} className='w-full h-full object-cover' />
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default BannerProduct
