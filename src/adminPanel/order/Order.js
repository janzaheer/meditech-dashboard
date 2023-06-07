import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useSelector } from 'react-redux';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import { BsEyeFill, BsThreeDotsVertical } from 'react-icons/bs';
import { IoTrashBin, IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { GiReceiveMoney, GiBottomRight3DArrow } from 'react-icons/gi';
import { FcProcess } from 'react-icons/fc'
import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { BASE_URL, ORDER_ENDPOINT, ORDER_CANCEL,API_VERSION, USER_LIST_ENDPOINT } from '../../utlis/apiUrls';
import Head from '../head/Head';
import './order.css'
import {  NavLink } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Badge from 'react-bootstrap/Badge';

const Order = () => {
    const [orderDataList, setOrderDataList] = useState([])
    const [userData, setUserData] = useState({})
    const userToken = useSelector(state => state.user.token);
    const user = useSelector(state => state.user)
    const id = user.user.id
    useEffect(() => {
        userList()
        myOrderList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const userList = async () => {
        let Api = `${API_VERSION()}${USER_LIST_ENDPOINT()}${id}/`
        let AddFavURL = BASE_URL + Api
       await axios.get(AddFavURL, {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Token ${userToken}`
            }
        }).then((res) => {
             setUserData(res.data)
            console.log('00000000000000000000000000000000')
            console.log(res.data)
            console.log('11111111111111111111111111111111')
        }).catch(error => {
            console.log(error)
        })
    }
      
    const myOrderList = async () => {
        let finalURL = BASE_URL + API_VERSION() + ORDER_ENDPOINT()
        await axios.get(finalURL, {
             headers: {
                 'Content-Type': "application/json",
                 Authorization: `Token ${userToken}`
             }
         }).then((res) => {
             console.log('sellerorderList',res.data)
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

    const cancelOrder = async (id) => {
        console.log('order-cancel', id)
        let final = BASE_URL + API_VERSION() + ORDER_ENDPOINT() + ORDER_CANCEL(id)
        try {
            let res = await axios.post(final, {}, {
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Token ${userToken}`
                }
            })
            console.log(res.data)
            //   setOrderDataList(res.data)
            toast.error('Order Canceled Successfully', {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });
            myOrderList()
        } catch (error) {
            console.log('delete error', error)
        }
    }

    return (
        <div>
            <Head />
            <ToastContainer />
            <div className='container-fluid mt-5'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='rounded bg-white shadow my-3'>
                            <div className='d-flex align-items-center justify-content-start mx-3'>
                                <h5 className='text-success mt-4'>Orders List <RiShoppingBag3Fill /></h5>
                            </div>
                            <hr />
                            {/* Shopping cart table */}
                            <div className="table-responsive order-t">
                                <Scrollbars>
                                    <table className="table table-bordered table-hover mt-1 text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="p-2 px-3 text-uppercase">User</div>
                                                </th>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="p-2 px-3 text-uppercase">Order</div>
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
                                            {orderDataList && orderDataList?.map((item) => {
                                                return (
                                                    <tr key={item?.id}>
                                                        <td className="border-0 text-muted align-middle">{userData?.first_name} {userData?.last_name}</td>
                                                        <td className="border-0 text-muted align-middle">{item?.order_number}</td>
                                                        <td className="border-0 text-muted align-middle">{moment(item?.created_at).format("MM-DD-YYYY")}</td>
                                                        <td className="border-0 text-muted align-middle">{item?.total_quantity}</td>
                                                        <td className="border-0 text-muted align-middle">{handleBadge(item?.status)}</td>
                                                        <td className="border-0 text-muted align-middle">$ {item?.total_amount}</td>
                                                        <td className="border-0 text-danger align-middle"><div className="dropdown">
                                                            <a className="btn dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <BsThreeDotsVertical />
                                                            </a>
                                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                <li><a className="dropdown-item text-success" href="#"><IoCheckmarkDoneCircleSharp/> Completed</a></li>
                                                                <li><a className="dropdown-item text-info" href="#"><GiReceiveMoney/> Received</a></li>
                                                                <li><a className="dropdown-item text-primary" href="#"><GiBottomRight3DArrow/> Placed</a></li>
                                                                <li><a className="dropdown-item text-warning" href="#"><FcProcess/> Processed</a></li>
                                                                <li><a className="dropdown-item text-danger" onClick={() => cancelOrder(item?.id)} href="#"><IoTrashBin/> Canceled</a></li>
                                                                <li><NavLink to={`/productSuccess/${item.id}`} className='dropdown-item text-success'><BsEyeFill /> View</NavLink></li>
                                                            </ul>
                                                        </div></td>
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

export default Order