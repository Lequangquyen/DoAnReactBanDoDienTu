import React, { useContext, useState } from 'react'

import { BsSearch } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
import LogoDT from '../assest/banner/LogoDT.png';


const Header = () => {
   const user = useSelector(state => state?.user?.user)
   const dispathch = useDispatch()
   const [menuDisplay, setmenuDisplay] = useState(false)
   const context =useContext(Context)
   const navigate =useNavigate()
   const searchInput = useLocation()
   const URLSearch = new URLSearchParams(searchInput?.search)
   const searchQuery =URLSearch.getAll("q")
   const [search,setSearch] = useState(searchQuery)

   
   const handleLogout = async () => {
      const fetchData = await fetch(SummaryApi.logout_user.url, {
         method: SummaryApi.logout_user.method,
         credentials: 'include'
      })

      const data = await fetchData.json()

      if (data.success) {
         toast.success(data.message)
         dispathch(setUserDetails(null))
         navigate("/")
      }
      if (data.error) {
         toast.error(data.message)
      }
   }

   const handleSearch = (e)=>{
      const{value} = e.target
      setSearch(value)

      if(value){
         navigate(`/search?q=${value}`)
      }else{
         navigate("/search")
      }
   }
   
   return (
      <header className='h-16 shadow-md bg-gray-900 fixed w-full z-40'>
         <div className='h-full container mx-auto flex items-center px-4 justify-between'>
            <div className=''>
               <Link to={"/"}>
               <img className='w-14 h-auto rounded-full' src={LogoDT}/>
               </Link>
            </div>




            <div className='hidden lg:flex items-center w-full justify-between max-w-sm  rounded-full focus-within:shadow-md pl-2'>
               <input type='text' placeholder='Tìm kiến sản phẩm ở đây' className='w-full outline-none' onChange={handleSearch} value={search}/>
               <div className='text-lg min-w-[50px] h-8 flex items-center justify-center rounded-r-full text-white '>
                  <BsSearch />
               </div>
            </div>




            <div className='flex items-center gap-7'>

               <div className='relavite flex justify-center'>
                  {
                     user?._id && (
                        <div className='text-3xl cursor-pointer relative flex justify-center text-yellow-400' onClick={() => setmenuDisplay(preve => !preve)}>
                           {
                              user?.profilePic ? (
                                 <img src={user?.profilePic} className='w-10 h-10 rounded-full ' alt={user?.name} />
                              ) : (
                                 <FaRegUser />
                              )
                           }
                        </div>

                     )
                  }

                  {
                     menuDisplay && (
                        <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded '>
                           <nav>
                              {
                                 user?.role === ROLE.ADMIN && (
                                    <Link to={"admin-panel"} className='whitespace-nowrap hiddenmd:block hover:bg-slate-100 p-2' onClick={() => setmenuDisplay(preve => !preve)}>Phần Admin</Link>
                                 )


                              }

                           </nav>
                        </div >
                     )
                  }

               </div>
                  {
                     user?._id && (
                        <Link to={"/cart"} className='text-2xl relative'>
                        <span className='text-yellow-300'><FaShoppingCart /></span>
                        
                        <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-0 -right-3'>
                           <p className='text-sm'>{context?.cartProductCount}</p>
                        </div>
                     </Link>
                     )
                  }
               

               <div>
                  {
                     user?._id ? (
                        <button onClick={handleLogout} className='px-3 py-1  text-yellow-300 bg-gray-900 hover:bg-gray-700'>
                           Đăng xuất
                        </button>
                     ) : (
                        <Link to={"/login"} className='px-3 py-1 rounded-md text-yellow-300 bg-gray-900 hover:bg-gray-700'>Đăng Nhập</Link>
                     )
                  }

               </div>
            </div>
         </div>
      </header>
   )
}

export default Header

