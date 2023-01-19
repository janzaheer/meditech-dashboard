import React from "react"
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import store from '../src/store/store';
// import { Provider } from "react-redux";
import Header from "./common/header/Header"
import Pages from "./pages/Pages"
// import Data from "./components/Data"
import Cart from "./common/Cart/Cart"
import Footer from "./common/footer/Footer"
// import Sdata from "./components/shops/Sdata"
// import ShopData from "./components/ShopList/ShopData"
import Contact from "./common/contact/Contact"
import ProductDetail from "./components/ProductDetails/ProductDetail"
import Checkout from "./components/productCheckout/Checkout"
import PaymentMethod from "./components/paymentMethod/PaymentMethod"
import ProductSuccess from "./components/ProductSuccess/ProductSuccess"
import MyOrder from "./components/MyOrder/MyOrder"
import ViewOrder from "./components/ViewOrder/ViewOrder"
import Login from "./Auth/Login"
import ManageProfile from "./Profile/ManageProfile"
import ProfileEdit from "./Profile/ProfileEdit"
import AddressEdit from "./Profile/AddressEdit"
import Register from "./Auth/Register";
import SearchLIst from "./common/header/SearchLIst";
import PrivateRoute from "./common/Routes/PrivateRoute";
// import ProtectedRoute from "./common/Routes/ProtectRoute";

function App() {

  return (
    <>
      {/* <Provider store={store}> */}
        <BrowserRouter>
          <Header />
          <Routes>

            <Route path='/' element={<Pages />} ></Route>
            <Route path='/contact' element={<Contact />} ></Route>
            <Route path='/:id' element={<ProductDetail />} ></Route>


            {/* <Route path='/checkout' element={<Checkout />} ></Route>
            <Route path='/paymentM' element={<PaymentMethod />} ></Route>
            <Route path='/productSuccess' element={<ProductSuccess />} ></Route>
            <Route path='/myOrder' element={<MyOrder />} ></Route>
            <Route path='/viewOrder' element={<ViewOrder />} ></Route>
            <Route path='/manageProfile' element={<ManageProfile />} ></Route>
            <Route path='/profileEdit' element={<ProfileEdit />} ></Route>
            <Route path='/addressEdit' element={<AddressEdit />} ></Route> */}

        
            <Route path='/login' element={<Login />} ></Route>
            <Route path='/register' element={<Register />} ></Route>
            <Route path = "/search/:searchTerm" element = {<SearchLIst />}></Route>


            {/* Protected Routes */}
            <Route exact path='/cart' element={<PrivateRoute/>}>
                <Route exact path='/cart' element={<Cart/>}/>
            </Route>
            <Route exact path='/checkout' element={<PrivateRoute/>}>
                <Route exact path='/checkout' element={<Checkout />}/>
            </Route>
            <Route exact path='/paymentM' element={<PrivateRoute/>}>
                <Route exact path='/paymentM' element={<PaymentMethod />}/>
            </Route>
            <Route exact path='/productSuccess' element={<PrivateRoute/>}>
                <Route exact path='/productSuccess' element={<ProductSuccess />}/>
            </Route>
            <Route exact path='/myOrder' element={<PrivateRoute/>}>
                <Route exact path='/myOrder' element={<MyOrder />}/>
            </Route>
            <Route exact path='/viewOrder' element={<PrivateRoute/>}>
                <Route exact path='/viewOrder' element={<ViewOrder />}/>
            </Route>
            <Route exact path='/manageProfile' element={<PrivateRoute/>}>
                <Route exact path='/manageProfile' element={<ManageProfile />}/>
            </Route>
            <Route exact path='/profileEdit' element={<PrivateRoute/>}>
                <Route exact path='/profileEdit' element={<ProfileEdit />}/>
            </Route>
            <Route exact path='/addressEdit' element={<PrivateRoute/>}>
                <Route exact path='/addressEdit' element={<AddressEdit />}/>
            </Route>

          </Routes>
          <Footer />
        </BrowserRouter>
      {/* </Provider> */}

    </>
  )
}

export default App
