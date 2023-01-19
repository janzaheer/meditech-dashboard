import React,{useEffect} from 'react'
import './MyOrder.css'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useDispatch,useSelector } from 'react-redux';
import { getCartTotal } from '../../store/cartSlice';

const MyOrder = () => {
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
                                    <p className='mt-3 me-1'>Rs </p><p className='text-success mt-3'>{totalAmount + deliveryCharge}</p>
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
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="py-2 text-uppercase">Progress</div>
                                                </th>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="py-2 text-uppercase">Date</div>
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody>

                                            {products.map((item) => {
                                                const productQty = item.qty

                                                return (
                                                    <tr key={item.id}>
                                                        <th scope="row" className="border-0">
                                                            <div className="p-2">
                                                                <img src={item.images[0].image_url} alt='' width={70} className="img-fluid rounded shadow-sm" />
                                                            </div>
                                                        </th>
                                                        <td className="border-0 align-middle"><strong>{item.title}</strong></td>
                                                        <td className="border-0 align-middle"><strong>{item.quantity}</strong></td>
                                                        <td className="border-0 align-middle"><div className="process-text rounded text-center bg-success">Processing</div>  </td>
                                                        <td className="border-0 align-middle"><strong>12/15/2022</strong></td>
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
            </div>
        </div>
    )
}

export default MyOrder