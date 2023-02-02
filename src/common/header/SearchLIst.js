import React, { useEffect, useState } from 'react'
import './SearchList.css'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAsyncSearchProduct, getSearchProducts, getSearchProductsStatus, clearSearch } from '../../store/searchSlice';
import { STATUS } from '../../utlis/status'
import { NavLink } from 'react-router-dom';
import '../../components/ShopList/style.css'
import { FaRegEye } from 'react-icons/fa'
import Header from './Header';
import Footer from '../footer/Footer';
import axios from 'axios';
import { BASE_URL } from '../../utlis/apiUrls';
import Heart from "react-heart";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'

const SearchLIst = () => {

  const dispatch = useDispatch();
  const { searchTerm } = useParams();
  const searchProducts = useSelector(getSearchProducts)
  const searchProductsStatus = useSelector(getSearchProductsStatus);
  console.log('searchlist', searchProducts)
  const userToken = useSelector(state => state.user.token);
  const [itemFavourite, setItemFavourite] = useState({})
  const [addFav, setAddFav] = useState('')
  useEffect(() => {
    dispatch(clearSearch());
    dispatch(fetchAsyncSearchProduct(searchTerm))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  if (searchProducts.length === 0) {
    return (
      <div className='container search' style={{
        minHeight: "70vh"
      }}>
        <div className='fw-5 text-danger py-5'>
          <h3>No Products found.</h3>
        </div>
      </div>
    )
  }
  const handleFav = async (id) => {
    console.log('click-id', id)
    console.log('addd', addFav)

    let Api = `api/v1/favourite/items/`
    let AddFavURL = BASE_URL + Api

    axios.post(AddFavURL, { item_id: id }, {
      headers: {
        'Content-Type': "application/json",
        Authorization: `Token ${userToken}`
      }
    }).then((result) => {
      console.log(result)
      setAddFav(result)
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
  }


  return (
    <>
      <Header />
      <div className='container'>
        <ToastContainer/>
        <main>
          <div className='search-content bg-whitesmoke'>
            <div className='container'>
              <div className='py-5'>
                <div className='title-md'>
                  <h3>Search results:</h3>
                </div>
                <br />
                <div className="row g-2">
                  {searchProducts.map((product) => {
                    return (
                      <div key={product.id} className=" col-md-6 col-lg-4 col-xl-3">
                        <div className='box rounded border shadow-sm' >
                          <div className="product ">
                            {/* <span className="off bg-success">{product.category}</span> */}
                            <div className="text-center my-3">
                              <img src={product.images[0].image_url} alt='' width={100} height={100} />
                            </div>
                            <div className="about">
                              <h6 className="text-muted text-wrap">{product.title.substring(0, 17)} ...</h6>
                              <span className="">Rs {product.price}</span>
                            </div>
                            <div className="mt-1 px-2 d-flex justify-content-between align-items-center">
                              <div className="">
                                <NavLink to={`/${product.id}`} className="btn btn-success btn-md" ><FaRegEye /></NavLink>
                              </div>
                              <div style={{ width: "25px" }}>
                                <Heart isActive={itemFavourite && product.id in itemFavourite ? itemFavourite[product.id] : product.is_favourite} onClick={() => handleFav(product.id)} />
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
    </>

  )
}
export default SearchLIst
