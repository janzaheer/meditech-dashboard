import React, { useState, useEffect } from 'react'
import Head from '../head/Head'
import { BASE_URL, END_POINT } from '../../utlis/apiUrls';
import { useSelector } from 'react-redux';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaEye, FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { IoAddCircle } from 'react-icons/io5'
import moment from 'moment';
import axios from "axios";
import { Scrollbars } from 'react-custom-scrollbars-2';
import './product.css'
import { Link } from 'react-router-dom';
// import S3FileUpload from 'react-s3';
//Optional Import
import { uploadFile } from 'react-s3';


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
  useEffect(() => {
    productList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const productList = async () => {
    let final = BASE_URL + END_POINT
    // if (next_page_url) {
    //     final = next_page_url;
    //   }
    return await axios.get(final, {
      headers: {
        'Content-Type': "application/json",
        Authorization: `Token ${userToken}`
      }
    })
      // .then((res) => setProducts(res.data.results), setLoading(true))
      .then((res) => {
        setProducts(res.data.results)
        // setLoading(true)
        console.log(res.data)
        // setNextPageUrl(res?.data?.next)
        console.log('----22--------------------')
      })
      .catch((err) => console.log(err))
  }

  const deleteComments = (id) => {
    console.log('delete-id', id)
  }


  const uploadImage = async (e) => {
    let image_urls = []
    const myFiles = e.target.files
    Array.from(myFiles).forEach(async (file) => {
      await uploadFile(file, config)
        .then((data) => {
          //  console.log(data)
          console.log('----------------22----------------')
           image_urls.push(data.location)

        })
        .catch(err => console.error(err))
    });
    console.log(image_urls)
    console.log('-----------------------11-----------------------')

  }

  return (
    <div>
      <Head />
      <div className='container-fluid'>
        {/* Add Product Model */}
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Add Product</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <form className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail4" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword4" />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputUploadImage" className="form-label">Upload Image</label>
                    <input type="file" onChange={uploadImage} multiple
                      className="form-control" id="inputUploadImage" placeholder="Please upload your image here" />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputAddress2" className="form-label">Address 2</label>
                    <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputCity" className="form-label">City</label>
                    <input type="text" className="form-control" id="inputCity" />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputState" className="form-label">State</label>
                    <select id="inputState" className="form-select">
                      <option selected>Choose...</option>
                      <option>...</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="inputZip" className="form-label">Zip</label>
                    <input type="text" className="form-control" id="inputZip" />
                  </div>
                  <div className="col-12">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="gridCheck" />
                      <label className="form-check-label" htmlFor="gridCheck">
                        Check me out
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">Sign in</button>
                  </div>
                </form>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        {/* Add Product Model End */}

        {/* Product Edit Model */}
        <div className="modal fade" id="viewModal" tabIndex={-1} aria-labelledby="viewModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="viewModalLabel">Product Details</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <form className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail4" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword4" />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputAddress2" className="form-label">Address 2</label>
                    <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputCity" className="form-label">City</label>
                    <input type="text" className="form-control" id="inputCity" />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inputState" className="form-label">State</label>
                    <select id="inputState" className="form-select">
                      <option selected>Choose...</option>
                      <option>...</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="inputZip" className="form-label">Zip</label>
                    <input type="text" className="form-control" id="inputZip" />
                  </div>
                  <div className="col-12">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="gridCheck" />
                      <label className="form-check-label" htmlFor="gridCheck">
                        Check me out
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">Sign in</button>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        {/* Product Edit Model End */}

        <div className='row mt-5'>
          <div className='col-12'>
            <div className='rounded bg-white shadow my-3'>
              <div className='d-flex align-items-center justify-content-between mx-3'>
                <div>
                  <h5 className='text-success mt-4'>Products List <RiShoppingBag3Fill /></h5>
                </div>
                <div className='mt-3'>
                  <button className="dropdown-item text-success mt-1" data-bs-toggle="modal" data-bs-target="#exampleModal" href="#">Add Product <IoAddCircle /></button>
                </div>
              </div>
              <hr />
              {/* Shopping cart table */}
              <div className="table-responsive order-t">
                <Scrollbars>
                  <table className="table mt-1 text-center">
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
                    <tbody>
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
                                <li><a className="dropdown-item text-success" data-bs-toggle="modal" data-bs-target="#viewModal" href="#">Edit <MdEdit /></a></li>
                                <li><a className="dropdown-item text-danger" onClick={() => deleteComments(ite?.id)} href="#">Delete <FaTrash /></a></li>
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