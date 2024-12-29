import React, { useState } from 'react'
import ROLE from '../common/role'
import SummaryApi from '../common'
import { toast } from 'react-toastify'

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc,
}) => {
    const [userRole, setUserRode] = useState(role)
    const handleOnChangeSelect = (e) => {
        setUserRode(e.target.value)
        console.log(e.target.value)

    }
    const updateUserRole = async() =>{
        const fetchResponse = await fetch(SummaryApi.updateUser.url,{
            method : SummaryApi.updateUser.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body:JSON.stringify({
                userId:userId,
                role:userRole
            })
        })
        const responeData= await fetchResponse.json()

        if(responeData.success){
            toast.success(responeData.message)
            onClose(onClose)
            callFunc() 
        }

        console.log("roleUpdate",responeData)

    }
    return (
        <div className='fixed top-0 botton-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-35'>
            <div className=' mx-auto bg-white shadow-md p-4 w-full max-w-sm '>

                <button className='block ml-auto' onClick={() => onClose()}>
                    X
                </button>

                <h1 className='pb-4 text-lg font-medium'>Thay đổi role của Người dùng </h1>
                <p>Name:{name}</p>
                <p>Email:{email}</p>

                <div className='flex items-center justify-between my-4'>
                    <p>Role:</p>
                    <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                        {
                            Object.values(ROLE).map(el => {
                                return (
                                    <option value={el} key={el}>
                                        {el}
                                    </option>
                                )
                            })
                        }
                        <option></option>
                    </select>
                </div>
                <button className='w-fit mx-auto block py-1 px-3 rounded-full bg-blue-700 hover:bg-blue-900 text-white'onClick={updateUserRole}>ĐỔi</button>
            </div>
        </div>
    )
}

export default ChangeUserRole
