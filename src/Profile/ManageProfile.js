import React, { useState, useEffect } from 'react'
import './ManageProfile.css'
import { GiCrossMark } from 'react-icons/gi';
import { GrFacebookOption, GrInstagram, GrYoutube } from 'react-icons/gr'
import { MdAddLocationAlt, MdAddCall, MdMarkEmailUnread } from 'react-icons/md';
import { BsEyeFill } from 'react-icons/bs'
import { FaAddressCard, FaUserCircle, FaAddressBook } from 'react-icons/fa'
import { ImUser, ImLocation2 } from 'react-icons/im';
import { CgProfile } from 'react-icons/cg';
import { RiShoppingBag3Fill } from 'react-icons/ri'
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, ORDER_ENDPOINT, ADDRESS_REMOVE_ENDPOINT, ADDRESS_ADD_ENDPOINT, USER_LIST_ENDPOINT,API_VERSION } from '../utlis/apiUrls';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Scrollbars } from 'react-custom-scrollbars-2';
import moment from 'moment';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import { Button, Col, Form, Row, Modal, Badge } from 'react-bootstrap';
import ScrollToTop from "react-scroll-to-top";

const ManageProfile = () => {
    const user = useSelector(state => state.user);
    const userToken = useSelector(state => state.user.token);
    const [userData, setUserData] = useState({})
    const [phone_number, setPhone_number] = useState('')
    const [email_address, setEmail_address] = useState('')
    const [address, setAddress] = useState('')
    const [orderDataList, setOrderDataList] = useState([])
    const [show, setShow] = useState(false);

    console.log('==============================')
    const id = user.user.id
    console.log('user-id', id)
    console.log('==============================')
   
    useEffect(() => {
        userList()
        myOrderList()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const userList = async () => {
        let Api = `${API_VERSION()}${USER_LIST_ENDPOINT()}${id}/`
        let AddFavURL = BASE_URL + Api
        axios.get(AddFavURL, {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Token ${userToken}`
            }
        }).then((res) => {
            setUserData(res.data)
        }).catch(error => {
            console.log(error)
        })
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

    const handleDelete = async (AddressId) => {
        console.log('delete', AddressId)
        let removeAddressUrl = BASE_URL + API_VERSION() + USER_LIST_ENDPOINT() + ADDRESS_REMOVE_ENDPOINT()
        try {
            let res = await axios.post(removeAddressUrl, {
                address_id: AddressId,
            }, {
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Token ${userToken}`
                }
            })
            console.log(res.data)
            userList()
            toast.error(res.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });
        } catch (error) {
            console.log('delete error', error)
        }

    }

    const myOrderList = async () => {
        let finalURL = BASE_URL + API_VERSION() + ORDER_ENDPOINT()
       await axios.get(finalURL, {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Token ${userToken}`
            }
        }).then((res) => {
            console.log('orderList',res.data)
            setOrderDataList(res.data.results)
        }).catch(error => {
            console.log(error)
        })
    }

    const handleBadge = (state) => {
        if (state == 'completed') {
            /* eslint eqeqeq: 0 */
            return <Badge bg="success">
                completed
            </Badge>
        } else if (state == 'placed') {
            return <Badge bg="primary">
                placed
            </Badge>
        } else if (state == 'processed') {
            return <Badge bg="warning">
                processed
            </Badge>
        } else if (state == 'received') {
            return <Badge bg="info">
                received
            </Badge>
        } else if (state == 'canceled') {
            return <Badge bg="danger">
                canceled
            </Badge>
        }
        return ':'
    }

    return (
        <div>
            <Header />

            <Modal show={show} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
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

            <div className="container-fluid manage">
                <ToastContainer />
                <div className='container'>
                    <h3 className='text-center mb-3'>Hello, {user.user.username}</h3>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='card shadow'>
                                <div className="card-body mb-5">
                                    <h5 className="card-title"><CgProfile /> Personal Profile | <Link to='#' className='text-success' >Edit</Link> </h5>
                                    <hr className='mt-0' />
                                    <h6 className="card-subtitle mb-2 text-muted"><FaUserCircle /> Name: {user.user.username}</h6>
                                    <p className="card-subtitle mb-2"><MdMarkEmailUnread /> Email: {userData?.email}</p>
                                    <p className="card-subtitle"><ImUser /> FullName: {userData?.first_name} {userData?.last_name}</p>
                                </div>
                                <div className='d-flex justify-content-center mb-5'>
                                    <Button variant="outline-primary" className='me-1' size="sm">
                                        <GrFacebookOption />
                                    </Button>
                                    <Button variant="outline-warning" className='mx-1' size="sm">
                                        <GrInstagram />
                                    </Button>
                                    <Button variant="outline-danger" className='ms-1' size="sm">
                                        <GrYoutube />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className=' col-md-8'>
                            <div className="card controlCard shadow">
                                <div className='d-flex justify-content-between mx-3 my-2'>
                                    <h5 className='card-title mt-2'><FaAddressBook /> Address Book</h5>
                                    <Button variant="outline-success" size="sm" onClick={handleShowAdd}>
                                        Add Address <MdAddLocationAlt />
                                    </Button>
                                </div>
                                <Scrollbars thumbMinSize={30} >
                                    {userData.addresses?.map((item, index) => {
                                        return (
                                            <div className='card shadow-sm' key={item.id} >
                                                <div className="card-body">
                                                    <div className='d-flex justify-content-between'>
                                                        <div>
                                                            <p className='text-muted'><ImLocation2 /> Address # {index + 1}</p>
                                                        </div>
                                                        <div>
                                                            <Link to='#' className='text-danger' onClick={() => handleDelete(item.id)} ><GiCrossMark /></Link>
                                                        </div>
                                                    </div>
                                                    <hr className='mb-3 mt-0' />
                                                    <h6 className="card-subtitle mb-2 text-muted"><FaUserCircle /> Name: {userData.first_name} {userData.last_name}</h6>
                                                    <p className='card-subtitle mb-1'><MdAddCall /> Phone: {item?.phone_number}</p>
                                                    <p className='card-subtitle mb-1'><MdMarkEmailUnread /> Email: {item?.email_address}</p>
                                                    <p className="card-text"><FaAddressCard /> Address: {item?.address}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </Scrollbars>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='rounded bg-white shadow my-3'>
                                <div className='d-flex align-items-center justify-content-start mx-3'>
                                    <h5 className='text-success mt-4'>My Orders <RiShoppingBag3Fill /></h5>
                                </div>
                                <hr />
                                {/* Shopping cart table */}
                                <div className="table-responsive">
                                    <Scrollbars>
                                        <table className="table table-bordered table-hover mt-1 text-center">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="p-2 px-3 text-uppercase">Order #</div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="p-2 px-3 text-uppercase">Placed On</div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="py-2 text-uppercase">Quantity</div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="py-2 text-uppercase">Status</div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="py-2 text-uppercase">Price</div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="py-2 text-uppercase">Action</div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderDataList && orderDataList?.map((ite) => {
                                                    return (
                                                        <tr key={ite?.id}>
                                                            <td className="border-0 text-muted align-middle">{ite?.order_number}</td>
                                                            <td className="border-0 text-muted align-middle">{moment(ite?.created_at).format("MM-DD-YYYY")}</td>
                                                            <td className="border-0 text-muted align-middle">{ite?.total_quantity}</td>
                                                            <td className="border-0 text-muted align-middle">{handleBadge(ite?.status)}</td>
                                                            <td className="border-0 text-muted align-middle">$ {ite?.total_amount}</td>
                                                            <td className="border-0 align-middle"><NavLink to={`/productSuccess/${ite.id}`} className='text-success'><BsEyeFill /></NavLink> </td>
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
            <Footer />
            <ScrollToTop smooth />
        </div>
    )
}

export default ManageProfile
