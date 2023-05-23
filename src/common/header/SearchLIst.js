import React, { useEffect, useState } from 'react'
import './SearchList.css'
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../components/ShopList/style.css'
import Header from './Header';
import Footer from '../footer/Footer';
import axios from 'axios';
import { BASE_URL, FAV_ENDPOINT,END_POINT } from '../../utlis/apiUrls';
import Heart from "react-heart";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import ScrollToTop from 'react-scroll-to-top';

const SearchLIst = () => {

  const queryParams = new URLSearchParams(window.location.search)
  let search_name = queryParams.get("search");

  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const navigate = useNavigate();

  const userToken = useSelector(state => state.user.token);
  const [itemFavourite, setItemFavourite] = useState({})
   const [searchData, setSearchData] = useState('')

  useEffect(()=>{
    searchFunction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[search_name])


  const searchFunction = async () =>{
    let final = BASE_URL + END_POINT() + `?search=${search_name}`
    window.scrollTo(0, 0);
     await axios.get(final)
     .then((res)=>{
      console.log('search',res.data.results)
      setSearchData(res.data.results)
     })
  }

  const handleFav = async (id) => {
    console.log('click-id', id)
    let AddFavURL = BASE_URL + FAV_ENDPOINT()
    axios.post(AddFavURL, { item_id: id }, {
      headers: {
        'Content-Type': "application/json",
        Authorization: `Token ${userToken}`
      }
    }).then((result) => {
      console.log(result)
      if (result.data.message.includes('remove')) {
        let idata = itemFavourite
        idata[id] = false
        setItemFavourite(idata)
        toast.error(result.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });
      } else {
        let data = itemFavourite
        data[id] = true
        setItemFavourite(data)
        toast.success(result.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });
      }
    }).catch(error => {
      console.log(error)
    })
    if (isAuthenticated == false) {
      navigate("/login")
    }
  }

  const handleBadge = (seller) =>{
    if (seller == null) {
        return <span className="badge text-bg-success notify-badge">cosmedicos mall</span>
    } else {
        return ''
    }
}

  return (
    <>
      <Header />
      <div className='container searchClass'>
        <ToastContainer />
        <main>
          <div className='search-content bg-whitesmoke'>
            <div className='container'>
              <div className='py-5'>
                <div className='title-md text-center'>
                  <h3 className='text-success'>Search results</h3>
                </div>
                <br />
                <div className="row g-2 mx-md-5">
                  {searchData && searchData.map((product) => {
                    return (
                      <div key={product.id} className="col-6 col-sm-6 col-md-4 col-lg-2">
                        <div className='bg-white border rounded productShadow'>
                          <div className="">
                            <div className="text-center mb-3 itemImage">
                              <NavLink to={`/${product.id}`} className="" >
                                {handleBadge(product.seller)}
                                <img src={product.images[0].image_url} alt='' className="images-class w-100" width={180} height={180} />
                              </NavLink>
                            </div>
                            <div className='p-1'>
                              <div className="about">
                                <h6 className="text-muted text-wrap">{product.title.substring(0, 11)}</h6>
                                <div className="px-2 d-flex justify-content-between align-items-center">
                                  <span className="">Rs {product.price}</span>
                                  <div style={{ width: "20px" }}>
                                    <Heart isActive={itemFavourite && product.id in itemFavourite ? itemFavourite[product.id] : product.is_favourite} onClick={() => handleFav(product.id)} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
      <ScrollToTop smooth />
    </>
  )
}
export default SearchLIst
