import React, { useEffect, useState, CSSProperties } from "react"
import "./style.css"
import { FaRegEye } from "react-icons/fa";
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { NavLink, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import HashLoader from 'react-spinners/HashLoader'
import { BASE_URL, END_POINT, changeUrl } from "../../utlis/apiUrls";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import axios from "axios";
import Heart from "react-heart";
// import InfiniteScroll from 'react-infinite-scroll-component';

const ShopListData = () => {

    const [sortTerm, setSortTerm] = useState('')
    // const [active, setActive] = useState(false)
    const [addFav, setAddFav] = useState('')
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const userToken = useSelector(state => state.user.token);
    const [cat, setCat] = useState('');
    const [itemFavourite, setItemFavourite] = useState({})
    // const [nextPageUrl, setNextPageUrl] = useState('');
    const [categoriesData, setCategoriesData] = useState('')


    const override = CSSProperties = {
        display: "block",
        margin: "0 auto",
    };

    useEffect(() => {
        productList()
        //  lazyLoading();
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
        // let Page_Limit = res.data.next
        // console.log(Page_Limit)
        // let pageNo = Math.ceil(products.length / Page_Limit) + 1;
        // const queryParam = '?page=' + pageNo + Page_Limit
        let final = BASE_URL + END_POINT
        // if (next_page_url) {
        //     final = next_page_url;
        //   }
        return await axios.get(final, {
            headers: headers
        })
            // .then((res) => setProducts(res.data.results), setLoading(true))
            .then((res) => {
                const apiRes = res.data.results
                const mergeData = [...products, ...apiRes]
                setProducts(mergeData)
                setLoading(true)
                console.log('----11--------------------')
                // setNextPageUrl(res?.data?.next)
                console.log('----22--------------------')
            })
            .catch((err) => console.log(err))
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


    useEffect(() => {
        categoryList()
    }, [])

    const categoryList = async (e) => {
        // let val = e.target.value;
        // console.log('catval',val)
        setCat(e.target.value)
        console.log('target', e.target.value)
        let Api = `/api/v1/items/?category__name=${e.target.value}`
        let finalURL = BASE_URL + Api

        axios.get(finalURL, {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Token ${userToken}`
            }
        }).then((res) => {
            console.log('CategoryList-here', res.data.results)
            setProducts(res.data.results)

        }).catch(error => {
            console.log(error)
        })

    }


    // if (status === STATUSES.LOADING) {
    //     return <h6 className="my-5"><HashLoader color='#198754'
    //         cssOverride={override}
    //         size={100} /> </h6>;
    // }

    // if (status === STATUSES.ERROR) {
    //     return <h2>Something went wrong!</h2>;
    // }


    const handleSort = async (e) => {
        let val = e.target.value;
        setSortTerm(val)
        console.log('click-e')
        const response = await fetch(`${BASE_URL}api/v1/items/?ordering=${val}`);
        const data = await response.json();
        console.log('sort', data.results)
        setProducts(data.results)
        return data.results;

    }

    const categoryData = async () => {
        let api = '/api/v1/category/'
        let FInal = BASE_URL + api
        try {
            let res = await axios.get(FInal, {
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Token ${userToken}`
                }
            })
            console.log('cateeeeee', res.data.results)
            setCategoriesData(res.data.results)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        categoryData()
    }, [])



    return (
        <div>
            <div className="container-fluid mt-3 mb-5">
                <div className="row">
                    <ToastContainer />
                    <div className="col-lg-3 mb-lg-0 mb-2 mt-1">
                        <h2 className="text-success mt-1">FIlters & category</h2>
                        <hr className="border border-success border-2 opacity-50"></hr>
                        <div>
                            <p>
                                <a className="btn btn-primary w-100 d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="true" aria-controls="collapseExample">
                                    <span className="fas fa-bars"><span className="ps-3">category & FIlter</span></span>
                                    <span className="fas fa-chevron-down" />
                                </a>
                            </p>
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
                    <div className="col-md-9">
                        <div className='container'>
                            <div className="d-flex justify-content-between">
                                <h2 className="text-success">Shopping</h2>
                                <div className="mt-1">
                                    <select className="form-select" aria-label="Default select example" onChange={handleSort}
                                        value={sortTerm}>
                                        <option selected>Sort By</option>
                                        <option value="price">Low to High</option>
                                        <option value="-price">High to Low</option>
                                        <option value="title">A-Z</option>
                                        <option value="-title">Z-A</option>
                                        <option value="created_a">Latest</option>
                                        <option value="-created_a">Old</option>
                                    </select>
                                </div>

                            </div>
                            <hr className="border border-success border-2 opacity-50"></hr>
                            <div className="row g-2">
                                {/* {loading && <HashLoader/> } */}
                                {/* <InfiniteScroll
                                    dataLength={products.length}
                                    next={lazyLoading}
                                    hasMore={products.length > true}
                                    className="d-flex flex-wrap"
                                    loader={<div key={0} ><h6>loading.......................</h6></div>}
                                    endMessage={<p style={{ textAlign: 'center' }}>
                                        <b>Yay! NO More Data</b>
                                    </p>}
                                > */}
                                {loading ? products && products.length > 0 && products.map((product) => {
                                    return (
                                        <div key={product.id} className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                                            <div className='box rounded border shadow-sm' >
                                                <div className="product my-1">
                                                    {/* <span className="off bg-success">{product?.category}</span> */}
                                                    <div className="text-center my-3">
                                                        <img src={product.images[0].image_url} alt='' width={100} height={100} />
                                                    </div>
                                                    <div className="about">
                                                        <h6 className="text-muted text-wrap">{product.title.substring(0, 17)} ...</h6>
                                                        <span className="">$ {product.price}</span>
                                                    </div>
                                                    <div className="mt-1 px-2 d-flex justify-content-between align-items-center">
                                                        <div className="">
                                                            <NavLink to={`/productDetails/${product.id}`} className="btn btn-outline-success btn-md" ><FaRegEye /></NavLink>
                                                        </div>
                                                        <div style={{ width: "25px" }}>
                                                            <Heart isActive={itemFavourite && product.id in itemFavourite ? itemFavourite[product.id] : product.is_favourite} onClick={() => handleFav(product.id)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }) : <div> <HashLoader color='#198754' cssOverride={override} size={100} /> </div>}
                                {/* </InfiniteScroll> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopListData