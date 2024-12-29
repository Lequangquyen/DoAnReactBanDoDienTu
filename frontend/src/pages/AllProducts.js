import React, { useEffect, useState } from 'react'
import UploadProducts from '../component/UploadProducts'
import SummaryApi from '../common'
import AdminProductCard from '../component/AdminProductCard'

const AllProducts = () => {

  const [openUploadProduct, setOpenUpLoadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()

    console.log("product data", dataResponse)

    setAllProduct(dataResponse?.data || [])
  }
  useEffect(() => {
    fetchAllProduct()
  }, [])
  return (
    <div>
      <div className='bg-white p-2 px-4 flex justify-between items-center'>
        <h2 className='font-b old text -lg'>Tất cả sản phẩm</h2>
        <button className='border-2 border-blue-600  hover:bg-blue-800 hover:text-white py-1 px-3 rounded-full' onClick={() => setOpenUpLoadProduct(true)}>Thêm Sản Phẩm</button>
      </div>

      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          allProduct.map((product, index) => {
            return (
              <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct}/>
            )
          })
        }
      </div>
      {
        openUploadProduct && (
          <UploadProducts onClose={() => setOpenUpLoadProduct(false)}fetchData={fetchAllProduct} />
        )
      }

    </div>
  )
}

export default AllProducts