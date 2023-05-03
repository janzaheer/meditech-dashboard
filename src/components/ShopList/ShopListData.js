import React, { useEffect, useState } from "react"
import "./style.css"
import { FaRegEye } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
// import HashLoader from 'react-spinners/HashLoader'
import { BASE_URL, END_POINT, CATEGORY_ENDPOINT, CATEGORY_ITEMS_LIST_ENDPOINT, FAV_ENDPOINT } from "../../utlis/apiUrls";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import axios from "axios";
import Heart from "react-heart";
// import InfiniteScroll from 'react-infinite-scroll-component';
// import Form from 'react-bootstrap/Form';

const ShopListData = () => {

    // const [sortTerm, setSortTerm] = useState('')
    const [addFav, setAddFav] = useState('')
    // const [products, setProducts] = useState([], []);
    // const [nextUrlPage, setNextUrlPage] = useState('');
    // const [loading, setLoading] = useState(false)
    const [cateList, setCateList] = useState('')
    const [itemFavourite, setItemFavourite] = useState({})
    const [categoriesData, setCategoriesData] = useState('')
    // const [hasMore, setHasMore] = useState(true);
    // const [numberCount, setNumberCount] = useState('')

    const userToken = useSelector(state => state.user.token);

    useEffect(() => {
        // productList();
        categoryData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        categoryList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let headers = {}
    if (userToken) {
        headers = {
            'Content-Type': "application/json",
            Authorization: `Token ${userToken}`
        }
    }

    // const productList = async (next_page_url) => {
    //     let final = BASE_URL + END_POINT
    //     if (next_page_url) {
    //         final = next_page_url;
    //     } else {
    //     }
    //     return await axios.get(final)
    //         .then((res) => {
    //             const apiRes = [...products, ...res?.data?.results]
    //             setProducts(apiRes)
    //             setNextUrlPage(res?.data?.next)
    //             setNumberCount(res.data.count)
    //         })
    //         .catch((err) => console.log(err))
    // }

    // const lazyLoading = () => {
    //     let final = BASE_URL + END_POINT
    //     if (nextUrlPage) {
    //         final = nextUrlPage.replace(changeUrl(), BASE_URL);
    //         productList(final)
    //     }
    //     console.log('number', numberCount)
    //     if (products.length >= numberCount) {
    //         setHasMore(false)
    //     }
    // }

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
    }

    const categoryList = async () => {
        let finalURL = BASE_URL + END_POINT + CATEGORY_ITEMS_LIST_ENDPOINT
        axios.get(finalURL, {
            headers: headers
        }).then((res) => {
            console.log('cateeee', res.data)
            setCateList(res.data.results)
        }).catch(error => {
            console.log(error)
        })
    }

    const categoryData = async () => {
        let FInal = BASE_URL + CATEGORY_ENDPOINT
        try {
            let res = await axios.get(FInal, {
                headers: headers
            })
            console.log('catData', res.data.results)
            setCategoriesData(res.data.results)
        } catch (error) {
            console.log(error)
        }
    }

    // const handleSort = async (e) => {
    //     let val = e.target.value;
    //     setSortTerm(val)
    //     console.log('click-e', val)
    //     const response = await fetch(`${BASE_URL}${SORT_ENDPOINT}${val}`);
    //     const data = await response.json();
    //     setProducts(data.results)
    //     return data.results;
    // }

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
                                                            <img src={getRandomCategoryImage()} alt='' height={50} width={50} className="" />
                                                            <p className="mx-1 mt-1 text-wrap">{categoryName?.name}.</p>
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
                        {categoriesData && categoriesData.map((categoryName) => {
                            return (
                                <div key={categoryName.id} className="col-lg-12 mb-2">
                                    <div className="container">
                                        <h2 className="text-success mt-2">{categoryName.name}</h2>
                                        <hr className="border border-success border-1 opacity-50"></hr>
                                        <div className="row g-2">
                                            {cateList && cateList.slice(0, 6).map((catItem) => {
                                                return (
                                                    <div key={catItem?.id} className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                                                        <div className='bg-white border rounded productShadow' >
                                                            <div className="">
                                                                <div className="text-center mb-1">
                                                                    <NavLink to={`/productDetails/${catItem?.id}`} className="" >
                                                                        <img src={catItem?.images[0]?.image_url} alt='' className="images-class w-100" width={180} height={180} />
                                                                    </NavLink>
                                                                </div>
                                                                <div className="p-1">
                                                                    <div className="about">
                                                                        <h6 className="text-muted text-wrap">{catItem.title.substring(0, 15)}</h6>
                                                                        <div className="d-flex justify-content-between align-items-center px-2">
                                                                            <span className=""> {price(catItem?.price)}</span>
                                                                            <div style={{ width: "20px" }}>
                                                                                <Heart isActive={itemFavourite && catItem.id in itemFavourite ? itemFavourite[catItem.id] : catItem.is_favourite} onClick={() => handleFav(catItem.id)} />
                                                                            </div>
                                                                        </div>
                                                                    
                                                                    </div>
                                                                    {/* <div className="mt-1 px-2 d-flex justify-content-between align-items-center">
                                                                        <div className="">
                                                                            <NavLink to={`/productDetails/${catItem?.id}`} className="btn btn-outline-success btn-sm" ><FaRegEye /></NavLink>
                                                                        </div>
                                                                        <div style={{ width: "23px" }}>
                                                                            <Heart isActive={itemFavourite && catItem.id in itemFavourite ? itemFavourite[catItem.id] : catItem.is_favourite} onClick={() => handleFav(catItem.id)} />
                                                                        </div>
                                                                    </div> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="d-flex justify-content-center mt-2">
                                            <NavLink to={`/item/?category_name=${categoryName.name}`} className="btn btn-outline-success" >View More</NavLink>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {/* <div className="col-md-12 col-lg-12">
                        <div className='container'>
                            <div className="d-flex justify-content-between">
                                <h2 className="text-success">Just For You</h2>
                                <div className="mt-1">
                                    <Form.Select aria-label="Default select example" onChange={handleSort} value={sortTerm} >
                                        <option> Sort By </option>
                                        <option value="price">Price: Low to High</option>
                                        <option value="-price">Price: High to Low</option>
                                        <option value="title">Alphabets: A-Z</option>
                                        <option value="-title">Alphabets: Z-A</option>
                                        <option value="created_a">Latest</option>
                                        <option value="-created_a">Old</option>
                                    </Form.Select>
                                </div>
                            </div>
                            <hr className="border border-success border-2 opacity-50"></hr>
                            <InfiniteScroll
                                dataLength={products.length}
                                next={lazyLoading}
                                hasMore={hasMore}
                                loader={<div key={0} ><HashLoader color='#198754' cssOverride={{ display: "block", margin: "0 auto" }} size={100} /></div>}
                            >
                                <div className="row g-2">
                                    {products && products.map((product) => {
                                        return (
                                            <div key={product?.id} className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                                                <div className='border shadow-sm' >
                                                    <div className="product">
                                                        <div className="text-center mb-1">
                                                            <img src={product?.images[0]?.image_url} alt='' className="images-class w-100" width={180} height={180} />
                                                        </div>
                                                        <div className="p-1">
                                                            <div className="about">
                                                                <h6 className="text-muted text-wrap">{product.title.substring(0, 15)}</h6>
                                                                <span className=""> {price(product?.price)}</span>
                                                            </div>
                                                            <div className="mt-1 px-2 d-flex justify-content-between align-items-center">
                                                                <div className="">
                                                                    <NavLink to={`/productDetails/${product?.id}`} className="btn btn-outline-success btn-sm" ><FaRegEye /></NavLink>
                                                                </div>
                                                                <div style={{ width: "25px" }}>
                                                                    <Heart isActive={itemFavourite && product.id in itemFavourite ? itemFavourite[product.id] : product.is_favourite} onClick={() => handleFav(product.id)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                            </InfiniteScroll>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default ShopListData