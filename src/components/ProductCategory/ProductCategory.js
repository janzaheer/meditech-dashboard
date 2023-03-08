import React, { useState, useEffect } from 'react'
import { HiBars3 } from 'react-icons/hi2';
import { useSelector } from 'react-redux';
import { BASE_URL, CATEGORY_ENDPOINT, CATEGORY_MENU_LIST_ENDPOINT } from "../../utlis/apiUrls";
import axios from "axios";

const ProductCategory = () => {
  const [cat, setCat] = useState('');
  const [categoriesList, setCategoriesList] = useState([])
  const [categoriesData, setCategoriesData] = useState('')
  const [products, setProducts] = useState([], []);
  const userToken = useSelector(state => state.user.token);
  
  useEffect(() => {
    categoryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const categoryList = async (e) => {
    let val = e.target.value;
    setCat(val)
    console.log('target', val)
    let finalURL = BASE_URL + CATEGORY_MENU_LIST_ENDPOINT + val
    axios.get(finalURL, {
      headers: {
        'Content-Type': "application/json"
      }
    }).then((res) => {
      console.log('cateeee', res.data)
      setProducts(res.data.results)
      setCategoriesList(res.data.count)

    }).catch(error => {
      console.log(error)
    })
  }

  const categoryData = async () => {
    let FInal = BASE_URL + CATEGORY_ENDPOINT
    try {
      let res = await axios.get(FInal, {
        headers: {
          'Content-Type': "application/json",
          Authorization: `Token ${userToken}`
        }
      })
      setCategoriesData(res.data.results)
      console.log('catApi', res.data.results)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="container-fluid mt-3 mb-5">
        <div className="row">
          <div className="col-lg-3 mb-lg-0 mb-2 mt-1">
            <h2 className="text-success mt-1">FIlters & category</h2>
            <hr className="border border-success border-2 opacity-50"></hr>
            <div>
              <h6>
                <a className="btn btn-primary w-100 d-flex align-items-center justify-content-between" data-bs-toggle="collapse"
                  href="#collapseExample" role="button" aria-expanded="true" aria-controls="collapseExample">
                  <h6 className="mt-1"><HiBars3 className="me-2" />Categories</h6>
                  <span className="fas fa-chevron-down" />
                </a>
              </h6>
              <div className="collapse show border shadow" id="collapseExample">
                <ul className="list-unstyled">
                  <li>
                    {/* <Link to='/favorite' className="dropdown-item"> favorite List <MdOutlineFavoriteBorder className="text-success ms-1" /> </Link> */}
                  </li>
                  <div>
                    <section id="sidebar" className="bg-white rounded shadow-sm show border mt-3">
                      <div className="">
                        <h5 className="ms-4 my-3">Categories</h5>
                        <div className="ms-3" onChange={categoryList} value={cat}>
                          <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value='' />
                            <label className="form-check-lab" htmlFor="exampleRadios2">
                              All
                            </label>
                          </div>
                          {categoriesData && categoriesData.map((cate) => {
                            return (
                              <div className="form-check" key={cate.id}>
                                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value={cate?.name} />
                                <label className="form-check-lab" htmlFor="exampleRadios2">
                                  {cate?.name}
                                </label>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      <hr></hr>
                      <div className="">
                        <div className="mb-5 cat">

                        </div>
                      </div>
                    </section>
                  </div>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-9">
            <div className='container'>
              <div className="d-flex justify-content-between">
                <h2 className="text-success">Shopping</h2>
                <div className="mt-1">
                  {/* <Form.Select aria-label="Default select example" onChange={handleSort} value={sortTerm} >
                                        <option> Sort By </option>
                                        <option value="price">Price: Low to High</option>
                                        <option value="-price">Price: High to Low</option>
                                        <option value="title">Alphabets: A-Z</option>
                                        <option value="-title">Alphabets: Z-A</option>
                                        <option value="created_a">Latest</option>
                                        <option value="-created_a">Old</option>
                                    </Form.Select> */}
                </div>
              </div>
              <hr className="border border-success border-2 opacity-50"></hr>
              <section id="products">
                <div className="container">
                  <div className="d-flex flex-row">
                    <div className="text-muted m-2" id="res">Showing {categoriesList} results</div>
                    <div className="ml-auto mr-lg-4">
                      <div id="sorting" className="border rounded p-1 m-1">
                        <span className="text-muted">Sort by</span>
                        <select name="sort" id="sort">
                          <option value="popularity">Popularity</option>
                          <option value="prcie">Price</option>
                          <option value="rating">Rating</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row g-2">
                    {products && products.map((catList) => {
                      return (
                        <div className="col-lg-3 col-md-6 col-sm-10 offset-md-0 offset-sm-1" key={catList?.id}>
                          <div className="card" >
                            <img className="card-img-top" src={catList?.images[0]?.image_url} alt='' height={180}/>
                            <div className="card-body">
                              <h5><b>{catList?.title.substring(0, 15)}</b> </h5>
                              <div className="d-flex flex-row my-2">
                                <div className="text-muted">{catList?.price}</div>
                              </div>
                              <button className="btn w-100 rounded my-2">Add to cart</button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCategory