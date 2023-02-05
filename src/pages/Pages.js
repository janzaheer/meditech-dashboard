import React from "react"
import Home from "../components/MainPage/Home"
import ShopListData from "../components/ShopList/ShopListData"
// import FlashDeals from "../components/flashDeals/FlashDeals"
// import TopCate from "../components/top/TopCate"
// import NewArrivals from "../components/newarrivals/NewArrivals"
// import Discount from "../components/discount/Discount"
// import Shop from "../components/shops/Shop"
// import Annocument from "../components/annocument/Annocument"
import Wrapper from "../components/wrapper/Wrapper"
import Header from "../common/header/Header"
import Footer from "../common/footer/Footer"

const Pages = ({ productItems, addToCart, CartItem, shopItems,shopItems1 }) => {
  return (
    <>
    <Header />
      <Home />
      <ShopListData/>
      {/* <FlashDeals productItems={productItems} addToCart={addToCart} />
      <TopCate />
      <NewArrivals />
      <Discount /> */}
      {/* <Shop shopItems={shopItems} addToCart={addToCart} /> */}
      {/* <Annocument /> */}
      <Wrapper />
      <Footer/>
    </>
  )
}

export default Pages
