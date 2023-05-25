import React, { useEffect, useState } from 'react'
import './Checkout.css'
import { Link, useNavigate } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useDispatch, useSelector } from 'react-redux';
import { getCartTotal, clearCart } from '../../store/cartSlice';
import axios from 'axios';
import { BASE_URL, ORDER_PLACED_ENDPOINT, ADDRESS_ADD_ENDPOINT, USER_LIST_ENDPOINT,ORDER_ENDPOINT,API_VERSION } from '../../utlis/apiUrls';
import { MdAddCall, MdMarkEmailUnread, MdAddLocationAlt } from 'react-icons/md';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { FaAddressCard, FaUserCircle } from 'react-icons/fa'
import { ImLocation2 } from 'react-icons/im';
import Header from '../../common/header/Header';
import Footer from '../../common/footer/Footer';
import { Button, Col, Form, Row, Modal } from 'react-bootstrap';
import ScrollToTop from 'react-scroll-to-top';

const Checkout = () => {

    const dispatch = useDispatch();
    const { data: products, totalItems, totalAmount } = useSelector(state => state.cart);
    const user = useSelector((state) => state.user)
    const userToken = useSelector(state => state.user.token);
    const [userData, setUserData] = useState({})
    const [selectedAddressPhone, setSelectedAddressPhone] = useState('')
    const [selectedAddressEmail, setSelectedAddressEmail] = useState('')
    const [selectedAddress, setSelectedAddress] = useState('')
    const [selectedAddressId, setSelectedAddressId] = useState('')
    const [phone_number, setPhone_number] = useState('')
    const [email_address, setEmail_address] = useState('')
    const [address, setAddress] = useState('')
    const [show, setShow] = useState(false);
    const [showAddressListModel, setShowAddressListModel] = useState(false);
    const navigate = useNavigate();

    const id = user.user.id

    useEffect(() => {
        dispatch(getCartTotal());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [useSelector(state => state.cart)]);

    useEffect(() => {
        userList()
    }, [])

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

    const handlePlaceOrder = async () => {
        let OrderURL = BASE_URL + API_VERSION() + ORDER_ENDPOINT() + ORDER_PLACED_ENDPOINT()
        console.log('newArray', placeOrder)
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
            })
            const data = await res.json();
            console.log('order-data', data);
            navigate(`/productSuccess/${data, data.id}`)
            dispatch(clearCart());
            return data;
        } catch (error) {
            console.log("Error-", error)
        }
    }

    const userList = async () => {
        let Api = `${API_VERSION()}${USER_LIST_ENDPOINT()}${id}/`
        let userURL = BASE_URL + Api
        axios.get(userURL, {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Token ${userToken}`
            }
        }).then((res) => {
            setUserData(res.data)
            setSelectedAddressPhone(res.data && res.data.addresses && res.data.addresses[0].phone_number)
            setSelectedAddressEmail(res.data && res.data.addresses && res.data.addresses[0].email_address)
            setSelectedAddress(res.data && res.data.addresses && res.data.addresses[0].address)
            setSelectedAddressId(res.data && res.data.addresses && res.data.addresses[0].id)
        }).catch(error => {
            console.log(error)
        })
    }

    const handleCloseShowAddressListModel = () => setShowAddressListModel(false);
    const handleShowShowAddressListModel = () => setShowAddressListModel(true);

    const handleSelectNewAddress = async (id, phone_number, email_address, address) => {
        try {
            setSelectedAddressPhone(phone_number)
            setSelectedAddressEmail(email_address)
            setSelectedAddress(address)
            setSelectedAddressId(id)
            toast.success('Selected New Address Successfully', {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });
            setShowAddressListModel(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCloseAdd = () => setShow(false);
    const handleShowAdd = () => setShow(true);

    const addAddress = async (e) => {
        e.preventDefault();
        let addAddressUrl = BASE_URL + API_VERSION() + USER_LIST_ENDPOINT() + ADDRESS_ADD_ENDPOINT()
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
            setShow(false)
            toast.success('new Address Added Successfully!', {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });
            setAddress('')
            setEmail_address('')
            setPhone_number('')
            userList()
        } catch (error) {
            console.log('add error', error)
            toast.error('Please Required These Fields', {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });
            setShow(true)
        }
    }

    const price = (p) => {
        if (p == 0) {
            return `-`
        } else {
            return p
        }
    }

    const total = (p) => {
        if (p == 0) {
            return `-`
        } else {
            return `${p}`
        }
    }

    return (
        <div>
            <Header />
            <ToastContainer />
            {/* Address List Model start */}
            <Modal
                size="lg"
                show={showAddressListModel}
                onHide={handleCloseShowAddressListModel}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className='text-success' >Select New Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                                                <div>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={handleShowAdd}>
                        Add New Delivery Address <MdAddLocationAlt />
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Address List Model End */}
            <div className="container checkout-container mt-5">
                <div>
                    {/* Add Address Modal Start */}
                    <Modal show={show} onHide={handleCloseAdd}>
                        <Modal.Header closeButton>
                            <Modal.Title className='text-success'>Add Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={addAddress} >
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="text" value={email_address} name='email_address' onChange={(e) => setEmail_address(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridPhone_number">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control type="number" value={phone_number} name='phone_number' onChange={(e) => setPhone_number(e.target.value)} />
                                    </Form.Group>
                                </Row>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlDescription1">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type='text' placeholder="1234 Main St" name='address' value={address} onChange={(e) => setAddress(e.target.value)} />
                                </Form.Group>
                                <Button variant="success"
                                    // onClick={handleCloseAdd} 
                                    type="submit">
                                    Save Address
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer className="modal-footer d-flex justify-content-center align-items-center">
                            <div>
                                <p>Thanks For Add New Address</p>
                            </div>
                        </Modal.Footer>
                    </Modal>
                     {/* Add Address Modal End */}
                </div>
                <main>
                    <div className='row g-1'>
                        <div className='col-12 bg-white rounded p-5 mb-3 shadow'>
                            <div className='card shadow'>
                                <div className="card-body mb-5">
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <h5 className="card-title"><ImLocation2 /> Address</h5>
                                        </div>
                                        <div className='mb-2'>
                                            <Button variant="outline-success" onClick={handleShowShowAddressListModel}>
                                                <MdAddLocationAlt /> Changes Address
                                            </Button>
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
                    <div className='col-12 sol-sm-12 col-md-7 bg-white rounded shadow me-3 mb-2'>
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
                                                                <img src={item.images[0].image_url} alt='' width={60} className="img-fluid rounded shadow" />
                                                                <div className="ms-3 ml-3 d-inline-block align-middle">
                                                                    <h5 className=""> <Link to="#" className="text-dark d-inline-block align-middle"></Link></h5><span className="text-muted font-weight-normal font-italic d-block">{item.title.substring(0, 15)}</span>
                                                                </div>
                                                            </div>
                                                        </th>
                                                        <td className="border-0 align-middle"><strong>
                                                            {price(item.price)}
                                                        </strong></td>
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
                    <div className='col-12 sol-sm-12 col-md-4 bg-white rounded shadow'>
                        <div className='box-payment'>
                            <h4 className='mt-3'>Discount and Payment</h4>
                            <hr />
                            <div className='payment-order'>
                                <div className='payment-order-head'>
                                    <h3>Order Summery</h3>
                                </div>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div>
                                        <p>Quantity</p>
                                        <p>Delivery</p>
                                        <p>Amount</p>
                                        <p className='text-success fw-bolder'>Total:</p>
                                    </div>
                                    <div className='mt-1 ms-1'>
                                        <p> {totalItems}</p>
                                        <p className='text-muted text-wrap'>Calculate by support after placing order </p>
                                        <p>$ {total(totalAmount)}</p>
                                        <p className='text-success fw-bolder'>$ {total(totalAmount)}</p>
                                    </div>
                                </div>
                                <button onClick={() => handlePlaceOrder()} className='btn btn-outline-success w-100 my-3'>Place Order</button>
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

export default Checkout