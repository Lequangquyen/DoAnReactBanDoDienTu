import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { FiEdit3 } from "react-icons/fi";
import ChangeUserRole from '../component/ChangeUserRole';


const AllUsers = () => {
    const [allUser, setAllUsers] = useState([])
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [updateUserDetail,setUdateUserDetail]=useState({
        email:"",
        name:"",
        role:"",
        _id:""
    })
    
    const fetchAllUsers = async () => {
        const fetchData = await fetch(SummaryApi.allUser.url, {
            method: SummaryApi.allUser.method,
            credentials: 'include'
        })
        const dataResponse = await fetchData.json()


        if (dataResponse.success) {
            setAllUsers(dataResponse.data)
        }
        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }
    }
    useEffect(() => {
        fetchAllUsers()
    }, [])


    return (
        <div className='bg-white pb-4'>
            <table className='w-full userTable'>
                <thead>
                    <tr className='bg-blue-950 text-white'>
                        <th>Sr.</th>
                        <th>Tên</th>
                        <th>email</th>
                        <th>Role</th>
                        <th>Ngày đăng kí</th>
                        <th>Chi Tiết</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {
                        allUser.map((el, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{el?.name}</td>
                                    <td>{el?.email}</td>
                                    <td>{el?.role}</td>
                                    <td>{moment(el?.createdAt).format('LL')}</td>
                                    <td><button className='bg-blue-100 p-2 rounded-full cursor-pointer hover:bg-blue-700 hover:text-white'onClick={()=>{
                                        setUdateUserDetail(el)
                                        setOpenUpdateRole(true)

                                    }}><FiEdit3 /></button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            {
                openUpdateRole && (
                    <ChangeUserRole onClose={()=>setOpenUpdateRole(false)}
                    name={updateUserDetail.name}
                    email={updateUserDetail.email}
                    role={updateUserDetail.role}
                    userId={updateUserDetail._id}
                    callFunc={fetchAllUsers}
                    />
                    
                )
            }


        </div>
    )
}

export default AllUsers