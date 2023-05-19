import React, { useEffect, useState } from "react";
import './style.css';
import Header from '../../common/header/Header';
import Footer from '../../common/footer/Footer';
import { BASE_URL, END_POINT, CATEGORY_ENDPOINT, SORT_ENDPOINT, CATEGORY_ITEMS_LIST_ENDPOINT, FAV_ENDPOINT, changeUrl } from '../../utlis/apiUrls';
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import axios from "axios";
import Heart from "react-heart";
// import InfiniteScroll from 'react-infinite-scroll-component';
import Form from 'react-bootstrap/Form';
import ScrollToTop from "react-scroll-to-top";

const ItemPage = () => {

    const [sortTerm, setSortTerm] = useState('')
    const [addFav, setAddFav] = useState('')
    const [products, setProducts] = useState([], []);
    const [nextUrlPage, setNextUrlPage] = useState(null);
    const [prevUrlPage, setPrevUrlPage] = useState(null);
    const [cat, setCat] = useState('');
    const [itemFavourite, setItemFavourite] = useState({})
    const [categoriesData, setCategoriesData] = useState('')

    const userToken = useSelector(state => state.user.token);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(window.location.search)
    let category_name = queryParams.get("category_name");
    if (!category_name) {
        category_name = ''
    }
    console.log('category_name', category_name)

    useEffect(() => {
        productList();
        categoryData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let headers = {}
    if (userToken) {
        headers = {
            'Content-Type': "application/json",
            Authorization: `Token ${userToken}`
        }
    }


    const productList = async () => {
        let final = BASE_URL + END_POINT + CATEGORY_ITEMS_LIST_ENDPOINT + category_name
        window.scrollTo(0, 0);
        category_name = ''
        return await axios.get(final, { headers: headers })
            .then((res) => {
                const apiRes = [...products, ...res?.data?.results]
                console.log('---------------', res.data)
                setProducts(apiRes)
                setNextUrlPage(res?.data?.next)
                setPrevUrlPage(res?.data?.previous)
            })
            .catch((err) => console.log(err))
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

    const categoryList = async (e) => {
        let val = e.target.value;
        setCat(val)
        if (val == 'all-categories') {
            val = ''
        }
        let finalURL = BASE_URL + END_POINT + CATEGORY_ITEMS_LIST_ENDPOINT + val

        axios.get(finalURL, {
            headers: headers
        }).then((res) => {
            console.log('cateeee', res.data)
            setProducts(res.data.results)
            setNextUrlPage(res?.data?.next)
            setPrevUrlPage(res?.data?.previous)
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
            setCategoriesData(res.data.results)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSort = async (e) => {
        let val = e.target.value;
        setSortTerm(val)
        console.log('click-e', val)
        const response = await fetch(`${BASE_URL}${SORT_ENDPOINT}${val}`);
        const data = await response.json();
        setProducts(data.results)
        return data.results;
    }

    const price = (p) => {
        if (p == 0) {
            return ''
        } else {
            return `$ ${p}`
        }
    }

    const handleNextPage = async (url) => {
        url = url.replace(changeUrl(), BASE_URL);
        window.scrollTo(0, 0);
        return await axios.get(url, { headers: headers })
            .then((res) => {
                setProducts(res.data?.results)
                setNextUrlPage(res?.data?.next)
                setPrevUrlPage(res?.data?.previous)
            })

            .catch((err) => console.log(err))
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
            <div className='container-fluid mt-5 mb-5 newCLass'>
                <div className="row itemPage">
                    <ToastContainer />
                    <div className="col-md-12 col-lg-12 colside">
                        <div className='container'>
                            <div className="d-flex justify-content-between">
                                <div className="">
                                    <h2 className="text-success">Just For You</h2>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className="mt-1 me-2">
                                        <Form.Select aria-label="Default select example" onChange={categoryList} value={cat ? cat : category_name} >
                                            <option value="all-categories" > All Category </option>
                                            {categoriesData && categoriesData.map((cate) => {
                                                return (
                                                    <option key={cate.id} value={cate.name}>{cate.name}</option>
                                                )
                                            })}
                                        </Form.Select>
                                    </div>
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
                            </div>
                            <hr className="border border-success border-1 opacity-50"></hr>
                            <div className="row g-2">
                                {products && products.length > 0 && products.map((product) => {
                                    return (
                                        <div key={product?.id} className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                                            <div className='bg-white border rounded productShadow' >
                                                <div className="">
                                                    <div className="text-center mb-1 itemImage">
                                                        <NavLink to={`/productDetails/${product?.id}`} className="" >
                                                            {handleBadge(product.seller)}
                                                            <img src={product?.images[0]?.image_url} alt='' className="images-class w-100" width={180} height={180} />
                                                        </NavLink>
                                                    </div>
                                                    <div className="p-1">
                                                        <div className="about">
                                                            <h6 className="text-muted text-wrap">{product?.title.substring(0, 15)}</h6>
                                                            
                                                            <div className="px-2 d-flex justify-content-between align-items-center">
                                                            <span className=""> {price(product?.price)}</span>
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
                                })
                                }
                                <div className="d-flex justify-content-center">
                                    <button className='btn btn-success bt-sm me-2' disabled={prevUrlPage === null} onClick={() => handleNextPage(prevUrlPage)} > &larr; Previous</button>
                                    <button className='btn btn-success bt-sm' disabled={nextUrlPage === null} onClick={() => handleNextPage(nextUrlPage)}>Next &rarr; </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ScrollToTop smooth />
            </div>
            <Footer />
        </>
    )
}

export default ItemPage
