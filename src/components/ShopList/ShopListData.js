import React, { useEffect, useState, CSSProperties } from "react"
import "./style.css"
import { FaRegEye } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, STATUSES } from "../../store/productSlice";
import HashLoader from 'react-spinners/HashLoader'
import axios from "axios";
import { BASE_URL } from "../../utlis/apiUrls";

const ShopListData = () => {
    // const [count, setCount] = useState(1)
    const [cat, setCat] = useState('')
    const dispatch = useDispatch();
    const { data: products, status } = useSelector((state) => state.product)

    const override = CSSProperties = {
        display: "block",
        margin: "0 auto",
    };


    useEffect(() => {
        // console.warn('api', products)
        dispatch(fetchProducts())
        // eslint-disable-next-line react-hooks/exhaustive-deps
        getProduct();
    }, [])

    if (status === STATUSES.LOADING) {
        return <h6 className="my-5"><HashLoader color='#198754'
            cssOverride={override}
            size={100} /> </h6>;
    }

    if (status === STATUSES.ERROR) {
        return <h2>Something went wrong!</h2>;
    }




    const getProduct = async () => {
        // eslint-disable-next-line         
        try {
            axios({
                url: `${BASE_URL}api/v1/items/?ordering=${cat}`,
                method: 'get',
            })
                .then((res) => {
                    // console.log(res.data.results)
                    // setProduct(res.data)
                    setCat(res.data)
                })
        } catch (error) {
            console.log(error)
        }
    }




    // const [data, setData] = useState(shopItems1)
    //  const [getList, setGetList] = useState([], [])

    // description image price title category

    // const increment = () => {
    //     setCount(count + 1)
    // }

    // const filterProduct = (cat) => {
    //     const updateLIst = data.filter((x)=>x.category === cat);
    //     setGetList(updateLIst)
    // }


    return (
        <div>

            <div className="container-fluid mt-1 mb-5">
                <div className="row">
                    <div className="col-lg-3 mb-lg-0 mb-2">
                        <h2 className="text-success mt-1">FIlters & category</h2>
                        <hr className="border border-success border-2 opacity-50"></hr>
                        {/* <p>
                            <Link className="btn btn-primary w-100 d-flex align-items-center justify-content-between" data-bs-toggle="collapse" to="#collapseExample" role="button" aria-expanded="true" aria-controls="collapseExample">
                                <span className="fas fa-bars"><span className="ms-3">Sort By</span></span>
                                <span className="fas fa-chevron-down">
                                </span></Link>
                        </p>
                        <div className="collapse bg-white rounded shadow-sm show border" id="collapseExample">
                            <ul className="list-unstyled">
                                <li><Link className="dropdown-item" to="#" onClick={() => setCat("title")}>A-Z</Link></li>
                                <li><Link className="dropdown-item" to="#" onClick={() => setCat("-title")}>Z-A</Link></li>
                                <li><Link className="dropdown-item" to="#" >High To Low</Link></li>
                                <li><Link className="dropdown-item" to="#">Low To High</Link></li>

                            </ul>
                        </div> */}

                        <div>
                            <section id="sidebar" className="bg-white rounded shadow-sm show border mt-3">
                                <div className="">
                                    <h5 className="ms-4 my-3">Shop</h5>
                                    <div className="ms-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div><div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckChecked" defaultChecked />
                                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                                Checked checkbox
                                            </label>
                                        </div>
                                    </div>

                                </div>
                                <hr></hr>
                                <div className="">
                                    <h5 className="ms-4 my-3">Shop</h5>
                                    <div className="ms-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div><div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckChecked" defaultChecked />
                                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                                Checked checkbox
                                            </label>
                                        </div>
                                    </div>

                                </div>
                                <hr></hr>
                                <div className="">
                                    <h5 className="ms-4 my-3">Shop</h5>
                                    <div className="ms-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div><div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckChecked" defaultChecked />
                                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                                Checked checkbox
                                            </label>
                                        </div>
                                    </div>

                                </div>
                                <hr></hr>
                                <div className="">
                                    <h5 className="ms-4 my-3">Shop</h5>
                                    <div className="ms-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div><div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckChecked" defaultChecked />
                                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                                Checked checkbox
                                            </label>
                                        </div>
                                    </div>

                                </div>
                                <hr></hr>
                                <div className="">
                                    <h5 className="ms-4 my-3">Shop</h5>
                                    <div className="ms-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div><div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckChecked" defaultChecked />
                                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                                Checked checkbox
                                            </label>
                                        </div>
                                    </div>

                                </div>
                                <hr></hr>
                                <div className="">
                                    <h5 className="ms-4 my-3">Shop</h5>
                                    <div className="ms-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div><div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckChecked" defaultChecked />
                                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                                Checked checkbox
                                            </label>
                                        </div>
                                    </div>

                                </div>
                                <hr></hr>
                                <div className="">
                                    <h5 className="ms-4 my-3">Shop</h5>
                                    <div className="ms-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div><div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" defaultValue id="flexCheckChecked" defaultChecked />
                                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                                Checked checkbox
                                            </label>
                                        </div>
                                    </div>

                                </div>
                            </section>
                        </div>



                    </div>

                    <div className="col-md-9">
                        <div className='container'>
                            <div className="d-flex justify-content-between">
                                <h2 className="text-success">Shopping</h2>
                                <div>
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected>Sort By</option>
                                        <option value={1}>A-z</option>
                                        <option value={2}>Z-a</option>
                                        <option value={3}>High To Low</option>
                                        <option value={4}>Low To high</option>
                                    </select>
                                </div>

                            </div>



                            <hr className="border border-success border-2 opacity-50"></hr>

                            <div className="row g-2">

                                {products.map((product) => {
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
                                                            <NavLink to={`/${product.id}`} className="btn btn-outline-success btn-md" ><FaRegEye /></NavLink>
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
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopListData