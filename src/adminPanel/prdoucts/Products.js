import React, { useState, useEffect } from 'react'
import Head from '../head/Head'
import { BASE_URL, END_POINT, CATEGORY_ENDPOINT, ADD_PRODUCT_ENDPOINT } from '../../utlis/apiUrls';
import { useSelector } from 'react-redux';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaEye, FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { IoAddCircle } from 'react-icons/io5';
import moment from 'moment';
import axios from "axios";
import { Scrollbars } from 'react-custom-scrollbars-2';
import './product.css'
import { Link } from 'react-router-dom';
import { Button, Col, Form, Row, Modal } from 'react-bootstrap';
import { uploadFile } from 'react-s3';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

window.Buffer = window.Buffer || require("buffer").Buffer;


const config = {
  bucketName: 'meditech-products',
  // dirName: 'media', /* optional */
  region: 'ap-northeast-1',
  accessKeyId: 'AKIA2GGOXYXVLH3IFC6Z',
  secretAccessKey: 'O5tH4MRcue/LPGfiZg5xdhMdIuL7GfLqqiFHc9YD',
  // s3Url: 'https:/your-custom-s3-url.com/', /* optional */
}

const Products = () => {

  const [products, setProducts] = useState([])
  const userToken = useSelector(state => state.user.token);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [store, setStore] = useState('');
  const [categoriesData, setCategoriesData] = useState('')
  const [categoriesDataSelect, setCategoriesDataSelect] = useState('')
  const [selectImage, setSelectImage] = useState('')
  const [selectImage2, setSelectImage2] = useState('')
  const [selectImage3, setSelectImage3] = useState('')
  const [selectImage4, setSelectImage4] = useState('')
  const [showAdd, setShowAdd] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    productList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    categoryData()
  }, [])

  const productList = async () => {
    let final = BASE_URL + END_POINT
    return await axios.get(final, {
      headers: {
        'Content-Type': "application/json"
      }
    })
      .then((res) => {
        setProducts(res.data.results)
      })
      .catch((err) => console.log(err))
  }

  const deleteProduct = async (id) => {
    console.log('delete-id', id)
    let end = `${END_POINT}${id}/`
    let final = BASE_URL + end
    try {
      let res = await axios.delete(final, {
        headers: {
          'Content-Type': "application/json",
          Authorization: `Token ${userToken}`
        }
      })
      console.log(res.data)
      productList()
      toast.error('Product Delete Successfully', {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    } catch (error) {
      console.log('delete error', error)
    }
  }


  // 1st image function
  const uploadImage = async (e) => {
    e.preventDefault();
    // let image_urls = []
    const myFiles = e.target.files[0]
    await uploadFile(myFiles, config)
      .then((data) => {
        setSelectImage(data.location)
      })
      .catch(err => console.error(err))
  }
  console.log('here', selectImage)

  // 2nd image function
  const uploadImage2 = async (e) => {
    e.preventDefault();
    // let image_urls = []
    const myFiles = e.target.files[0]
    await uploadFile(myFiles, config)
      .then((data) => {
        setSelectImage2(data.location)
      })
      .catch(err => console.error(err))
  }
  console.log('here-2', selectImage2)

  // 3rd image function
  const uploadImage3 = async (e) => {
    e.preventDefault();
    // let image_urls = []
    const myFiles = e.target.files[0]
    await uploadFile(myFiles, config)
      .then((data) => {
        setSelectImage3(data.location)
      })
      .catch(err => console.error(err))
  }
  console.log('here-3', selectImage3)

  // 4th image function
  const uploadImage4 = async (e) => {
    e.preventDefault();
    // let image_urls = []
    const myFiles = e.target.files[0]
    await uploadFile(myFiles, config)
      .then((data) => {
        setSelectImage4(data.location)
      })
      .catch(err => console.error(err))
  }
  console.log('here-4', selectImage4)


  const addProducts = async (e) => {
    console.log('------------------add-----------------')
    e.preventDefault();
    // let api = 'api/v1/items/create_item/'
    let FInal = BASE_URL + END_POINT + ADD_PRODUCT_ENDPOINT

    let imageData = [selectImage]
    if (selectImage2) {
      imageData.push(selectImage2)
    }
    if (selectImage3) {
      imageData.push(selectImage3)
    }
    if (selectImage4) {
      imageData.push(selectImage4)
    }

    await axios.post(FInal, {
      title: title,
      description: description,
      images: imageData,
      category_id: categoriesDataSelect,
      price: price,
      brand: brand,
      store: store,
      specification: null  // str
    }, {
      headers: {
        'Content-Type': "application/json",
        Authorization: `Token ${userToken}`
      }
    }).then((resp) => {
      console.log(resp.ok)

      setShowAdd(false)
      toast.success('Product Add Successfully', {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
      setTitle('')
      setDescription('')
      setSelectImage('')
      setBrand('')
      setPrice('')
      setStore('')
      setCategoriesDataSelect('')
      console.log('-----------------11-------------------')
    }).catch(resp => {
      console.log('------------------------catch-------------------')
      setShowAdd(true)
      if (resp.response) {
        console.log(resp.response);
        toast.error('please required these fields', {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });

      } else if (resp.request) {
        toast.warning('network error', {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });
      } else {
        console.log(resp);
      }
    })
    console.log('error-comes-here')
    productList()
  }

  const categoriesDataSelectFun = (e) => {
    setCategoriesDataSelect(e.target.value)
    console.log(e.target.value)
  }

  const categoryData = async () => {
    let FInal = BASE_URL + CATEGORY_ENDPOINT
    try {
      let res = await axios.get(FInal, {
        headers: {
          'Content-Type': "application/json"
        }
      })
      //  console.log('cateeeeee', res.data.results)
      setCategoriesData(res.data.results)
    } catch (error) {
      console.log(error)
    }
  }

  // Edit Model functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Add Product model functions
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  return (
    <div>
      <Head />
      <div className='container-fluid'>
        <ToastContainer />
        {/* Add Product Model */}
        <Modal show={showAdd} onHide={handleCloseAdd}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={addProducts} >
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" name='title' placeholder='Enter Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="text" name='price' placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridUploadImage1">
                  <Form.Label>Upload Image 1st</Form.Label>
                  <Form.Control type='file' onChange={uploadImage} placeholder="Please upload your image here" required />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridUploadImage2">
                  <Form.Label>Upload Image 2nd</Form.Label>
                  <Form.Control type='file' onChange={uploadImage2} placeholder="Please upload your image here" />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridUploadImage3">
                  <Form.Label>Upload Image 3rd</Form.Label>
                  <Form.Control type='file' onChange={uploadImage3} placeholder="Please upload your image here" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridUploadImage4">
                  <Form.Label>Upload Image 4th</Form.Label>
                  <Form.Control type='file' onChange={uploadImage4} placeholder="Please upload your image here" />
                </Form.Group>
              </Row>
              <Form.Group className="mb-3" controlId="exampleForm.ControlDescription1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" name='description' rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridBrand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control type="text" name='brand' placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Categories</Form.Label>
                  <Form.Select defaultValue="Choose..." onChange={categoriesDataSelectFun} name='categoriesDataSelect' value={categoriesDataSelect} >
                    <option>Choose...</option>
                    {categoriesData && categoriesData.map((catee) => {
                      return (
                        <option key={catee.id} value={catee?.id}>{catee?.name}</option>
                      )
                    })}
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridStore">
                  <Form.Label>Store</Form.Label>
                  <Form.Control type="text" name='Store' placeholder="Store" value={store} onChange={(e) => setStore(e.target.value)} />
                </Form.Group>
              </Row>

              <Button variant="success"
                // onClick={handleCloseAdd} 
                type="submit">
                Save Product
              </Button>

            </Form>
          </Modal.Body>
          <Modal.Footer className="modal-footer d-flex justify-content-center align-items-center">
            <div>
              <p>Thanks For Add New Product</p>
            </div>
          </Modal.Footer>
        </Modal>
        {/* Add Product Model End */}

        {/* Product Edit Model */}
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" placeholder="Enter Title" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="text" placeholder="Price" />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridAddress1">
                  <Form.Label>Address</Form.Label>
                  <Form.Control placeholder="1234 Main St" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAddress2">
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control placeholder="Apartment, studio, or floor" />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridBrand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control type="text" placeholder="Brand" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Categories</Form.Label>
                  <Form.Select defaultValue="Choose...">
                    <option>Choose...</option>
                    <option>...</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridStore">
                  <Form.Label>Store</Form.Label>
                  <Form.Control type="text" placeholder="Store" />
                </Form.Group>
              </Row>

              <Button variant="primary" onClick={handleClose} type="submit">
                Update Product
              </Button>

            </Form>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
        {/* Product Edit Model End */}

        <div className='row mt-5'>
          <div className='col-12'>

            <div className='rounded bg-white shadow my-3 mx-5'>

              <div className='d-flex align-items-center justify-content-between mx-3'>
                <div>
                  <h5 className='text-success mt-4'>Products List <RiShoppingBag3Fill /></h5>
                </div>
                <div className='mt-3'>
                  {/* <button className="btn btn-outline-success mt-1" data-bs-toggle="modal" data-bs-target="#exampleModal" href="#">Add Product <IoAddCircle /></button> */}
                  <Button variant="outline-success" onClick={handleShowAdd}>
                    Add Product <IoAddCircle />
                  </Button>
                </div>
              </div>
              <hr />
              {/* Shopping cart table */}
              <div className="table-responsive order-t">
                <Scrollbars>
                  <table className="table table-bordered table-hover mt-1 text-center">
                    <thead>
                      <tr>
                        <th scope="col" className="border-0 bg-light">
                          <div className="p-2 px-3 text-uppercase">Image</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                          <div className="p-2 px-3 text-uppercase">Name</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                          <div className="p-2 px-3 text-uppercase">Placed On</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                          <div className="py-2 text-uppercase">Categories</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                          <div className="py-2 text-uppercase">Price</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                          <div className="py-2 text-uppercase">Action</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className='mt-3'>
                      {products && products?.map((ite) => {
                        return (
                          <tr key={ite?.id}>
                            <th scope="row" className="border-0">
                              <div className="p-2">
                                <img src={ite.images[0].image_url} alt='' width={30} className="img-fluid rounded shadow-sm" />
                              </div>
                            </th>
                            <td className="border-0 text-muted align-middle">{ite?.title}</td>
                            <td className="border-0 text-muted align-middle">{moment(ite?.created_at).format("MM-DD-YYYY")}</td>
                            <td className="border-0 text-success align-middle">{ite?.category}</td>
                            <td className="border-0 text-muted align-middle">$ {ite?.price}</td>
                            <td className="border-0 align-middle"><div className="dropdown">
                              <a className="btn dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <BsThreeDotsVertical />
                              </a>
                              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                {/* <li><a className="dropdown-item text-success" data-bs-toggle="modal" data-bs-target="#viewModal" href="#">Edit <MdEdit /></a></li> */}
                                <li><a className="dropdown-item text-success" onClick={handleShow} href="#">Edit <MdEdit /></a></li>
                                <li><a className="dropdown-item text-danger" onClick={() => deleteProduct(ite?.id)} href="#">Delete <FaTrash /></a></li>
                                <li><Link className="dropdown-item text-success" to={`/dashboard/productDetail/${ite.id}`}>View <FaEye /></Link></li>
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

export default Products