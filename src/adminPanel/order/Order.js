import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useSelector } from 'react-redux';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import {BsEyeFill} from 'react-icons/bs';
import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { BASE_URL, ORDER_ENDPOINT } from '../../utlis/apiUrls';
import Head from '../head/Head';
import './order.css'

const Order = () => {
    const [orderDataList, setOrderDataList] = useState([])
    const userToken = useSelector(state => state.user.token);
    useEffect(() => {
        myOrderList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
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
            <Head/>
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
                                            {orderDataList && orderDataList?.map((item) => {
                                                return (
                                                    <tr key={item?.id}>
                                                        <td className="border-0 text-muted align-middle">{item?.order_number}</td>
                                                        <td className="border-0 text-muted align-middle">{moment(item?.created_at).format("MM-DD-YYYY")}</td>
                                                        <td className="border-0 text-muted align-middle">{item?.total_quantity}</td>
                                                        {item && item.status == "placed" ? <td className="border-0 text-success align-middle">{item?.status}</td> : 
                                                            <td className="border-0 text-danger align-middle">{item?.status}</td>}
                                                        <td className="border-0 text-muted align-middle">$ {item?.total_amount}</td>
                                                        <td className="border-0 text-danger align-middle"><BsEyeFill /> </td>
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