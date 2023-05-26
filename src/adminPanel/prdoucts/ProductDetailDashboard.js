import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { BASE_URL, END_POINT,API_VERSION } from '../../utlis/apiUrls';
import { useParams } from 'react-router-dom';
import Head from '../head/Head';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import ScrollToTop from "react-scroll-to-top";
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
                url: `${BASE_URL}${API_VERSION()}${END_POINT()}/${id}/`,
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

    const stockHandle = (available_quantity) => {
        if (available_quantity == 0) {
            return 'Out Of Stock'
        } else {
            return `Stock ${available_quantity}`
        }
    }

    return (
        <div>
        <Head />
        <div className="container my-5 detailPageHeight">
            <div className="single_product bg-white border rounded shadow-sm">
                <div className="row detail-height">
                    <div className="col-md-12 col-lg-5">
                        <div className="d-flex justify-content-evenly">
                            <div className="img">
                                <Zoom>
                                    <img
                                        alt="img"
                                        src={mainImage ? mainImage.image_url : productDetail.images && productDetail?.images[0]?.image_url}
                                        width="300" height={300}
                                    />
                                </Zoom>
                                <div className="d-flex justify-content-center mt-3 imageHover">
                                    {productDetail?.images && images.map((im, index) => {
                                        return (
                                            <div key={index} className='thumbnail text-center'>
                                                <img src={im.image_url} alt='' className="img-thumbnail" style={{ height: '50px' }} onClick={() => setMainImage(im)} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-7">
                        <div className="desc">
                            <h3>{productDetail?.title}</h3>
                            <div> <h5 className='text-success'>$ {productDetail?.price}</h5></div>
                            <div>{stockHandle(productDetail?.available_quantity)}</div>
                            <div className="p-1 my-2 table-responsivedesTag">
                                <Scrollbars>
                                    <p> {productDetail?.description}</p>
                                </Scrollbars>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row row-underline">
                    <div className="col-md-6"> <span className=" deal-text text-success">Specifications</span> </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table className="col-md-12">
                            <tbody>
                                <tr className="row mt-10">
                                    <td className="col-md-3"><span className="p_specification">Product Title :</span> </td>
                                    <td className="col-md-9">
                                        <ul>
                                            <li>{productDetail.title}</li>
                                        </ul>
                                    </td>
                                </tr>
                                {
                                    productDetail?.brand ? <tr className="row mt-10">
                                        <td className="col-md-3"><span className="p_specification">Company Brand :</span> </td>
                                        <td className="col-md-9">
                                            <ul>
                                                <li>{productDetail?.brand}</li>
                                            </ul>
                                        </td>
                                    </tr> : ''
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ScrollToTop smooth />
        </div>
    </div>
    )
}

export default ProductDetailDashboard