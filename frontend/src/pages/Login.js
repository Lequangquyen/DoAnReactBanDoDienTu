import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const { fetchUserDetails ,fetchUserAddToCart} = useContext(Context)

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    const handleSubmit = async(e) =>{
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url,{
            method : SummaryApi.signIn.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
        }

        if(dataApi.error){
            toast.error(dataApi.message)
        }

    }

    console.log("data login",data)

    return (
        <div>
            <section id="login">
                <div className='mx-auto container p-4'>

                    <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                        <div className='w-20 h-20 mx-auto'>
                            <img src={loginIcons} alt='login icons' />
                        </div>

                        <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                            <div className='grid'>
                                <label>Email:</label>
                                <div className='bg-slate-100 p-2'>
                                    <input
                                        type='email'
                                        placeholder='Nhập Email'
                                        name='email'
                                        value={data.email}
                                        onChange={handleOnChange}
                                        required
                                        className='w-full h-full outline-none bg-transparent' />
                                </div>
                            </div>

                            <div>
                                <label>Mật khẩu :</label>
                                <div className='bg-slate-100 p-2 flex'>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name='password'
                                        value={data.password}
                                        placeholder='Nhập password '
                                        onChange={handleOnChange}
                                        className='w-full h-full outline-none bg-transparent' />

                                    <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prove) => !prove)}>
                                        <span>
                                            {
                                                showPassword ? (
                                                    <IoEyeOff />
                                                ) :
                                                    (
                                                        <IoEyeSharp />
                                                    )
                                            }
                                        </span>
                                    </div>
                                </div>
                                <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                                    Quên mật khẩu?
                                </Link>
                            </div>
                            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-6'>Đăng nhập</button>
                        </form>

                        <p className='my-5'>Bạn chưa có tài khoản?<Link to={'/sign-up'} className=' text-red-600 hover:text-red-700 hover:underline'>Đăng ký</Link> </p>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Login
