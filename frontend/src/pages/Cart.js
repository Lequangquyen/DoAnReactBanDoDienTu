import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";


const Cart = () => {
    const [data, setData] = useState([])

    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)

    const fetchData = async () => {
       
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },

        })
       

        const responseData = await response.json()

        if (responseData.success) {
            setData(responseData.data)
        }
    }

    const handleLoading = async() =>{
        setLoading(true)
        await fetchData() 
        setLoading(false)
        
    }
    useEffect(() => {

        
        fetchData()
    }, [])


    const increaseQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(
                {
                    _id: id,
                    quantity: qty + 1
                }
            )
        })



        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
            context.fetchUserAddToCart()
        }


    }

    const decreaseQtyasync = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(
                    {
                        _id: id,
                        quantity: qty - 1
                    }
                )
            })



            const responseData = await response.json()

            if (responseData.success) {
                fetchData()
            }
        }


    }

    const deleteCartProcut = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(
                {
                    _id: id,

                }
            )
        })



        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
        }
    }

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0)
    return (
        <div className='container mx-auto'>
            <div className='text-center text-lg my-3'>
                {
                    data.length === 0 && !loading && (
                        <p className='bg-white py-5'>Không có thông tin</p>
                    )
                }
            </div>

            <div className='flex flex-col lg:flex-row gap-10 justify-between p-4'>

                {/***view */}

                <div className='w-full max-w-3xl '>
                    {
                        loading ? (
                            loadingCart.map((el,index) => {
                                return (
                                    <div key={el + "thêm vào giỏ hàng"+ index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'></div>
                                )
                            })

                        ) : (
                            data.map((product, index) => {
                                return (
                                    <div key={product?._id + "thêm vào giỏ hàng"} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                        <div className='w-32 h-32 bg-slate-200'>
                                            <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                        </div>
                                        <div className='px-4 py-2 relative'>




                                            {/***XOA */}
                                            <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={() => deleteCartProcut(product?._id)}>
                                                <MdDelete />
                                            </div>



                                            <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                            <p className='capitalize text-slate-500'>{product?.productId?.category}</p>

                                            <div className='flex items-center justify-between'>
                                                <p className='text-red-600 font-medium text-lg'> {displayINRCurrency(product?.productId.sellingPrice)}</p>
                                                <p className='text-slate-600 font-semibold text-lg'> {displayINRCurrency(product?.productId.sellingPrice * product?.quantity)}</p>
                                            </div>

                                            <div className='flex items-center gap-3 mt-2'>
                                                <button className='p-1 border border-red-600 text-red-600 hover:bg-red-700 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => decreaseQtyasync(product?._id, product?.quantity)}>-</button>
                                                <span>{product?.quantity}</span>
                                                <button className='p-1 border border-red-600 text-red-600 hover:bg-red-700 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => { increaseQty(product?._id, product?.quantity) }}>+</button>

                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                        )
                    }
                </div>




                {/***TOng gia tien */}

                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {
                        loading ? (
                            <div className='h-36 bg-slate-200 border-slate-300 animate-pulse'>

                            </div>
                        ) : (
                            <div className='h-36 bg-white'>
                                <h2 className='text-white bg-red-600 px-4 py-1'>
                                    Số tiền
                                </h2>
                                <div className='flex items-center justify-between px=4 p-4 gap-2 font-medium text-lg text-slate-600'>
                                    <p>Số lượng</p>
                                    <p>{totalQty}</p>
                                </div>


                                <div  className='flex items-center justify-between px=4 p-4 gap-2 font-medium text-lg text-slate-600'>
                                <p>Tổng:</p>
                                <p>{displayINRCurrency(totalPrice)}</p>
                                </div>


                                <button className='bg-blue-600 p-4 text-white w-full'>Thanh toán</button>
                            </div>


                        )
                    }
                </div>



            </div>

        </div>
    )
}

export default Cart
