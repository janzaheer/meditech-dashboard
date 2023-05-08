import React from "react"
import Home from "../components/MainPage/Home"
import ShopListData from "../components/ShopList/ShopListData"
import Wrapper from "../components/wrapper/Wrapper"
import Header from "../common/header/Header"
import Footer from "../common/footer/Footer"

const Pages = () => {
  return (
    <>
    <Header />
      <Home />
      <ShopListData/>
      <Wrapper />
      <Footer/>
    </>
  )
}

export default Pages
