import React, { useEffect, useState } from "react"
import "./style.css"
import { FaRegEye } from "react-icons/fa";
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { HiBars3 } from 'react-icons/hi2';
import { NavLink, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import HashLoader from 'react-spinners/HashLoader'
import { BASE_URL, END_POINT, CATEGORY_ENDPOINT, SORT_ENDPOINT, CATEGORY_MENU_LIST_ENDPOINT, FAV_ENDPOINT ,changeUrl } from "../../utlis/apiUrls";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import axios from "axios";
import Heart from "react-heart";
import InfiniteScroll from 'react-infinite-scroll-component';
import Form from 'react-bootstrap/Form';

const ShopListData = () => {

    const [sortTerm, setSortTerm] = useState('')
    const [addFav, setAddFav] = useState('')
    const [products, setProducts] = useState([], []);
    const [nextUrlPage, setNextUrlPage] = useState('');
    // const [loading, setLoading] = useState(false)
    const [cat, setCat] = useState('');
    const [itemFavourite, setItemFavourite] = useState({})
    const [categoriesData, setCategoriesData] = useState('')
    const [hasMore, setHasMore] = useState(true);
    const [numberCount, setNumberCount] = useState('')

    const userToken = useSelector(state => state.user.token);

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

    const productList = async (next_page_url) => {
        let final = BASE_URL + END_POINT
        if (next_page_url) {
            final = next_page_url;
        } else {
            // setShow(false)
        }

        return await axios.get(final, {
            headers: headers
        })
            .then((res) => {
                const apiRes = [...products, ...res?.data?.results]
                setProducts(apiRes)
                setNextUrlPage(res?.data?.next)
                console.log('new', res.data)
                setNumberCount(res.data.count)
            })
            .catch((err) => console.log(err))
    }

    const lazyLoading = () => {
        let final = BASE_URL + END_POINT
        if (nextUrlPage) {
            final = nextUrlPage.replace(changeUrl(), BASE_URL);
            productList(final)
        }
        console.log('number', numberCount)
        if (products.length >= numberCount) {
            setHasMore(false)
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
    }

    const categoryList = async (e) => {
        let val = e.target.value;
        setCat(val)
        console.log('target', val)
        let finalURL = BASE_URL + CATEGORY_MENU_LIST_ENDPOINT + val
        axios.get(finalURL, {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Token ${userToken}`
            }
        }).then((res) => {
            console.log('cateeee',res.data)
            setProducts(res.data.results)

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
            // console.log('catData',res.data.results)
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

    const price = (p)=>{
        if (p == 0) {
            return ''
        } else {
            return`$ ${p}`
        }
    }

    return (
        <div>
            <div className="container-fluid mt-3 mb-5">
                <div className="row">
                    <ToastContainer />
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
                                    <li><Link to='/favorite' className="dropdown-item"> favorite List <MdOutlineFavoriteBorder className="text-success ms-1" /> </Link></li>
                                    <div>
                                        <section id="sidebar" className="bg-white rounded shadow-sm show border mt-3">
                                            <div className="">
                                                <h5 className="ms-4 my-3">Categories</h5>
                                                <div className="ms-3" onChange={categoryList} value={cat}>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value='' />
                                                        <label className="form-check-label" htmlFor="exampleRadios2">
                                                            All
                                                        </label>
                                                    </div>
                                                    {categoriesData && categoriesData.map((cate) => {
                                                        return (
                                                            <div className="form-check" key={cate.id}>
                                                                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value={cate?.name} />
                                                                <label className="form-check-label" htmlFor="exampleRadios2">
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
                            {/* {loading && <HashLoader/> } */}
                            {/* <div id="scrollableDiv" style={{ height: 800, overflow: "auto" }}> */}
                            <InfiniteScroll
                                dataLength={products.length}
                                next={lazyLoading}
                                hasMore={hasMore}
                                // className="d-flex flex-wrap"
                                loader={<div key={0} ><HashLoader color='#198754' cssOverride={ {display: "block", margin: "0 auto"} } size={100} /></div>}
                                // endMessage={
                                //     <p style={{ textAlign: "center" }}>
                                //         <b>Yay! You have seen it all</b>
                                //     </p>
                                // }
                                // scrollableTarget="scrollableDiv"
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
                                                                {/* <span className="">$ {product?.price}</span> */}
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
                                        // : <div> <HashLoader color='#198754' cssOverride={override} size={100} /> </div>
                                    }
                                    {/* <Button variant="primary" onClick={handleShowMore} >Load More</Button> */}
                                </div>
                            </InfiniteScroll>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopListData