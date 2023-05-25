import React, { useEffect, useState } from 'react';
import { BASE_URL, END_POINT,API_VERSION } from '../../utlis/apiUrls';
import './product.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { add } from '../../store/cartSlice';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../../common/header/Header';
import Footer from '../../common/footer/Footer';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
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
                    url: `${BASE_URL}${API_VERSION()}${END_POINT()}/${id}/`,
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
            return  <h6 className='text-success'>$ {p}</h6>
        }
    }

    const handleCompany = (seller) => {
        if (seller == null) {
            return  <span> cosmedicos<img src='https://img.alicdn.com/imgextra/i1/O1CN01cLS4Rj1vgZ8xaij1e_!!6000000006202-2-tps-64-32.png' alt='' height={25} /></span> 
        } else {
            return `${seller.company}`
        }
    }

    return (
        <div>
            <Header />
            <div className="container my-5 detailPageHeight">
                <div className="single_product bg-white border rounded shadow-sm">
                    <ToastContainer />
                    <div className="row detail-height">
                        <div className="col-md-12 col-lg-5">
                            <div className="d-flex justify-content-evenly">
                                <div className="img">
                                    <Zoom>
                                        <img
                                            alt="img"
                                            src={mainImage ? mainImage.image_url : product.images && product?.images[0]?.image_url}
                                            width="300" height={300}
                                        />
                                    </Zoom>
                                    <div className="d-flex justify-content-center mt-3 imageHover">
                                        {product?.images && images.map((im, index) => {
                                            return (
                                                <div key={index} className='thumbnail text-center'>
                                                    <img src={im.image_url} alt='' className="img-thumbnail" style={{ height: '50px' }} onClick={() => setMainImage(im)} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-7">
                            <div className="desc">
                                <h3>{product.seller == null ? <img src='https://img.alicdn.com/imgextra/i1/O1CN01cLS4Rj1vgZ8xaij1e_!!6000000006202-2-tps-64-32.png' alt='' height={25} /> : '' } {product?.title}</h3>
                                <div>{price(product?.price)}</div>
                                <div className="p-1 my-2 table-responsivedesTag">
                                    <Scrollbars>
                                        <p> {product?.description}</p>
                                    </Scrollbars>
                                </div>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <div className='mt-1'>
                                            <div className=''>
                                                <button type="button" className='btn btn-outline-warning fs-14' onClick={() => decreaseQty()}>
                                                    -
                                                </button>
                                                <span className="qty-value flex flex-center mx-3">{qty}</span>
                                                <button type="button" className='btn btn-outline-success fs-14' onClick={() => increaseQty()}>
                                                    +
                                                </button>
                                            </div>
                                            <div className='mt-5'>
                                                <button type="button" className="btn btn-success me-1" onClick={() => addToCartHandler(product)}>Add to Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-8'>
                                        <div className='me-5'>
                                            <div className="card">
                                                <p className="card-header">
                                                    Sold By
                                                </p>
                                                <span className='text-success text-center my-1'>{handleCompany(product.seller)}.</span>
                                                <div className='d-flex justify-content-between text-center'>
                                                    <div className='border w-100'>
                                                        <span className='fs-6 text-muted fontWeight'>
                                                            Positive Seller Ratings
                                                        </span>
                                                        <h5>
                                                            91%
                                                        </h5>
                                                    </div>
                                                    <div className='border w-100'>
                                                        <span className='fs-6 mx-1 text-muted fontWeight'>
                                                            Ship on Time
                                                        </span>
                                                        <h5>
                                                            90%
                                                        </h5>
                                                    </div>
                                                    <div className='border w-100'>
                                                        <span className='fs-6 text-muted fontWeight'>
                                                            Chat Response Rate
                                                        </span>
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
                        </div>
                    </div>
                    <div className="row row-underline">
                        <div className="col-md-6"> <span className=" deal-text text-success">Specifications</span> </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <table className="col-md-12">
                                <tbody>
                                    <tr className="row mt-10">
                                        <td className="col-md-3"><span className="p_specification">Product Title :</span> </td>
                                        <td className="col-md-9">
                                            <ul>
                                                <li>{product.title}</li>
                                            </ul>
                                        </td>
                                    </tr>
                                    {
                                        product?.brand ? <tr className="row mt-10">
                                            <td className="col-md-3"><span className="p_specification">Company Brand :</span> </td>
                                            <td className="col-md-9">
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
                <ScrollToTop smooth />
            </div>
            <Footer />
        </div>
    )
}
export default ProductDetail
