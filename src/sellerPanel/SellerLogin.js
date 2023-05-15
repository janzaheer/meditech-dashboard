import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import axios from "axios";
import { BASE_URL, SELLER_ENDPOINT } from '../utlis/apiUrls';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const SellerLogin = () => {

  const [seller_name, setSeller_name] = useState('')
  const [email, setEmail] = useState('')
  const [phone_num, setPhone_num] = useState('')
  const [company_name, setCompany_name] = useState('')

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
      console.log('seller',resp)
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
  }
  return (
    <div className=''>
       <ToastContainer />
      <Form onSubmit={addSeller} >
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridSeller_name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name='seller_name' placeholder='Enter your name' value={seller_name} onChange={(e)=>setSeller_name(e.target.value)} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>email</Form.Label>
            <Form.Control type="email" name='email' placeholder="abcd@gmail.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
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

        <Button variant="success"
          type="submit">
          save Seller
        </Button>
      </Form>
    </div>
  )
}

export default SellerLogin