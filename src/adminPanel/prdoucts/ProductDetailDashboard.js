import React, { useState, useEffect } from 'react'
import axios from "axios";
import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars-2';
import './product.css'
import { BASE_URL,END_POINT } from '../../utlis/apiUrls';
import { useParams } from 'react-router-dom';
import Head from '../head/Head';
const ProductDetailDashboard = () => {
    const { id } = useParams();
    console.log(`id is ${id}`)
    const [productDetail, setProductDetail] = useState([]);
    const [mainImage, setMainImage] = useState(productDetail?.images && productDetail?.images[0].image_url)
  
  
    useEffect(() => {
        
        getProductDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const getProductDetail = async () => {
      // eslint-disable-next-line         
      try {
          axios({
              url: `${BASE_URL}${END_POINT}/${id}/`,
              method: 'get',
          })
              .then((res) => {
                  console.log(res.data)
                  setProductDetail(res.data)
              })
      } catch (error) {
          console.log(error)
      }
  }
  const { images } = productDetail;

  return (
    <div>
        <Head/>
        <div className="single_product">
                    <div className="container-fluid" style={{ backgroundColor: '#fff', padding: 11 }}>
                        <div className="row">
                            <div className="col-lg-2 order-lg-1 order-2 table-responsive1">
                                <Scrollbars>
                                    {productDetail.images && images.map((im, index) => {
                                        return (
                                            <ul key={index} className="image_list">
                                                <li data-image='' ><img src={im.image_url} alt='' onClick={() => setMainImage(im)} /></li>
                                            </ul>
                                        )
                                    })}
                                </Scrollbars>
                            </div>
                            <div className="col-lg-4 order-lg-2 order-1">
                                <div className="image_selected">

                                    <img src={mainImage ? mainImage.image_url : productDetail.images && productDetail.images[0].image_url} alt='img' />
                                </div>
                            </div>
                            <div className="col-lg-6 order-3">
                                <div className="product_description">
                                    <div className="product_name">Name: {productDetail?.title}</div>
                                    <div className="product-rating"><span className="badge badge-success"><i className="fa fa-star" /> 4.5 Star</span> <span className="rating-review">Ratings &amp; Count</span></div>
                                    <div> <span className="product_price">$ {productDetail?.price}</span> 
                                    </div>
                                    <hr className="singleline" />
                                    <div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="p-1">
                                                    <p >Description: {productDetail.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="qty-change flex">
                                        <button type="button" className='btn btn-outline-success qty-dec fs-14' onClick={() => decreaseQty()}>
                                            -
                                        </button>
                                        <span className="qty-value flex flex-center mx-3">{qty}</span>
                                        <button type="button" className='btn btn-outline-primary qty-inc fs-14 text-light-blue' onClick={() => increaseQty()}>
                                            +
                                        </button>
                                    </div> */}
                                    <hr className="singleline" />
                                    {/* <div className="order_info d-flex flex-row">
                                        <form action="#">
                                        </form></div> */}
                                    {/* <div className="row">
                                        <div className="col-xs-6">
                                            <button type="button" className="btn btn-success me-1" onClick={() => addToCartHandler(product)}>Add to Cart</button>
                                        </div>
                                    </div> */}
                                </div>
                            </div>


                        </div>

                        <div className="row row-underline">
                            <div className="col-md-6"> <span className=" deal-text">Specifications</span> </div>
                            <div className="col-md-6"> </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <table className="col-md-12">
                                    <tbody>
                                        <tr className="row mt-10">
                                            <td className="col-md-4"><span className="p_specification">Sales Package :</span> </td>
                                            <td className="col-md-8">
                                                <ul>
                                                    <li>{productDetail.title}</li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr className="row mt-10">
                                            <td className="col-md-4"><span className="p_specification">Model Number :</span> </td>
                                            <td className="col-md-8">
                                                <ul>
                                                    <li> 14-dh0107TU </li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr className="row mt-10">
                                            <td className="col-md-4"><span className="p_specification">Part Number :</span> </td>
                                            <td className="col-md-8">
                                                <ul>
                                                    <li>7AL87PA</li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr className="row mt-10">
                                            <td className="col-md-4"><span className="p_specification">Color :</span> </td>
                                            <td className="col-md-8">
                                                <ul>
                                                    <li>Black</li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr className="row mt-10">
                                            <td className="col-md-4"><span className="p_specification">Suitable for :</span> </td>
                                            <td className="col-md-8">
                                                <ul>
                                                    <li>Processing &amp; Multitasking</li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr className="row mt-10">
                                            <td className="col-md-4"><span className="p_specification">Processor Brand :</span> </td>
                                            <td className="col-md-8">
                                                <ul>
                                                    <li>Intel</li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
  )
}

export default ProductDetailDashboard