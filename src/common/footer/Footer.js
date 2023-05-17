import React, { useState } from "react"
import "./style.css"
import { Button, Col, Form, Row, Modal } from 'react-bootstrap';
import axios from "axios";
import { BASE_URL, SELLER_ENDPOINT } from "../../utlis/apiUrls";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { BsTelephonePlusFill } from 'react-icons/bs';
import { MdAttachEmail } from 'react-icons/md';
import { ImLocation2 } from 'react-icons/im'

const Footer = () => {

  const [show, setShow] = useState(false);
  const [seller_name, setSeller_name] = useState('')
  const [email, setEmail] = useState('')
  const [phone_num, setPhone_num] = useState('')
  const [company_name, setCompany_name] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addSeller = async (e) => {
    e.preventDefault();
    let final = BASE_URL + SELLER_ENDPOINT
    await axios.post(final, {
      seller_name: seller_name,
      email: email,
      phone_num: phone_num,
      company_name: company_name
    }, {
      headers: {
        'Content-Type': "application/json"
      }
    }).then((resp) => {
      console.log('seller', resp)
      toast.success(resp.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    }).catch(resp => {
      console.log(resp)

    })
    setSeller_name('')
    setEmail('')
    setPhone_num('')
    setCompany_name('')
    setShow(false)
  }

  return (
    <>
      <ToastContainer />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
              <h4 className="text-success">Seller Register Here</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addSeller} >
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridSeller_name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name='seller_name' placeholder='Enter your name' value={seller_name} onChange={(e) => setSeller_name(e.target.value)} />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>email</Form.Label>
                <Form.Control type="email" name='email' placeholder="abcd@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPhone_num">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="number" name='phone_num' placeholder="enter your number" value={phone_num} onChange={(e) => setPhone_num(e.target.value)} />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridStore">
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" name='company_name' placeholder="enter your company name" value={company_name} onChange={(e) => setCompany_name(e.target.value)} />
              </Form.Group>
            </Row>
            <div className="d-flex justify-content-end">
              <Button variant="success"
                type="submit">
                Register Seller
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <footer className="px-5 py-5 text-white footer">
        <div className="container-fluid" style={{ display: "" }}>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 d-flex justify-content-evenly">
            <div className="col mb-3">
              <div className='box'>
                <h1 className="mb-3">Cosmedicos</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus.</p>
                <div className='d-flex justify-content-start'>
                  <div>
                    <button className="btn btn-outline-light btn-sm me-1" ><i className='fa-brands fa-google-play'></i> Google Play</button>
                  </div>
                  <div>
                    <button className="btn btn-outline-light btn-sm" ><i className='fa-brands fa-app-store-ios'></i> App Store</button>
                  </div>
                </div>

              </div>
            </div>
            <div className="col mb-3">
              <div className='box'>
                <h3 className="mb-3" >Make Money With Us</h3>
                <ul className="">
                  <li><Button variant="danger" size="lg" onClick={handleShow}>
                    Sell on Cosmedicos
                  </Button></li>
                </ul>
              </div>
            </div>
            <div className="col mb-3">
              <div className='box'>
                <h3 className="mb-3">About Us</h3>
                <ul className="">
                  <li>Careers</li>
                  <li>Our Stores</li>
                  <li>Our Cares</li>
                  <li>Terms & Conditions</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
            </div>
            <div className="col mb-3">
              <div className='box'>
                <h3 className="mb-3">Contact Us</h3>
                <ul>
                  {/* <li><NavLink className='text-white' to='#'>Contact us</NavLink></li> */}
                  <li><ImLocation2 /> Plot 5-A, Near HBL Bank, F-6 Markaz, Islamabad </li>
                  <li><MdAttachEmail /> cosmedicosofficial@gmail.com</li>
                  <li><BsTelephonePlusFill /> +92 317 8012324</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
