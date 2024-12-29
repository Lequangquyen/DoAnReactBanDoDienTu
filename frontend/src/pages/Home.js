import React from 'react'
import CategoryList from '../component/CategoryList'
import BannerProduct from '../component/BannerProduct'
import HorizontalCardProduct from '../component/HorizontalCardProduct'
import VerticalCardProduct from '../component/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"airpodes"}heading={"Top's Airpodes"}/>
      <HorizontalCardProduct category={"watches"}heading={"popular's Watch"}/>

      <VerticalCardProduct category={"mobiles"}heading={"Điện thoại"}/>
      <VerticalCardProduct category={"mouse"}heading={"Chuột"}/>
      <VerticalCardProduct category={"televisions"}heading={"Ti Vi"}/>
      <VerticalCardProduct category={"camera"}heading={"Camera"}/>
      
      <VerticalCardProduct category={"rarphones"}heading={"Tai nghe dây"}/>
      <VerticalCardProduct category={"speakers"}heading={"Loa bluetool"}/>
      <VerticalCardProduct category={"refrigerator"}heading={"Tủ lạnh"}/>
    </div>
  )
}

export default Home
