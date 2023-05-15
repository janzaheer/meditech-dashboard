import React, { useEffect, useState } from "react"
import "./style.css"
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { BASE_URL, END_POINT, CATEGORY_ENDPOINT, CATEGORY_ITEMS_LIST_ENDPOINT, FAV_ENDPOINT } from "../../utlis/apiUrls";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import axios from "axios";
import Heart from "react-heart";
import ScrollToTop from "react-scroll-to-top";

const ShopListData = () => {

    const [addFav, setAddFav] = useState('')
    const [itemFavourite, setItemFavourite] = useState({})
    const [categoriesData, setCategoriesData] = useState('')
    const [landingData, setLandingData] = useState({})

    const userToken = useSelector(state => state.user.token);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate();

    useEffect(() => {
        ProductListingWithCategory()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let headers = {}
    if (userToken) {
        headers = {
            'Content-Type': "application/json",
            Authorization: `Token ${userToken}`
        }
    }

    const handleFav = async (id) => {
        console.log('addd', addFav)

        let AddFavURL = BASE_URL + FAV_ENDPOINT
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
        if (isAuthenticated == false) {
            navigate("/login")
        }
    }


    const ProductListingWithCategory = async () => {
        let category_endpoint = BASE_URL + CATEGORY_ENDPOINT
        await axios.get(category_endpoint, {
          headers: headers
        }).then(async (res) => {
          let categories = res.data.results
          setCategoriesData(categories)
          let promises = categories.map(category => {
            let items_endpoint = BASE_URL + END_POINT + CATEGORY_ITEMS_LIST_ENDPOINT + category.name
            return axios.get(items_endpoint, {
              headers: headers
            }).then((response) => {
              return {
                name: category.name,
                items: response.data.results
              }
            })
          });
          Promise.all(promises).then((results) => {
            let data = {}
            results.forEach(resultA => {
              data[resultA.name] = resultA.items
            })
            setLandingData(data)
          })
        })
    }

    const price = (p) => {
        /* eslint eqeqeq: 0 */
        if (p == 0) {
            return ''
        } else {
            return `$ ${p}`
        }
    }

    const getRandomCategoryImage = () => {
        const CategoryImagesList = [
            "./images/categoryList/1.jpg",
            "./images/categoryList/2.jpg",
            "./images/categoryList/3.jpg",
            "./images/categoryList/4.jpg",
            './images/categoryList/5.jpg'
        ]
        const random = Math.floor(Math.random() * CategoryImagesList.length);
        return CategoryImagesList[random]
    }

    return (
        <div>
            <div className="container-fluid mt-3 mb-5">
                <div className="row">
                    <ToastContainer />
                    <div className="col-md-12 col-lg-12 mb-2">
                        <div className="container">
                            <h2 className="text-success mt-2">Categories</h2>
                            <hr className="border border-success border-1 opacity-50"></hr>
                            <div className="row g-0 d-flex justify-content-center">
                                {categoriesData && categoriesData.slice(0, 12).map((categoryName) => {
                                    return (
                                        <div key={categoryName.id} className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 text-center">
                                            <div className="bg-white productShadow mx-1 border rounded">
                                                <div className="card" style={{ height: '100px' }}>
                                                    <div className="card-body">
                                                        <NavLink to={`/item/?category_name=${categoryName.name}`} className='text-dark' >
                                                            <img src={categoryName.image_url ? categoryName.image_url : getRandomCategoryImage()} alt='' height={50} width={80} className="" />
                                                            <p className="mt-1 text-wrap">{categoryName?.name}.</p>
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div>
                        {landingData && Object.keys(landingData).map((key, index) => {
                            return (
                                <div key={key} className="col-lg-12 mb-2">
                                    <div className="container">
                                        <h2 className="text-success mt-2">{key}</h2>
                                        <hr className="border border-success border-1 opacity-50"></hr>
                                        <div className="row g-2" >
                                            {landingData[key] && landingData[key].slice(0, 6).map((item) => {
                                                return (
                                                    <div key={item?.id} className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                                                        <div className='bg-white border rounded productShadow' >
                                                            <div className="">
                                                                <div className="text-center mb-1">
                                                                    <NavLink to={`/productDetails/${item?.id}`} className="" >
                                                                        <img src={item?.images[0]?.image_url} alt='' className="images-class w-100" width={180} height={180} />
                                                                    </NavLink>
                                                                </div>
                                                                <div className="p-1">
                                                                    <div className="about">
                                                                        <h6 className="text-muted text-wrap">{item.title.substring(0, 15)}</h6>
                                                                        <div className="d-flex justify-content-between align-items-center px-2">
                                                                            <span className=""> {price(item?.price)}</span>
                                                                            <div style={{ width: "20px" }}>
                                                                                <Heart isActive={itemFavourite && item.id in itemFavourite ? itemFavourite[item.id] : item.is_favourite} onClick={() => handleFav(item.id)} />
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
                                        <div className="d-flex justify-content-center mt-2">
                                            <NavLink to={`/item/?category_name=${key}`} className="btn btn-outline-success" >View More</NavLink>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <ScrollToTop smooth />
            </div>
        </div>
    )
}

export default ShopListData
