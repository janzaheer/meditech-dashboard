import React,{useEffect} from 'react'
import './SearchList.css'
import { useSelector,useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAsyncSearchProduct,getSearchProducts, getSearchProductsStatus, clearSearch } from '../../store/searchSlice';
// import ShopListData from '../../components/ShopList/ShopListData';
import {STATUS } from '../../utlis/status'
import { NavLink } from 'react-router-dom';
import '../../components/ShopList/style.css'
import {FaRegEye} from 'react-icons/fa'

const SearchLIst = () => {

    const dispatch = useDispatch();
    const {searchTerm} = useParams();
    const searchProducts = useSelector(getSearchProducts)
    const searchProductsStatus = useSelector(getSearchProductsStatus);
    console.log('searchlist',searchProducts)
    useEffect(()=>{
        dispatch(clearSearch());
         dispatch(fetchAsyncSearchProduct(searchTerm))
        // console.log(fetchAsyncSearchProduct(searchTerm))
          // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchTerm])

    if(searchProducts.length === 0){
        return (
          <div className='container search' style = {{
            minHeight: "70vh"
          }}>
            <div className='fw-5 text-danger py-5'>
              <h3>No Products found.</h3>
            </div>
          </div>
        )
      }
    
    return (

        <div className='container mt-5 search'>
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
                                                        {/* <button className="btn btn-outline-success btn-sm" onClick={() => addProduct(product)}><BsCartPlusFill /></button> */}

                                                        <div className="">
                                                            <NavLink to={`/${product.id}`} className="btn btn-success btn-md" ><FaRegEye /></NavLink>
                                                        </div>
                                                        <div className='product-like'>
                                                            {/* <label>{count}</label><br /> */}
                                                            <div className="product_fav"><i className="fas fa-heart" /></div>
                                                            {/* <i className='fa-regular fa-heart' onClick={increment}></i> */}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                    )
                                })}

                            </div>
            {/* {
            //   searchProductsStatus === STATUS.LOADING ? <p>loading...</p> : <ShopListData products = {searchProducts} />
            } */}
          </div>
        </div>
      </div>
    </main>
        </div>

    )
}

export default SearchLIst