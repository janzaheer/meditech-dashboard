import React, { useState, useEffect } from 'react'
import './ManageProfile.css'
import { GiCrossMark } from 'react-icons/gi';
import { MdAddLocationAlt, MdAddCall, MdMarkEmailUnread } from 'react-icons/md';
import { BsEyeFill } from 'react-icons/bs'
import { FaAddressCard, FaUserCircle, FaAddressBook } from 'react-icons/fa'
import { ImUser, ImLocation2 } from 'react-icons/im';
import { CgProfile } from 'react-icons/cg';
import { RiShoppingBag3Fill } from 'react-icons/ri'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, ORDER_ENDPOINT } from '../utlis/apiUrls';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { getCartTotal } from '../store/cartSlice';
import moment from 'moment';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';

const ManageProfile = () => {
    const user = useSelector(state => state.user);
    const userToken = useSelector(state => state.user.token);
    const [userData, setUserData] = useState({})
    const [phone_number, setPhone_number] = useState('')
    const [email_address, setEmail_address] = useState('')
    const [address, setAddress] = useState('')
    const [orderDataList, setOrderDataList] = useState([])
    const navigation = useNavigate()
    const id = user.user.id
    console.log('user-id', id)


    const dispatch = useDispatch();
    const { data: product, totalAmount } = useSelector(state => state.cart);

    useEffect(() => {
        dispatch(getCartTotal())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [useSelector(state => state.cart)])
    useEffect(() => {
        userList()
        myOrderList()
    }, [])
    const userList = async () => {
        console.log('---------------------11------------')
        let Api = `/api/v1/user/${id}/`
        let AddFavURL = BASE_URL + Api

        axios.get(AddFavURL, {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Token ${userToken}`
            }
        }).then((res) => {
            //  console.log(res.data)
            setUserData(res.data)

        }).catch(error => {
            console.log(error)
        })
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

        } catch (error) {
            console.log('add error', error)
        }
        setAddress('')
        setEmail_address('')
        setPhone_number('')
    }

    const handleDelete = async (AddressId) => {
        console.log('delete', AddressId)
        let Api = `api/v1/user/remove_address/`
        let removeAddressUrl = BASE_URL + Api
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
        console.log('---------------------11------ ------')
        let Api = `${ORDER_ENDPOINT}`
        let finalURL = BASE_URL + Api

        axios.get(finalURL, {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Token ${userToken}`
            }
        }).then((res) => {
            console.log('orderListData-here', res.data)
            setOrderDataList(res.data.results)
            console.log('----------------------123-----------------123--------------')

        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            <Header />
            <div>

                {/* Modal */}
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                {/* <AddressEdit /> */}
                                .............................


                            </div>
                            {/* <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Understood</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Address Book</h1>
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
                                    <button type="submit" className="btn btn-primary">Add Address</button>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button> */}
                        </div>
                    </div>
                </div>
            </div>

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
                                    <p className='card-text mb-3 text-success'>Subscribe to our Newsletter</p>
                                </div>
                            </div>
                        </div>
                        <div className=' col-md-8'>
                            <div className="card controlCard shadow">
                                <div className='d-flex justify-content-between mx-3 my-2'>
                                    <h5 className='card-title mt-2'><FaAddressBook /> Address Book</h5>
                                    {/* <button type="button" className="btn btn-outline-success btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                            Add Address <MdAddLocationAlt /></button> */}
                                    <button type="button" className="btn btn-outline-success btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Add Address <MdAddLocationAlt /></button>
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
                                                            {ite && ite.status == "placed" ? <td className="border-0 text-success align-middle">{ite?.status}</td> : 
                                                            <td className="border-0 text-danger align-middle">{ite?.status}</td>}
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
            <Footer/>
        </div>
    )
}

export default ManageProfile