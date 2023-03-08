import React from 'react'

const Dem = () => {
  return (
    <div>
        <div className="px-4 px-lg-0">
        {/* For demo purpose */}
        <div className="container top text-dark py-5 text-center mt-5">
          <h1 className="display-4">Shopping Cart</h1>
          <p className="lead mb-0">Cosmedicos. </p>
          <p className="lead">Snippet by <a href="https://bootstrapious.com/snippets" className="text-success font-italic">
            <u>Cosmedicos</u></a>
          </p>
        </div>
        {/* End */}
        <div className="pb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 p-5 bg-white rounded shadow mb-5">

                <div className="table-responsive">
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
                            <div className="py-2 text-uppercase">Quantity Price</div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Add Quantity</div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Remove</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>

                        {/* {cartProducts.length === 0 && <h2 className='mt-3 text-danger'>No Items are add in Cart</h2>} */}
                        {cartProducts.map((cartProduct) => {
                          const productQty = cartProduct.price + cartProduct.quantity * cartProduct.price
                            // const productQty = cartProduct.reduce((price, item) => price + item.qty * item.price, 0)

                          return (
                            <tr key={cartProduct.id} >
                              <th scope="row" className="border-0">
                                <div className="p-2">
                                  <img src={cartProduct.image} alt='' width={60} className="img-fluid rounded shadow-sm" />

                                  <div className="ms-3 ml-3 d-inline-block align-middle">
                                    <h6 className="mb-0"> <Link to="#" className="text-dark d-inline-block align-middle">{cartProduct.title.substring(0,15)}...</Link>
                                    </h6><span className="text-muted font-weight-normal font-italic d-block"> Rs {cartProduct.price}--{productQty}</span>       
                                  </div>
                                </div>
                              </th>
                              <td className="border-0 align-middle"><strong>Rs {cartProduct.price}</strong></td>
                              <td className="border-0 align-middle"><strong>-{cartProduct.quantity }-</strong></td>
                              <td className="border-0 align-middle"><strong>
                                <div className=''>
                                  <button className='btn btn-outline-success me-4' onClick={() => dispatch(toggleCartQty({ id: cartProduct.id, type: "INC" }))}>
                                    <AiOutlinePlusCircle />
                                  </button>
                                  <button className='btn btn-outline-warning' onClick={() => dispatch(toggleCartQty({ id: cartProduct.id, type: "DEC" }))}>
                                    <BiMinusCircle />
                                  </button>
                                </div>
                              </strong></td>
                              <td className="border-0 align-middle">
                                <button className='btn btn-outline-danger' onClick={() => dispatch(remove(cartProduct.id))}>
                                  <BsTrash />
                                </button>
                              </td>
                            </tr>
                          )
                        })}

                      </tbody>

                    </table>
                  </Scrollbars>

                </div>
                {/* End */}
              </div>
              <button type="button" className='btn btn-danger mb-5 shadow' onClick={() => dispatch(clearCart())}> Clear Cart</button>
            </div>
            <div className="row py-5 p-4 bg-white rounded shadow">
              <div className="col-lg-6">
                <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Coupon code</div>
                <div className="p-4">
                  <p className="font-italic mb-4">If you have a coupon code, please enter it in the box below</p>
                  <div className="input-group mb-4 border rounded-pill p-2">
                    <input type="text" placeholder="Apply coupon" aria-describedby="button-addon3" className="form-control border-0" />
                    <div className="input-group-append border-0">
                      <button type="button" className="btn btn-warning"><i className="fa fa-gift me-2" />Apply coupon</button>
                    </div>
                  </div>
                </div>
                <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Instructions for seller</div>
                <div className="p-4">
                  <p className="font-italic mb-4">If you have some information for the seller you can leave them in the box below</p>
                  <textarea name='name' cols={30} rows={2} className="form-control" defaultValue={""} />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
                <div className="p-4">
                  <p className="font-italic mb-4">Shipping and additional costs are calculated based on values you have entered.</p>
                  <ul className="list-unstyled mb-4">
                  <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Selected {totalItems} items(s) Price</strong><strong>Rs {totalAmount}</strong></li>
                    <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Order Subtotal </strong><strong>Rs 390.00</strong></li>
                    <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Delivery Cost</strong><strong>Rs {deliveryCharge}</strong></li>
                    <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Tax</strong><strong>Rs {totalItems} 0.00</strong></li>
                    <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total</strong>
                      <h5 className="font-weight-bold">Rs {totalAmount + deliveryCharge} </h5>
                    </li>
                  </ul>              
                  <Link to='/checkout' className="btn btn-success">Proceed to Checkout</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dem