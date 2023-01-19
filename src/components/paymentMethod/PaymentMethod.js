import React from 'react'
import './PaymentMethod.css';
import easyPaisa from '../assets/payment/Easypaisa.png';
import jazzCash from '../assets/payment/JazzCash.png';
// import {BsFillCreditCardFill, BsCashStack} from 'react-icons/bs'
import { Link } from 'react-router-dom';
import cash from '../assets/payment/cash.png';
import caard from '../assets/payment/caard2.png';

const PaymentMethod = () => {
    return (
        <div>
            <div className='container payment-method mt-5 w-50'>
                <div className='payment-box p-5 bg-white rounded shadow'>
                    <h3 className='mb-3'>Select Payment Method Please</h3>
                    <div>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
                                    {/* <BsCashStack style={{ width: '40px',height: '40px'}} /> */}
                                    <img src={cash} alt="cash" width={55} />
                                    </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false"><img src={easyPaisa} alt='' width={45} className="img-fluid rounded shadow-sm" /></button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false"><img src={jazzCash} alt='' width={55} className="img-fluid rounded shadow-sm" /></button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="disabled-tab" data-bs-toggle="tab" data-bs-target="#disabled-tab-pane" type="button" role="tab" aria-controls="disabled-tab-pane" aria-selected="false">
                                    {/* <BsFillCreditCardFill style={{ width: '40px',height: '40px'}} /> */}
                                    <img src={caard} alt="caard" width={55} />
                                    </button>
                            </li>
                        </ul>
                        <div className="tab-content mt-4" id="myTabContent">
                            <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}><p>You can pay cash  to your courier when you received the good at your doorstep.</p>
                            {/* <button className='btn btn-outline-warning w-20'>Confirm Order</button> */}
                            <Link to='/productSuccess' className='btn btn-outline-success'>Confirm Order</Link>
                            </div>
                            <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, magni!</p>
                            {/* <button className='btn btn-outline-warning w-20'>Confirm Order</button> */}
                            <Link to='/productSuccess' className='btn btn-outline-success'>Confirm Order</Link>
                            </div>
                            <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex={0}><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur provident dolor animi.</p>
                            {/* <button className='btn btn-outline-warning w-20'>Confirm Order</button> */}
                            <Link to='/productSuccess' className='btn btn-outline-success'>Confirm Order</Link>
                            </div>
                            <div className="tab-pane fade" id="disabled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab" tabIndex={0}><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, cupiditate!</p>
                            {/* <button className='btn btn-outline-warning w-20'>Confirm Order</button> */}
                            <Link to='/productSuccess' className='btn btn-outline-success'>Confirm Order</Link>
                            </div>
                            
                        </div>
                        
                    </div>

                </div>

            </div>




        </div>
    )
}

export default PaymentMethod