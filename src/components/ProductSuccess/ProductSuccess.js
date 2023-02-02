import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsEnvelopeFill } from 'react-icons/bs'
import './ProductSuccess.css';
import logo from '../../logo/logo.png';
import { getCartTotal } from '../../store/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, ORDER_ENDPOINT } from '../../utlis/apiUrls';
// import bar from '../assets/images/bar.png'
import Barcode from 'react-barcode';
import Header from '../../common/header/Header';
import Footer from '../../common/footer/Footer';

// import date formate
import moment from 'moment';

const ProductSuccess = () => {
    // const totalPrice = CartItem.reduce((price, item) => price + item.qty * item.price, 0)
    const dispatch = useDispatch();
    const { data: products, totalAmount, deliveryCharge } = useSelector(state => state.cart);
    const user = useSelector(state => state.user);
    const userToken = useSelector(state => state.user.token);
    const [orderDataList, setOrderDataList] = useState({})

    let { id } = useParams();
    console.log('orderProductSuccessId', id)
    useEffect(() => {
        dispatch(getCartTotal())
    }, [useSelector(state => state.cart)])


    useEffect(() => {
        orderListData()
    }, [])


    const orderListData = async () => {
        console.log('---------------------11------ ------')
        let Api = `${ORDER_ENDPOINT}/${id}/`
        let finalURL = BASE_URL + Api

        axios.get(finalURL, {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Token ${userToken}`
            }
        }).then((res) => {
            console.log('orderListData-here', res.data)
            setOrderDataList(res.data)
            console.log('----------------------123-----------------123--------------')

        }).catch(error => {
            console.log(error)
        })
    }
    // console.log('----2---1---',orderDataList.total_amount)


    return (
        <div>
            <Header />
            <div className='container product-success mt-5'>
                {/* <div className='container my-5'>
                    <div className='success-product-box rounded bg-white shadow'>
                        <div className='text-box'>
                            <h2 className='text-center text-warning'>Thanks you for your purchase!</h2>
                            <p className='text-center my-3'>Your Order Number is 123456768789909876</p>
                            <p className='text-center'>Please have this amount ready on delivery day!</p>
                        </div>


                        <div className='row'>
                            <div className='col-12 px-5'>

                                <h3 className='my-4'>Your Delivery Dates</h3>
                                <hr />
                                <div className='pro-success-box d-flex justify-content-center align-items-center'>
                                    <img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1565713229/single_4.jpg" alt="" width={50} />
                                    <p className='ms-3'>Est 15 Dec to 18 Dec</p>
                                </div>
                                <div className='d-flex align-items-center justify-content-center my-3 border'>
                                    <p className=''>For more details tp track your delivery status under <b>My Account / My Order</b> </p>
                                    <Link to='/viewOrder' className='btn btn-outline-warning my-1 ms-3'>view order</Link>
                                </div>
                                <div className='d-flex align-items-center justify-content-center my-3 border'>
                                    <h3><BsEnvelopeFill /></h3>
                                    <p className='ms-3'>We've a sent confirmation email to abc@gmail.com with order details</p>
                                </div>
                                <div className='d-flex align-items-center justify-content-center my-3 border'>

                                    <h4>Order Summary</h4>
                                    <p className='text-warning ms-3'>Rs 970</p>
                                </div>
                                <div className='my-3'>

                                    <Link to='/' className='btn btn-warning w-100' >Continue Shopping</Link>
                                </div>


                            </div>

                        </div>
                    </div>
                </div> */}

                <div className="container my-5">
                    <div className="d-flex justify-content-center row">
                        <div className="col-md-10">
                            <div className="receipt bg-white p-3 rounded shadow">
                                <img src={logo} alt='logo' width={120} />
                                <h4 className="mt-2 mb-3">Your order is confirmed!</h4>
                                <h6 className="name">Hello {user.user.username},</h6><span className="fs-12 text-black-50">your order has been confirmed and our support team will contact you shortly. Thank You!</span>
                                <hr />
                                <div className="d-flex flex-row justify-content-between align-items-center order-details">
                                    <div><span className="d-block fs-12">Order date</span><span className="font-weight-bold">
                                        {moment(orderDataList?.created_at).format("MM-DD-YYYY")}
                                    </span></div>
                                    <div><span className="d-block fs-12">Order number</span><span className="font-weight-bold">{orderDataList?.order_number}</span></div>
                                    <div><span className="d-block fs-12">Email Address</span><span className="font-weight-bold">{orderDataList?.address?.email_address} </span> </div>
                                    <div><span className="d-block fs-12">Shipping Address</span>
                                    <a type="button" className="text-success" data-bs-toggle="popover" title={orderDataList?.address?.address} data-bs-content=""><span className="font-weight-bold text-success">
                                        {orderDataList?.address?.address.substring(0, 17)}</span> ...</a></div>
                                </div>
                                <hr />
                                {orderDataList && orderDataList.order_items?.map((ite) => {
                                    return (
                                        <div key={ite?.item.id} className="d-flex justify-content-between align-items-center product-details">

                                            <div className="d-flex flex-row product-name-image">
                                                <img className="rounded shadow me-3" src={ite?.item.images[0].image_url} width={60} alt={ite?.item.title} />
                                                <div className="d-flex flex-column justify-content-evenly ml-2">
                                                    <div>
                                                        <span className="d-block font-weight-bold p-name">{ite?.item.title}</span>
                                                        {/* <span className="fs-12">{item.category}</span> */}
                                                    </div>
                                                    <span className="fs-12 text-success">Qty: {ite?.quantity} pcs</span>
                                                </div>
                                                {/* <hr className="border border-success border-1 opacity-50"></hr> */}
                                            </div>
                                            <div className="product-price">
                                                <h5>$ {ite?.item.price}</h5>
                                            </div>

                                        </div>
                                    )
                                })}

                                <div className="mt-5 amount row">
                                    <div className="d-flex justify-content-center col-md-6">
                                        {/* <img src="https://i.imgur.com/AXdWCWr.gif" width={250} height={100} alt='' /> */}
                                        {/* <img src={bar} width={250} height={100} alt='' /> */}
                                        <Barcode value={orderDataList?.order_number} />
                                        </div>
                                    <div className="col-md-6">
                                        <div className="billing">
                                            <div className="d-flex justify-content-between"><span>Subtotal</span><span className="font-weight-bold">
                                                $ {orderDataList?.total_amount}
                                            </span></div>
                                            <div className="d-flex justify-content-between mt-2"><span>Shipping fee</span><span className="font-weight-bold">
                                                $ {orderDataList?.shipping_amount}
                                            </span></div>
                                            {/* <div className="d-flex justify-content-between mt-2"><span>Tax</span><span className="font-weight-bold">$5</span></div> */}
                                            <div className="d-flex justify-content-between mt-2"><span className="text-success">Discount</span><span className="font-weight-bold text-success">$ {(0)}</span></div>
                                            <hr />
                                            <div className="d-flex justify-content-between mt-1"><span className="font-weight-bold">Total</span><span className="font-weight-bold text-success">
                                                $ {orderDataList?.total_amount + orderDataList?.shipping_amount}
                                            </span></div>
                                        </div>
                                    </div>
                                </div>
                                {/* <span className="d-block">Expected delivery date</span><span className="font-weight-bold text-success">{orderDataList?.processed_date}</span> */}
                                <Link to='#' className='btn btn-outline-danger my-1 ms-3'>cancel order</Link>
                                <span className="d-block mt-3 text-black-50 fs-15"><BsEnvelopeFill />  We will be sending a shipping confirmation email when the item is shipped!</span>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center footer">
                                    <div className="thanks"><span className="d-block font-weight-bold">Thanks for shopping</span><span>MediTech team</span></div>
                                    <div className="d-flex flex-column justify-content-end align-items-end"><span className="d-block font-weight-bold">Need Help?</span><span>Call - 93333333333</span></div>
                                </div>

                                <div className='my-3'>

                                    <Link to='/' className='btn btn-outline-success w-100' >Continue Shopping</Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>




            </div>
            <Footer/>
        </div>
    )
}

export default ProductSuccess