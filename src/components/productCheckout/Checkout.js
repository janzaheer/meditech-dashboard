import React, { useEffect, useState } from 'react'
import './Checkout.css'
import { Link, useNavigate } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useDispatch, useSelector } from 'react-redux';
import { getCartTotal, clearCart } from '../../store/cartSlice';
import axios from 'axios';
import { BASE_URL, ORDER_PLACED_ENDPOINT } from '../../utlis/apiUrls';
import { MdAddCall, MdMarkEmailUnread } from 'react-icons/md';
// import AddressEdit from './AddressEdit'
import { FaAddressCard, FaUserCircle } from 'react-icons/fa'
import { ImLocation2 } from 'react-icons/im';
import Header from '../../common/header/Header';
import Footer from '../../common/footer/Footer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Checkout = () => {
    // const totalPrice = CartItem.reduce((price, item) => price + item.qty * item.price, 0)
    const dispatch = useDispatch();
    const { data: products, totalItems, totalAmount } = useSelector(state => state.cart);
    const user = useSelector((state) => state.user)
    const userToken = useSelector(state => state.user.token);
    const [userData, setUserData] = useState({})
    const [selectedAddressPhone, setSelectedAddressPhone] = useState('')
    const [selectedAddressEmail, setSelectedAddressEmail] = useState('')
    const [selectedAddress, setSelectedAddress] = useState('')
    const [selectedAddressId, setSelectedAddressId] = useState('')
    // const [orderList, setOrderList] = useState({})
    const [phone_number, setPhone_number] = useState('')
    const [email_address, setEmail_address] = useState('')
    const [address, setAddress] = useState('')
    const navigate = useNavigate();
    // console.log('addressId', selectedAddressId)

    const id = user.user.id
    // console.log('user-id', id)


    // Creating a JS object to add array into

    // Array to be inserted
    var placeOrder = { total_amount: totalAmount, total_quantity: totalItems, address_id: selectedAddressId, items: [] };
    let my_total_quantity = 0;
    products.forEach(element => {
        let data = {
            'item_id': element.id,
            'quantity': element.quantity,
            'amount': element.price
        }
        my_total_quantity += element.quantity;
        placeOrder['items'].push(data)
    });
    placeOrder['total_quantity'] = my_total_quantity

    // console.log('placeOrder', placeOrder);


    const handlePlaceOrder = async () => {
        console.log('order-clicked')
        let OrderURL = BASE_URL + ORDER_PLACED_ENDPOINT
        console.log('--------------------------atif---------------------')
        console.log(JSON.stringify(placeOrder))
        try {
            const res = await fetch(OrderURL, {
                method: "post",
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json",
                    Authorization: `Token ${userToken}`,
                },
                body: JSON.stringify(
                    placeOrder,
                ),
                // body: JSON.stringify(body)
            })
            const data = await res.json();

            // setOrderList(data, data.id)
            console.log('order-data', data);
            console.log('oderId', data, data.id);
            navigate(`/productSuccess/${data, data.id}`);
            dispatch(clearCart());
            // console.log('order-id', data);
            return data;
        } catch (error) {
            console.log("Error-", error)
        }

    }

    // console.log('oderLIst-ID', orderList)




    useEffect(() => {
        dispatch(getCartTotal());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [useSelector(state => state.cart)]);


    useEffect(() => {
        userList()
    }, [])
    const userList = async () => {
        console.log('---------------------11------ ------')
        let Api = `/api/v1/user/${id}/`
        let AddFavURL = BASE_URL + Api

        axios.get(AddFavURL, {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Token ${userToken}`
            }
        }).then((res) => {
            // console.log(res.data)
            setUserData(res.data)
            setSelectedAddressPhone(res.data && res.data.addresses && res.data.addresses[0].phone_number)
            setSelectedAddressEmail(res.data && res.data.addresses && res.data.addresses[0].email_address)
            setSelectedAddress(res.data && res.data.addresses && res.data.addresses[0].address)
            setSelectedAddressId(res.data && res.data.addresses && res.data.addresses[0].id)
            console.log('----------------------123-----------------123--------------')

        }).catch(error => {
            console.log(error)
        })
    }

    const handleSelectNewAddress = async (id, phone_number, email_address, address) => {
        console.log({ id, phone_number, email_address, address })
        try {
            setSelectedAddressPhone(phone_number)
            setSelectedAddressEmail(email_address)
            setSelectedAddress(address)
            setSelectedAddressId(id)
            toast.success(`New Address ${id} Selected Successfully`,{
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });
        } catch (error) {
            console.log(error)
        }

    }

    const addAddress = async (e) => {
        e.preventDefault();
        let Api = `api/v1/user/add_address/`
        let addAddressUrl = BASE_URL + Api
        try {
            let res = await axios.post(addAddressUrl, {
                phone_number: phone_number,
                email_address: email_address,
                address: address,
            }, {
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Token ${userToken}`
                }
            })
            console.log(res.data)
            userList()
            toast.success('New Address Added Successfully',{
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });
        } catch (error) {
            console.log('add error', error)
        }
        setAddress('')
        setEmail_address('')
        setPhone_number('')
    }


    return (
        <div>
            <ToastContainer/>
            <Header />
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                {userData.addresses?.map((item, index) => {
                                    return (
                                        <div className='col-6' key={item.id}>
                                            <div className='card shadow-sm my-2'  >
                                                <div className="card-body product" onClick={() => handleSelectNewAddress(item.id, item?.phone_number, item?.email_address, item?.address)}>
                                                    <div className='d-flex justify-content-between'>
                                                        <div>
                                                            <p className='text-muted'><ImLocation2 /> Address # {index + 1}</p>
                                                        </div>
                                                    </div>
                                                    <hr className='mb-3 mt-0' />
                                                    <h6 className="card-subtitle mb-2 text-muted"><FaUserCircle /> Name: {userData.first_name} {userData.last_name}</h6>
                                                    <p className='card-subtitle mb-1'><MdAddCall /> Phone: {item?.phone_number}</p>
                                                    <p className='card-subtitle mb-1'><MdMarkEmailUnread /> Email: {item?.email_address}</p>
                                                    <p className="card-text"><FaAddressCard /> Address: {item?.address}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className='address-form '>
                                <button className='btn btn-success w-100' data-bs-toggle="modal" data-bs-target="#exampleModal">Add New Delivery Address</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                                    <form className="row g-3" onSubmit={addAddress}>
                                        <div className="col-md-6">
                                            <label htmlFor="inputEmail4" className="form-label">Email</label>
                                            <input type="email" className="form-control" id="inputEmail4" value={email_address}
                                                name='email_address' onChange={(e) => setEmail_address(e.target.value)} />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="inputPhone4" className="form-label">Phone</label>
                                            <input type="number" className="form-control" id="inputPhone4" value={phone_number}
                                                name='phone_number' onChange={(e) => setPhone_number(e.target.value)} />
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="inputAddress" className="form-label">Address</label>
                                            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"
                                                name='address' value={address} onChange={(e) => setAddress(e.target.value)} />
                                        </div>
                                        <div className="col-12">
                                            <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Add Address</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <main>
                    <div className='row g-1'>
                        <div className='col-12 bg-white rounded p-5 mb-3 shadow'>
                            {/* <div className='address-form '>
                                <button className='btn btn-success w-100' data-bs-toggle="modal" data-bs-target="#exampleModal">Add New Delivery Address</button>
                            </div> */}

                            <div className='card shadow'>

                                <div className="card-body mb-5">
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <h5 className="card-title">Address</h5>
                                        </div>
                                        <div className='mb-2'>
                                            <button type="button" className="btn btn-outline-success btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                                Changes Address </button>
                                        </div>
                                    </div>

                                    <hr className='mt-0' />
                                    <h6 className="card-subtitle mb-2 text-muted" >Name: {user.user.username}</h6>
                                    <h6 className="card-subtitle mb-2 text-muted"> FullName: {userData?.first_name} {userData?.last_name}</h6>
                                    <p className='card-subtitle mb-1'> Phone: {selectedAddressPhone}</p>
                                    <p className='card-subtitle mb-1'> Email: {selectedAddressEmail}</p>
                                    <p className="card-text">Address: {selectedAddress}</p>
                                </div>

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
                                                                <img src={item.images[0].image_url} alt='' width={60} className="img-fluid rounded shadow-sm" />
                                                                <div className="ms-3 ml-3 d-inline-block align-middle">
                                                                    <h5 className=""> <Link to="#" className="text-dark d-inline-block align-middle"></Link></h5><span className="text-muted font-weight-normal font-italic d-block">{item.title.substring(0, 15)}</span>
                                                                </div>
                                                            </div>
                                                        </th>
                                                        <td className="border-0 align-middle"><strong>{item.price}</strong></td>
                                                        <td className="border-0 align-middle"><strong>{item.quantity}</strong></td>
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
                                        <p>$ {totalItems}</p>
                                        <p>$ {(0)}</p>
                                        <p>$ {totalAmount}</p>
                                        <p className='text-success fw-bolder'>$ {totalAmount}</p>
                                    </div>
                                </div>

                                {/* <button className='btn btn-outline-warning w-100 my-3'>Place Order</button> */}
                                {/* <Link to='/paymentM' className='btn btn-outline-success w-100 my-3'>Place Order</Link> */}
                                <button onClick={() => handlePlaceOrder()} className='btn btn-outline-success w-100 my-3'>Place Order</button>
                            </div>

                        </div>
                    </div>
                </div>



            </div>
            <Footer/>
        </div>
    )
}

export default Checkout