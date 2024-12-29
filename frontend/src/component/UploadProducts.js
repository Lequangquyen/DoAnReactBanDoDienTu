import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import productCategory from '../helpers/productCatagory';
import { FaUpload } from "react-icons/fa6";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import {toast} from 'react-toastify'




const UploadProducts = ({
    onClose,
    fetchData
}) => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    })
    const [openFullScreenImage, setOpenFullScreenImage] = useState("")
    const [fullScreenImage, setFullSreenImage] = useState("")

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]


        const uploadImageCloundinary = await uploadImage(file)

        setData((preve) => {
            return {
                ...preve,
                productImage: [...preve.productImage, uploadImageCloundinary.url]
            }
        })



    }
    const handleDeleteProductImage = async (index) => {
        console.log("image index", index)
        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1)

        setData((preve) => {
            return {
                ...preve,
                productImage: [...newProductImage]
            }
        })
    }
    const handleSubmit = async(e)=>{
        e.preventDefault() 

        const response = await fetch(SummaryApi.uploadProduct.url,{
            method:SummaryApi.uploadProduct.method,
            credentials:'include',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })
        const responseData = await response.json()

        if(responseData.success){
            toast.success(responseData?.message)
            onClose()
            fetchData()
        }
        if(responseData.error){
            toast.error(responseData?.message)
        }
        
    }
    return (
        <div className='fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Thêm sản phẩm</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <IoMdClose />
                    </div>
                </div>

                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                    <label htmlFor='productName'>
                        Tên sản phẩm :
                    </label>
                    <input
                        type="text"
                        id="productName "
                        name='productName'
                        placeholder='Nhập tên sản phẩm'
                        value={data.productName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='brandName' className='mt-3'>
                        Tên Thương hiệu :
                    </label>
                    <input
                        type="text"
                        id="brandName "
                        placeholder='Nhập tên Thương hiệu'
                        value={data.brandName}
                        name="brandName"
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='category' className='mt-3'>
                        Loại sản phẩm :
                    </label>
                    <select required value={data.category} name="category" onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
                    <option value={""} >Thêm sản phẩm</option>
                        {
                            productCategory.map((el, index) => {
                                return (
                                    <option value={el.value} key={el.value + index}>{el.value}</option>
                                )
                            })
                        }
                    </select>
                    <label htmlFor='productImage' className='mt-3'>
                        Ảnh sản Phẩm :
                    </label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-3'>
                                <span className='text-4xl'><FaUpload /></span>
                                <p className='text-sm'>Tải ảnh sản phẩm </p>
                                <input type='file' id="uploadImageInput" className='hidden' onChange={handleUploadProduct} />
                            </div>
                        </div>
                    </label>
                    <div>
                        {
                            data?.productImage[0] ? (
                                <div className='flex items-center gap-2'>
                                    {
                                        data.productImage.map((el, index) => {
                                            return (
                                                <div className='relative group'>
                                                    <img src={el} alt={el} width={80} height={80} className='bg-slate-100 border cursor-pointer' onClick={() => {
                                                        setOpenFullScreenImage(true)
                                                        setFullSreenImage(el)
                                                    }} />
                                                    <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block' onClick={() => handleDeleteProductImage(index)}>
                                                        <MdDelete />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <p className='text-red-600 text-xs'>*Hãy thêm hình ảnh sản phẩm</p>
                            )
                        }

                    </div>
                    <label htmlFor='price' className='mt-3'>
                        Giá Bán :
                    </label>
                    <input
                        type="number"
                        id="price "
                        name='price'
                        placeholder='Nhập Giá tiền'
                        value={data.price}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='sellingPrice' className='mt-3'>
                        Giảm giá :
                    </label>
                    <input
                        type="number"
                        id="sellingPrice "
                        name='sellingPrice'
                        placeholder='Nhập Giảm giá'
                        value={data.sellingPrice}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        
                    />
                    <label htmlFor='sellingPrice' className='mt-3'>
                        Miêu Tả :
                    </label>
                    <textarea className='h-28 bg-slate-100 border resize-none p-1' placeholder='Nhập miêu tả sản phẩm' rows={3} onChange={handleOnChange} name='description' value={data.description}>

                    </textarea>
                    <button className='px-3 py-2 bg-blue-600 text-white mb-6 hover:bg-blue-700  '>Thêm sản phẩm</button>
                </form>
            </div>
            {
                openFullScreenImage && (
                    <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
                )
            }

        </div>
    )
}

export default UploadProducts
