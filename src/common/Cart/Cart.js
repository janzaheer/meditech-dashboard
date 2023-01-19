import React, { useEffect } from "react"
import "./style.css"
import { TbShoppingCartOff } from 'react-icons/tb'
import { BsTrash, BsMinecart, BsCartPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useSelector, useDispatch } from "react-redux";
import { remove, toggleCartQty, getCartTotal, clearCart } from "../../store/cartSlice";
import { formatPrice } from "../../utlis/helpers";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast} from 'react-toastify'

const Cart = () => {
  const dispatch = useDispatch();
  const { data: cartProducts, totalItems, totalAmount, deliveryCharge } = useSelector(state => state.cart);
  const user = useSelector(state => state.user);


  useEffect(() => {
    dispatch(getCartTotal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useSelector(state => state.cart)]);


  console.log('cart', cartProducts)
  console.log('user', window.localStorage.getItem('user'))
  console.log('user from state', user.token)
  // const emptyCartMsg = <h4 className='text-red fw-6'>No items found!</h4>;

  const handleRemove = (id) =>{
    dispatch(remove(id));
    toast.error("Product Remove successfully", {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
    });
  }

  const increase = (id) => {
    dispatch(toggleCartQty({ id:id, type: "INC" }));
    toast.success("Increase +1 Qty successfully", {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
    });
}
  const decrease = (id) => {
      dispatch(toggleCartQty({ id:id, type: "DEC" }));
      toast.warning("Decrease -1 Qty successfully", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
  }

  const clear = () => {
    dispatch(clearCart());
    toast.error("Clear Cart successfully", {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "colored",
    });

  }

  return (
    <>

      <div className="px-4 px-lg-0">
        {/* For demo purpose */}
        <div className="container top text-dark py-5 text-center mt-5">
          <h1 className="display-4">Shopping Cart</h1>
          <p className="lead mb-0">Build a fully structred shopping cart page using MediTech. </p>
          <p className="lead">Snippet by <a href="https://bootstrapious.com/snippets" className="text-success font-italic">
            <u>MediTech</u></a>
          </p>
        </div>
        {/* End */}
        <div className="pb-5">
          <div className="container">

            <div className="row">
              <div className="col-lg-12 p-5 bg-white rounded shadow mb-5">
                <ToastContainer/>
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
                            <div className="py-2 text-uppercase">Quantity</div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Add/Remove Qty</div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Remove</div>
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {cartProducts.length === 0 ? <h2 className='m-5 text-danger'>No Items are add in Cart</h2> : ''}

                        {cartProducts.map((cartProduct) => {
                          return (

                            <tr key={cartProduct.id} >
                              <th scope="row" className="border-0">
                                <div className="p-2">
                                  <img src={cartProduct.images[0].image_url} alt='' width={60} className="img-fluid rounded shadow-sm" />

                                  <div className="ms-3 ml-3 d-inline-block align-middle">
                                    <h6 className="mb-0"> <Link to="#" className="text-dark d-inline-block align-middle">{cartProduct.title.substring(0, 15)}...</Link>
                                    </h6><span className="text-muted font-weight-normal font-italic d-block"> Rs {cartProduct?.price}</span>
                                  </div>
                                </div>
                              </th>
                              <td className="border-0 align-middle"><strong>{cartProduct.totalPrice}</strong></td>
                              <td className="border-0 align-middle"><strong>{cartProduct.quantity}</strong></td>
                              <td className="border-0 align-middle"><strong>
                                <div className=''>
                                  {/* <button className='btn btn-outline-success me-4' onClick={() => dispatch(toggleCartQty({ id: cartProduct.id, type: "INC" }))}> */}
                                  <button className='btn btn-outline-success me-4' onClick={() => increase(cartProduct.id)}>
                                    <BsCartPlus />
                                  </button>
                                  {/* <button className='btn btn-outline-warning' onClick={() => dispatch(toggleCartQty({ id: cartProduct.id, type: "DEC" }))}> */}
                                  <button className='btn btn-outline-warning' onClick={() => decrease(cartProduct.id)}>
                                    <BsMinecart />
                                  </button>
                                </div>
                              </strong></td>
                              <td className="border-0 align-middle">
                                {/* <button className='btn btn-outline-danger' onClick={() => dispatch(remove(cartProduct.id))}> */}
                                <button className='btn btn-outline-danger' onClick={() => handleRemove(cartProduct.id)}>
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
              {/* <button type="button" className='btn btn-danger mb-5 shadow' onClick={() => dispatch(clearCart())}> Clear Cart <TbShoppingCartOff /></button> */}
              <button type="button" className='btn btn-danger mb-5 shadow' onClick={() => clear()}> Clear Cart <TbShoppingCartOff /></button>
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
                    {/* <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Order Subtotal </strong><strong>Rs 390.00</strong></li> */}
                    <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Delivery Cost</strong><strong>Rs {deliveryCharge}</strong></li>
                    <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Discount</strong><strong>{formatPrice(0)}</strong></li>
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






    </>
  )
}

export default Cart
