import React from 'react'
import { BsCart3 } from 'react-icons/bs';
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { HiOutlineUsers } from 'react-icons/hi'
// import DonutChart from 'react-donut-chart';
// import Doughnut from 'react-chartjs-2';
const List = () => {

    return (
        <>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-4'>
                        <div class="card shadow">
                            <div class="card-header d-flex justify-content-between">
                                <div className='mt-2'>
                                    <h6>Earnings</h6>
                                </div>

                                <div className='mt-2'>
                                    <h6><AiOutlineDollarCircle /></h6>
                                </div>
                            </div>
                            <div class="card-body">
                                <h4 class="card-title">$ 93,438.78</h4>
                                <p class="card-text">Monthly revenue.</p>

                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div class="card shadow">
                            <div class="card-header d-flex justify-content-between">
                                <div className='mt-2'>
                                    <h6>Orders</h6>
                                </div>

                                <div className='mt-2'>
                                    <h6><BsCart3 /></h6>
                                </div>
                            </div>
                            <div class="card-body">
                                <h4 class="card-title">42,339</h4>
                                <p class="card-text">Monthly revenue.</p>

                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div class="card shadow">
                            <div class="card-header d-flex justify-content-between">
                                <div className='mt-2'>
                                    <h6>Customer</h6>
                                </div>

                                <div className='mt-2'>
                                    <h6><HiOutlineUsers /></h6>
                                </div>
                            </div>
                            <div class="card-body">
                                <h4 class="card-title">39,354</h4>
                                <p class="card-text">30+new in 2 days.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='container mt-5 mx-5'>
                <div className='row'>
                    <div className='col-8'>

                    </div>
                    <div className='col-4'>
                        <div className="card text-center">
                            <div className="card-body">
                              
                            </div>
                        </div>

                    </div>
                </div>
            </div> */}
        </>
    )
}

export default List