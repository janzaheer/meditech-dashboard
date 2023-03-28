import React from "react"
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Pages from "./pages/Pages"

import Cart from "./common/Cart/Cart"

import Contact from "./common/contact/Contact"
import ProductDetail from "./components/ProductDetails/ProductDetail"
import Checkout from "./components/productCheckout/Checkout"
import PaymentMethod from "./components/paymentMethod/PaymentMethod"
import ProductSuccess from "./components/ProductSuccess/ProductSuccess"

import Login from "./Auth/Login"
import ManageProfile from "./Profile/ManageProfile"
import AddressEdit from "./Profile/AddressEdit"
import Register from "./Auth/Register";
import SearchLIst from "./common/header/SearchLIst";
import PrivateRoute from "./common/Routes/PrivateRoute";
import ProtectedRoute from "./common/Routes/ProtectRoute";
import FavProduct from "./favProduct/FavProduct";
import Dashboard from "./adminPanel/Dashboard";
import Products from "./adminPanel/prdoucts/Products";
import ProductDetailDashboard from "./adminPanel/prdoucts/ProductDetailDashboard";
import Order from "./adminPanel/order/Order";
import PageNotFond from "./errorPage/PageNotFond";
import ItemPage from "./components/ItemPage/ItemPage";

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Pages />} ></Route>
          <Route path='/contact' element={<Contact />} ></Route>
          <Route path='/productDetails/:id' element={<ProductDetail />} ></Route>
          <Route path='/login' element={<Login />} ></Route>
          <Route path='/register' element={<Register />} ></Route>
          <Route path="search/:searchTerm" element={<SearchLIst />}></Route>

          {/*Admin Protected Routes */}
          <Route exact path='/dashboard' element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<Dashboard />} ></Route>
          </Route>
          <Route exact path='/dashboard/products' element={<ProtectedRoute />}>
          <Route path='/dashboard/products' element={<Products />} ></Route>
          </Route>
          <Route exact path='/dashboard/productDetail/:id' element={<ProtectedRoute />}>
          <Route path="/dashboard/productDetail/:id" element={<ProductDetailDashboard />} ></Route>
          </Route>
          <Route exact path='/dashboard/orders' element={<ProtectedRoute />}>
          <Route path='/dashboard/orders' element={<Order />} ></Route>
          </Route>
          {/* <Route path='/dashboard' element={<Dashboard />} ></Route>
          <Route path='/dashboard/products' element={<Products />} ></Route>
          <Route path="/dashboard/productDetail/:id" element={<ProductDetailDashboard />} ></Route>
          <Route path='/dashboard/orders' element={<Order />} ></Route> */}

          {/*Public Private Routes */}
          <Route exact path='/cart' element={<PrivateRoute />}>
            <Route exact path='/cart' element={<Cart />} />
          </Route>
          <Route exact path='/checkout' element={<PrivateRoute />}>
            <Route exact path='/checkout' element={<Checkout />} />
          </Route>
          <Route exact path='/paymentM' element={<PrivateRoute />}>
            <Route exact path='/paymentM' element={<PaymentMethod />} />
          </Route>
          <Route exact path='/productSuccess/:id' element={<PrivateRoute />}>
            <Route exact path='/productSuccess/:id' element={<ProductSuccess />} />
          </Route>

          <Route exact path='/manageProfile' element={<PrivateRoute />}>
            <Route exact path='/manageProfile' element={<ManageProfile />} />
          </Route>
          <Route exact path='/addressEdit' element={<PrivateRoute />}>
            <Route exact path='/addressEdit' element={<AddressEdit />} />
          </Route>
          <Route exact path='/favorite' element={<PrivateRoute />}>
            <Route exact path='/favorite' element={<FavProduct />} />
          </Route>
          <Route exact path='/item' element={<PrivateRoute />}>
            <Route exact path='/item' element={<ItemPage />} />
          </Route>
          <Route path='*' element={<PageNotFond />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
