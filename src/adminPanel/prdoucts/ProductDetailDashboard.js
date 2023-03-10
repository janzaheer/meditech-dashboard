import React, { useState, useEffect } from 'react'
import axios from "axios";
import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars-2';
import './product.css'
import { BASE_URL, END_POINT } from '../../utlis/apiUrls';
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
            <Head />
            <div className="single_product">
                <div className="container-fluid" style={{ backgroundColor: '#fff', padding: 11 }}>
                    <div className="row">
                        <div className="col-lg-2 order-lg-1 order-2 table-responsive1 imagesul">
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

                                <img src={mainImage ? mainImage.image_url : productDetail.images && productDetail.images[0].image_url} alt='img' className='w-100' />
                            </div>
                        </div>
                        <div className="col-lg-6 order-3">
                            <div className="product_description">
                                <div className="product_name mt-4">{productDetail?.title}</div>
                                <div> <span className="product_price">$ {productDetail?.price}</span>
                                </div>
                                <div>
                                    <div className="row">
                                        <div className="col-md-10">
                                            <div className="p-1 my-2 table-responsive2">
                                                <Scrollbars>
                                                    <p> {productDetail?.description}</p>
                                                </Scrollbars>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                        <td className="col-md-4"><span className="p_specification">Product Title :</span> </td>
                                        <td className="col-md-8">
                                            <ul>
                                                <li>{productDetail?.title}</li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr className="row mt-10">
                                        <td className="col-md-4"><span className="p_specification">Company Store :</span> </td>
                                        <td className="col-md-8">
                                            <ul>
                                                <li> {productDetail?.store} </li>
                                            </ul>
                                        </td>
                                    </tr>
                                    {/* <tr className="row mt-10">
                                            <td className="col-md-4"><span className="p_specification">Part Number :</span> </td>
                                            <td className="col-md-8">
                                                <ul>
                                                    <li>7AL87PA</li>
                                                </ul>
                                            </td>
                                        </tr> */}
                                    {/* <tr className="row mt-10">
                                            <td className="col-md-4"><span className="p_specification">Color :</span> </td>
                                            <td className="col-md-8">
                                                <ul>
                                                    <li>Black</li>
                                                </ul>
                                            </td>
                                        </tr> */}
                                    {/* <tr className="row mt-10">
                                            <td className="col-md-4"><span className="p_specification">Suitable for :</span> </td>
                                            <td className="col-md-8">
                                                <ul>
                                                    <li>Processing &amp; Multitasking</li>
                                                </ul>
                                            </td>
                                        </tr> */}
                                    <tr className="row mt-10">
                                        <td className="col-md-4"><span className="p_specification">Company Brand :</span> </td>
                                        <td className="col-md-8">
                                            <ul>
                                                <li>{productDetail?.brand}</li>
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