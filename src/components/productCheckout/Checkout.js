import React, { useEffect } from 'react'
import './Checkout.css'
import { Link } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useDispatch,useSelector } from 'react-redux';
import { getCartTotal } from '../../store/cartSlice';


const Checkout = () => {
    // const totalPrice = CartItem.reduce((price, item) => price + item.qty * item.price, 0)
    const dispatch = useDispatch();
    const { data: products,totalItems, totalAmount, deliveryCharge } = useSelector(state => state.cart);
    useEffect(() => {
        dispatch(getCartTotal());
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [useSelector(state => state.cart)]);

    return (
        <div>
            <div className="container checkout-container mt-5">

                <div>
                    {/* Modal */}
                    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Information</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body">
                                    <form className="row g-3">
                                        <div className="col-md-6">
                                            <label htmlFor="inputName" className="form-label">FullName</label>
                                            <input type="name" className="form-control" id="inputName4" />
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="inputEmail4" className="form-label">Email</label>
                                            <input type="email" className="form-control" id="inputEmail4" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="inputPassword4" className="form-label">Password</label>
                                            <input type="password" className="form-control" id="inputPassword4" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="inputNumber4" className="form-label">Number</label>
                                            <input type="number" className="form-control" id="inputNumber4" />
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="inputAddress" className="form-label">Address</label>
                                            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="inputCity" className="form-label">City</label>
                                            <select id="inputCity" className="form-select">
                                                <option selected>Choose...</option>
                                                <option>Quetta</option>
                                                <option>Lahore</option>
                                                <option>Islamabad</option>
                                                <option>Peshawar</option>
                                                <option>Nushki</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="inputState" className="form-label">State</label>
                                            <select id="inputState" className="form-select">
                                                <option selected>Choose...</option>
                                                <option>Balochistan</option>
                                                <option>Punjab</option>
                                                <option>Fedral</option>
                                                <option>KPK</option>
                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="inputZip" className="form-label">Zip</label>
                                            <input type="text" className="form-control" id="inputZip" />
                                        </div>
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="gridCheck" />
                                                <label className="form-check-label" htmlFor="gridCheck">
                                                    Check me out
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button type="submit" className="btn btn-primary">Save</button>
                                        </div>
                                    </form>

                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <main>
                    <div className='row g-1'>
                        <div className='col-12 bg-white rounded p-5 mb-3 shadow'>
                            <div className='address-form '>
                                <button className='btn btn-success w-100' data-bs-toggle="modal" data-bs-target="#exampleModal">Add New Delivery Address</button>
                            </div>

                        </div>
                    </div>
                </main>

                <div className='row justify-content-center'>
                    <div className='col-7 bg-white rounded shadow me-3'>
                        <div className='checkout-product'>
                            <div className="table-responsive mt-2">
                                <Scrollbars>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="p-2 px-3 text-uppercase">Product</div>
                                                </th>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="py-2 text-uppercase">Price</div>
                                                </th>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="py-2 text-uppercase">Quantity</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((item) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <th scope="row" className="border-0">
                                                            <div className="p-2">
                                                                {/* <img src='https://res.cloudinary.com/dxfq3iotg/image/upload/v1565713229/single_4.jpg' alt='' width={80} className="img-fluid rounded shadow-sm" /> */}
                                                                <img src={item.images[0].image_url} alt='' width={80} className="img-fluid rounded shadow-sm" />
                                                                <div className="ms-3 ml-3 d-inline-block align-middle">
                                                                    <h5 className=""> <Link to="#" className="text-dark d-inline-block align-middle"></Link></h5><span className="text-muted font-weight-normal font-italic d-block">{item.title.substring(0,15)}</span>
                                                                </div>
                                                            </div>
                                                        </th>
                                                        <td className="border-0 align-middle"><strong>Rs {item.price}</strong></td>
                                                        <td className="border-0 align-middle"><strong>{item.qty}</strong></td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </Scrollbars>

                            </div>
                        </div>
                    </div>

                    <div className='col-4 bg-white rounded shadow'>
                        <div className='box-payment'>
                            <h4 className='mt-3'>Discount and Payment</h4>
                            <hr />
                            <div className='payment-order'>
                                <div className='payment-order-head'>
                                    <h3>Order Summery</h3>
                                </div>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div>
                                        <p>Items Total</p>
                                        <p>Delivery Fee</p>
                                        <p>Total Payment</p>
                                        <p className='text-success fw-bolder'>Total:</p>
                                    </div>
                                    <div>
                                        <p>{totalItems}</p>
                                        <p>Rs {deliveryCharge}</p>
                                        <p>Rs {totalAmount + deliveryCharge}</p>
                                        <p className='text-success fw-bolder'>Rs {totalAmount + deliveryCharge}</p>
                                    </div>
                                </div>

                                {/* <button className='btn btn-outline-warning w-100 my-3'>Place Order</button> */}
                                <Link to='/paymentM' className='btn btn-outline-success w-100 my-3'>Place Order</Link>
                            </div>

                        </div>
                    </div>
                </div>



            </div>

        </div>
    )
}

export default Checkout