import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BsEnvelopeFill } from 'react-icons/bs'
import './ProductSuccess.css';
import logo from '../../logo/logo.png';
import { getCartTotal } from '../../store/cartSlice';
import { useSelector,useDispatch } from 'react-redux';

const ProductSuccess = () => {
    // const totalPrice = CartItem.reduce((price, item) => price + item.qty * item.price, 0)
    const dispatch = useDispatch();
    const { data: products, totalAmount, deliveryCharge } = useSelector(state => state.cart);
    const user = useSelector(state => state.user);

    useEffect(()=>{
     dispatch(getCartTotal())   
    }, [useSelector(state => state.cart)])

    return (
        <div>
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
                                {/* <img src="https://i.imgur.com/zCAnG06.png" width={120} /> */}
                                <img src={logo} alt='logo' width={120} />
                                <h4 className="mt-2 mb-3">Your order is confirmed!</h4>
                                <h6 className="name">Hello {user.user.username},</h6><span className="fs-12 text-black-50">your order has been confirmed and will be shipped in two days</span>
                                <hr />
                                <div className="d-flex flex-row justify-content-between align-items-center order-details">
                                    <div><span className="d-block fs-12">Order date</span><span className="font-weight-bold">12 March 2023</span></div>
                                    <div><span className="d-block fs-12">Order number</span><span className="font-weight-bold">OD44434324</span></div>
                                    <div><span className="d-block fs-12">Payment method</span><span className="font-weight-bold">Credit card</span><img className="ml-1 mb-1" src="https://i.imgur.com/ZZr3Yqj.png" width={20} alt='' /></div>
                                    <div><span className="d-block fs-12">Shipping Address</span><span className="font-weight-bold text-success">Quetta, Balochistan</span></div>
                                </div>
                                <hr />
                                {products.map((item) => {
                                     const productQty = item.qty 
                                    return (
                                        <div key={item.id} className="d-flex justify-content-between align-items-center product-details">

                                            <div className="d-flex flex-row product-name-image"><img className="rounded shadow me-3" src={item.images[0].image_url} width={80} alt={item.title} />
                                                <div className="d-flex flex-column justify-content-between ml-2">
                                                    <div><span className="d-block font-weight-bold p-name">{item.title}</span><span className="fs-12">{item.category}</span></div><span className="fs-12 text-success">Qty: {productQty}pcs</span></div>
                                            </div>
                                            <div className="product-price">
                                                <h5>Rs {item.price}</h5>
                                            </div>

                                        </div>
                                    )
                                })}
                                
                                <div className="mt-5 amount row">
                                    <div className="d-flex justify-content-center col-md-6"><img src="https://i.imgur.com/AXdWCWr.gif" width={250} height={100} alt='' /></div>
                                    <div className="col-md-6">
                                        <div className="billing">
                                            <div className="d-flex justify-content-between"><span>Subtotal</span><span className="font-weight-bold">Rs {totalAmount}</span></div>
                                            <div className="d-flex justify-content-between mt-2"><span>Shipping fee</span><span className="font-weight-bold">RS {deliveryCharge}</span></div>
                                            {/* <div className="d-flex justify-content-between mt-2"><span>Tax</span><span className="font-weight-bold">$5</span></div> */}
                                            <div className="d-flex justify-content-between mt-2"><span className="text-success">Discount</span><span className="font-weight-bold text-success">0</span></div>
                                            <hr />
                                            <div className="d-flex justify-content-between mt-1"><span className="font-weight-bold">Total</span><span className="font-weight-bold text-success">Rs {totalAmount + deliveryCharge}</span></div>
                                        </div>
                                    </div>
                                </div>
                                <span className="d-block">Expected delivery date</span><span className="font-weight-bold text-success">12 March 2020</span>
                                <Link to='/viewOrder' className='btn btn-outline-warning my-1 ms-3'>view order</Link>
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
        </div>
    )
}

export default ProductSuccess