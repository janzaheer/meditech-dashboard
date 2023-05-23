import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsEnvelopeFill } from 'react-icons/bs'
import './ProductSuccess.css';
import logo from '../../logo/logo_new.png';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, ORDER_ENDPOINT, ORDER_CANCEL } from '../../utlis/apiUrls';
import Barcode from 'react-barcode';
import Header from '../../common/header/Header';
import Footer from '../../common/footer/Footer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import ScrollToTop from 'react-scroll-to-top';
import moment from 'moment';

const ProductSuccess = () => {

    const user = useSelector(state => state.user);
    const userToken = useSelector(state => state.user.token);
    const [orderDataList, setOrderDataList] = useState({})

    let { id } = useParams();
    console.log('orderProductSuccessId', id)

    useEffect(() => {
        orderListData()
    }, [])

    const orderListData = async () => {
        let Api = `${ORDER_ENDPOINT()}/${id}/`
        let finalURL = BASE_URL + Api
        axios.get(finalURL, {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Token ${userToken}`
            }
        }).then((res) => {
            console.log('orderListData-here', res.data)
            setOrderDataList(res.data)
        }).catch(error => {
            console.log(error)
        })
    }

    const cancelOrder = async (id) => {
        console.log('order-cancel', id)
        let final = BASE_URL + ORDER_ENDPOINT() + ORDER_CANCEL(id)
        try {
            let res = await axios.post(final, {}, {
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Token ${userToken}`
                }
            })
            console.log(res.data)
            setOrderDataList(res.data)
            toast.error('Order Canceled Successfully', {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });
        } catch (error) {
            console.log('delete error', error)
        }
    }

    const orderStatusHeadings = (status) => {
        if (status == "canceled") {
            /* eslint eqeqeq: 0 */
            return "canceled"
        } else if (status == 'completed') {
            return 'completed'
        } else if (status == 'placed') {
            return 'confirmed'
        } else if (status == 'received') {
            return 'received'
        } else if (status == 'processed') {
            return 'processed'
        }
        return ''
    }

    const orderCancelButton = (status, id) => {
        if (status == "canceled") {
            return ''
        }
        return <Link to='#' onClick={() => cancelOrder(id)} className='btn btn-outline-danger my-1 ms-3'>cancel order</Link>
    }

    const price = (p) => {
        if (p == 0) {
            return `-`
        } else {
            return `$ ${p}`
        }
    }

    const subTotal = (p) => {
        if (p == 0) {
            return `-`
        } else {
            return `$ ${p}`
        }
    }

    const ShippingPrice = (p) => {
        if (p == 0) {
            return `-`
        } else {
            return `${p}`
        }
    }

    return (
        <div>
            <Header />
            <div className='container product-success mt-5'>
                <ToastContainer />
                <div className="container my-5">
                    <div className="d-flex justify-content-center row">
                        <div className="col-md-10">
                            <div className="receipt bg-white p-3 rounded shadow">
                                <img src={logo} alt='logo' width={120} />
                                <h4 className="mt-2 mb-3">Your order is {orderStatusHeadings(orderDataList.status)}
                                </h4>
                                <h6 className="name">Hello {user.user.username},</h6><span className="fs-12 text-black-50">your order has been {orderStatusHeadings(orderDataList.status)} and our support team will contact you shortly. Thank You!</span>
                                <hr />
                                <div className='row'>
                                    <div className='col-6 col-md-3'>
                                        <div><span className="d-block fs-12">Order date</span><span className="font-weight-bold">
                                            {moment(orderDataList?.created_at).format("MM-DD-YYYY")}
                                        </span></div>
                                    </div>
                                    <div className='col-6 col-md-3'>
                                        <div><span className="d-block fs-12">Order number</span><span className="font-weight-bold">{orderDataList?.order_number}</span></div>

                                    </div>
                                    <div className='col-6 col-md-3'>
                                        <div><span className="d-block fs-12">Email Address</span><span className="font-weight-bold">{orderDataList?.address?.email_address} </span> </div>

                                    </div>
                                    <div className='col-6 col-md-3'>
                                        <div><span className="d-block fs-12">Shipping Address</span>
                                            <a type="button" className="text-success" data-bs-toggle="popover" title={orderDataList?.address?.address} data-bs-content=""><span className="font-weight-bold text-success">
                                                {orderDataList?.address?.address.substring(0, 17)}</span> ...</a></div>
                                    </div>
                                </div>
                                <hr />
                                {orderDataList && orderDataList.order_items?.map((ite) => {
                                    return (
                                        <div key={ite?.item.id} className="d-flex justify-content-between align-items-center product-details">
                                            <div className="d-flex flex-row product-name-image">
                                                <img className="rounded shadow me-3" src={ite?.item.images[0]?.image_url} width={60} alt={ite?.item.title} />
                                                <div className="d-flex flex-column justify-content-evenly ml-2">
                                                    <div>
                                                        <span className="d-block font-weight-bold p-name">{ite?.item.title}</span>
                                                    </div>
                                                    <span className="fs-12 text-success">Qty: {ite?.quantity} pcs</span>
                                                </div>
                                            </div>
                                            <div className="product-price">
                                                <h5> {price(ite?.item.price)}</h5>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className="mt-5 amount row">
                                    <div className="d-flex justify-content-center col-md-6">
                                        <Barcode value={orderDataList?.order_number} />
                                    </div>
                                    <div className="col-md-6">
                                        <div className="billing">
                                            <div className="d-flex justify-content-between"><span>Subtotal</span><span className="font-weight-bold">
                                                 {subTotal(orderDataList?.total_amount)}
                                            </span></div>
                                            <div className="d-flex justify-content-between mt-2"><span>Shipping fee</span><span className="font-weight-bold">
                                                $ {ShippingPrice(orderDataList?.shipping_amount)}
                                            </span></div>
                                            <div className="d-flex justify-content-between mt-2"><span className="text-success">Discount</span><span className="font-weight-bold text-success">$ -</span></div>
                                            <hr />
                                            <div className="d-flex justify-content-between mt-1"><span className="font-weight-bold">Total</span><span className="font-weight-bold text-success">
                                                $ {subTotal(orderDataList?.total_amount) + ShippingPrice(orderDataList?.shipping_amount)}
                                            </span></div>
                                        </div>
                                    </div>
                                </div>
                                {orderCancelButton(orderDataList.status, orderDataList?.id)}
                                <span className="d-block mt-3 text-black-50 fs-15"><BsEnvelopeFill />  We will be sending a shipping confirmation email when the item is shipped!</span>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center footer mx-5">
                                    <div className="thanks"><span className="d-block font-weight-bold">Thanks for shopping</span><span>Cosmedicos Team</span></div>
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
            <Footer />
            <ScrollToTop smooth />
        </div>
    )
}

export default ProductSuccess