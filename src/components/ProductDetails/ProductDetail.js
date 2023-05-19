import React, { useEffect, useState } from 'react'
import { BASE_URL, END_POINT } from '../../utlis/apiUrls'
import './product.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
// import Zoom from 'react-img-zoom'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { add } from '../../store/cartSlice'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../../common/header/Header'
import Footer from '../../common/footer/Footer'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import ScrollToTop from "react-scroll-to-top";

const ProductDetail = () => {
    const { id } = useParams();
    console.log(`id is ${id}`)
    const [product, setProduct] = useState([]);
    const [mainImage, setMainImage] = useState(product?.images && product?.images[0].image_url)
    const [qty, setQty] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const getProduct = async () => {
            // eslint-disable-next-line         
            try {
                axios({
                    url: `${BASE_URL}${END_POINT}/${id}/`,
                    method: 'get',
                })
                    .then((res) => {
                        console.log(res.data)
                        setProduct(res.data)
                    })
            } catch (error) {
                console.log(error)
            }
        }
        getProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const addToCartHandler = (product) => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        let totalPrice = qty * product.price;
        const tempProduct = {
            ...product,
            quantity: qty,
            totalPrice
        }
        dispatch(add(tempProduct));
        toast.info("Product add TO Cart successfully", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
        });
        navigate(`/cart`);
    };

    const increaseQty = () => {
        setQty((prevQty) => {
            let newQty = prevQty + 1;
            return newQty;
        })
        toast.success("Qty increase +1 successfully", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
        });
    }

    const decreaseQty = () => {
        setQty((prevQty) => {
            let newQty = prevQty - 1;
            if (newQty < 1) {
                newQty = 1;
            }
            return newQty;
        })
        toast.warning("Qty decrease -1 successfully", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
        });
    }

    const { images } = product;

    const price = (p) => {
        /* eslint eqeqeq: 0 */
        if (p == 0) {
            return <h6 className='text-danger'> Please place a order for quotation, Once order is placed our support team will call you </h6>
        } else {
            return `$ ${p}`
        }
    }

    const handleCompany = (seller) => {
        if (seller == null) {
            return 'cosmedicos mall'
        } else {
            return `${seller.company}`
        }
    }

    return (
        <div>
            <Header />
            <div className="container my-5">
                <div className="single_product">
                    <div className="container-fluid" style={{ backgroundColor: '#fff', padding: 11 }}>
                        <ToastContainer />
                        <div className="row">
                            {/* <ReactImageZoom {...props} /> */}
                            <div className="col-4 col-sm-4 col-lg-2 order-sm-1 table-responsive1 imagesul" >
                                <Scrollbars>
                                    {product.images && images.map((im, index) => {
                                        return (
                                            <ul key={index} className="image_list">
                                                <li data-image='' ><img src={im.image_url} alt='' onClick={() => setMainImage(im)} /></li>
                                            </ul>
                                        )
                                    })}
                                </Scrollbars>
                            </div>
                            <div className="col-8 col-sm-8 col-lg-4 order-sm-2">
                                <div className="image_selected">
                                    {/* <img src={mainImage ? mainImage.image_url : product.images && product?.images[0]?.image_url} alt='img' className='w-100' /> */}
                                    <Zoom>
                                        <img
                                            alt="img"
                                            src={mainImage ? mainImage.image_url : product.images && product?.images[0]?.image_url}
                                            width="300"
                                        />
                                    </Zoom>
                                </div>
                            </div>
                            <div className="col-lg-6 order-3">
                                <div className="product_description">
                                    <div className="product_name mt-5">{product?.title}</div>
                                    <div>
                                        <span className="product_price"> {price(product?.price)}</span>
                                    </div>
                                    <div>
                                        <div className="row">
                                            <div className="col-md-10">
                                                <div className="p-1 my-2 table-responsivedesTag">
                                                    <Scrollbars>
                                                        <p> {product?.description}</p>
                                                    </Scrollbars>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className='d-flex justify-content-between' >
                                        <div className=''>
                                            <div className="flex">
                                                <button type="button" className='btn btn-outline-warning btn-sm fs-14' onClick={() => decreaseQty()}>
                                                    -
                                                </button>
                                                <span className="qty-value flex flex-center mx-3">{qty}</span>
                                                <button type="button" className='btn btn-outline-success btn-sm fs-14 text-light-blue' onClick={() => increaseQty()}>
                                                    +
                                                </button>

                                            </div>
                                            <button type="button" className="btn btn-success btn-sm mt-3 me-1" onClick={() => addToCartHandler(product)}>Add to Cart</button>

                                        </div>
                                       
                                    </div> */}
                                    <div className="flex">
                                        <button type="button" className='btn btn-outline-warning fs-14' onClick={() => decreaseQty()}>
                                            -
                                        </button>
                                        <span className="qty-value flex flex-center mx-3">{qty}</span>
                                        <button type="button" className='btn btn-outline-success fs-14 text-light-blue' onClick={() => increaseQty()}>
                                            +
                                        </button>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-6 mt-2">
                                            <button type="button" className="btn btn-success me-1" onClick={() => addToCartHandler(product)}>Add to Cart</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='mt-3 row'>
                            <div className='col-12 col-md-7'>
                                <div className="card">
                                    <div className="card-header">
                                        Sold By
                                    </div>
                                    <div className="card-body">
                                            <p className='text-success'>{handleCompany(product.seller)}.</p>
                                            <div className="row text-muted text-center">
                                                <div className='col-4'>
                                                    <div className=''>
                                                        <span className='fs-6'>
                                                            Positive Seller Ratings
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <h5>
                                                            91%
                                                        </h5>
                                                    </div>
                                                </div>
                                                <div className='col-4'>
                                                    <div>
                                                        <span className='fs-6'>
                                                            Ship on Time
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <h5>
                                                            90%
                                                        </h5>
                                                    </div>
                                                </div>
                                                <div className='col-4'>
                                                    <div>
                                                        <span className='fs-6'>
                                                            Chat Response Rate
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <h5>
                                                            80%
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row row-underline">
                            <div className="col-md-6"> <span className=" deal-text">Specifications</span> </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <table className="col-md-12">
                                    <tbody>
                                        <tr className="row mt-10">
                                            <td className="col-md-4"><span className="p_specification">Product Title :</span> </td>
                                            <td className="col-md-8">
                                                <ul>
                                                    <li>{product.title}</li>
                                                </ul>
                                            </td>
                                        </tr>
                                        {
                                            product?.brand ? <tr className="row mt-10">
                                                <td className="col-md-4"><span className="p_specification">Company Brand :</span> </td>
                                                <td className="col-md-8">
                                                    <ul>
                                                        <li>{product?.brand}</li>
                                                    </ul>
                                                </td>
                                            </tr> : ''
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <ScrollToTop smooth />
            </div>
            <Footer />
        </div>
    )
}
export default ProductDetail
