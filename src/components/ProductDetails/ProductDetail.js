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
import { ToastContainer, toast} from 'react-toastify';
import Header from '../../common/header/Header'
import Footer from '../../common/footer/Footer'

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
    // console.log('img', images)


    return (
        <div>
            <Header />

            <div className="container my-5">

                <div className="single_product">
                    <div className="container-fluid" style={{ backgroundColor: '#fff', padding: 11 }}>
                        <ToastContainer/>
                        <div className="row">
                            {/* <ReactImageZoom {...props} /> */}


                            <div className="col-lg-2 order-lg-1 order-2 table-responsive1">
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



                            <div className="col-lg-4 order-lg-2 order-1">
                                <div className="image_selected">

                                    <img src={mainImage ? mainImage.image_url : product.images && product.images[0].image_url} alt='img' />
                                </div>
                                {/* <Zoom
                                        img="https://www.lifeofpix.com/wp-content/uploads/2018/06/20180120-P1201659-1600x1089.jpg"
                                        zoomScale={3}
                                        width={600}
                                        height={600}
                                    /> */}
                            </div>
                            <div className="col-lg-6 order-3">
                                <div className="product_description">
                                    <div className="product_name">{product?.title}</div>
                                    <div className="product-rating"><span className="badge badge-success"><i className="fa fa-star" /> 4.5 Star</span> <span className="rating-review">Ratings &amp; Count</span></div>
                                    <div> <span className="product_price">$ {product?.price}</span> 
                                    {/* <strike className="product_discount"> <span style={{ color: 'black' }}>Rs 2,000<span> </span></span></strike>  */}
                                    </div>
                                    <hr className="singleline" />
                                    <div>
                                        <div className="row">
                                            <div className="col-md-5">
                                                <div className="p-1">
                                                    <p >Description: {product.description}</p>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="qty-change flex">
                                        <button type="button" className='btn btn-outline-success qty-dec fs-14' onClick={() => decreaseQty()}>
                                            -
                                        </button>
                                        <span className="qty-value flex flex-center mx-3">{qty}</span>
                                        <button type="button" className='btn btn-outline-primary qty-inc fs-14 text-light-blue' onClick={() => increaseQty()}>
                                            +
                                        </button>
                                    </div>
                                    <hr className="singleline" />
                                    <div className="order_info d-flex flex-row">
                                        <form action="#">
                                        </form></div>
                                    <div className="row">
                                        <div className="col-xs-6">
                                            <button type="button" className="btn btn-success me-1" onClick={() => addToCartHandler(product)}>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className="row row-underline">
                            <div className="col-md-6"> <span className=" deal-text">Specifications</span> </div>
                            <div className="col-md-6"> </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <table className="col-md-12">
                                    <tbody>
                                        <tr className="row mt-10">
                                            <td className="col-md-4"><span className="p_specification">Sales Package :</span> </td>
                                            <td className="col-md-8">
                                                <ul>
                                                    <li>{product.title}</li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr className="row mt-10">
                                            <td className="col-md-4"><span className="p_specification">Model Number :</span> </td>
                                            <td className="col-md-8">
                                                <ul>
                                                    <li> 14-dh0107TU </li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr className="row mt-10">
                                            <td className="col-md-4"><span className="p_specification">Part Number :</span> </td>
                                            <td className="col-md-8">
                                                <ul>
                                                    <li>7AL87PA</li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr className="row mt-10">
                                            <td className="col-md-4"><span className="p_specification">Color :</span> </td>
                                            <td className="col-md-8">
                                                <ul>
                                                    <li>Black</li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr className="row mt-10">
                                            <td className="col-md-4"><span className="p_specification">Suitable for :</span> </td>
                                            <td className="col-md-8">
                                                <ul>
                                                    <li>Processing &amp; Multitasking</li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr className="row mt-10">
                                            <td className="col-md-4"><span className="p_specification">Processor Brand :</span> </td>
                                            <td className="col-md-8">
                                                <ul>
                                                    <li>Intel</li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
        
    )
}

export default ProductDetail