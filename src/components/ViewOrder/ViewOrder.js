import React, { useEffect } from 'react'
import './ViewOrder.css'
import { Link } from 'react-router-dom'
import { MdOutlineManageAccounts } from 'react-icons/md'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useSelector,useDispatch } from 'react-redux';
import { getCartTotal } from '../../store/cartSlice';

const ViewOrder = () => {
    // const totalPrice = CartItem.reduce((price, item) => price + item.qty * item.price, 0)
    const dispatch = useDispatch();
    const{ data: products, totalAmount, deliveryCharge } = useSelector(state => state.cart);

    useEffect(()=>{
        dispatch(getCartTotal())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [useSelector(state => state.cart)])


    return (
        <div>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='order-box rounded bg-white shadow mb-2'>
                            <div className='d-flex align-items-center justify-content-between mx-3'>
                                <div className='d-flex align-items-center'>
                                    <p className='mt-3 me-1'>Order </p><p className='text-success mt-3'>#123456768789909876</p>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <p className='mt-3 me-1'>Rs </p><p className='text-success mt-3'>{totalAmount}</p>
                                </div>
                            </div>
                            <hr />
                            <div className='mx-3' >
                                <Link to='/myOrder' className='text-success'>Manage Order <MdOutlineManageAccounts className='ms-2 iconB' /> </Link>
                            </div>
                            <div className='d-flex justify-content-between mx-3'>
                                <div className='d-flex align-items-center'>
                                    <p className='text-success mt-3'>Gst by Thus 14 Dec -Sun- 18 Dec</p>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <p className=' mt-3'>Standard Delivery</p>
                                </div>
                            </div>
                            <hr />
                            {/* Shopping cart table */}
                            <div className="table-responsive">
                                <Scrollbars>
                                    <table className="table mt-1 text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="p-2 px-3 text-uppercase">Product</div>
                                                </th>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="py-2 text-uppercase">Name</div>
                                                </th>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="py-2 text-uppercase">Quantity</div>
                                                </th>
                                                {/* <th scope="col" className="border-0 bg-light">
                                                    <div className="py-2 text-uppercase">Action</div>
                                                </th> */}

                                            </tr>
                                        </thead>
                                        <tbody>

                                            {products.map((item) => {


                                                return (
                                                    <tr key={item.id}>
                                                        <th scope="row" className="border-0">
                                                            <div className="p-2">
                                                                <img src={item.images[0].image_url} alt='' width={70} className="img-fluid rounded shadow-sm" />
                                                            </div>
                                                        </th>
                                                        <td className="border-0 text-muted align-middle"><strong>{item.title}</strong></td>
                                                        <td className="border-0 align-middle"><strong>{item.quantity}</strong></td>
                                                        {/* <td className="border-0 align-middle"><Link className='text-success'>Cancel</Link>  </td> */}
                                                    </tr>
                                                )
                                            })}

                                        </tbody>

                                    </table>
                                </Scrollbars>

                            </div>
                            {/* End */}
                        </div>
                    </div>
                </div>

                <div className='row mb-5'>
                    <div className='col-8 mb-2'>
                        <div className='card shadow'>
                            <div className="card-body">
                                <h5 className="card-title">Shipping Address</h5>
                                <hr />
                                <h6 className="card-subtitle mb-2 text-muted">Name: Osman Bey</h6>
                                <p>Phone: +9233333333333</p>
                                <p className="card-text">Address: Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='card shadow'>
                            <div className="card-body">
                                <h5 className="card-title">Total Summary</h5>
                                <hr />
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div>
                                        <p>Sub Total</p>
                                        <p>Delivery Fee</p>
                                        <p className='card-text'>Total</p>
                                    </div>
                                    <div>
                                        <p>Rs {totalAmount}</p>
                                        <p>Rs {deliveryCharge}</p>
                                        <p className='card-text text-success'>Rs {totalAmount + deliveryCharge}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className=' mx-3'>
                                    <p className='text-center'>Paid by Cash On Delivery</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewOrder