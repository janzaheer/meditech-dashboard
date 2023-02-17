import React, { useEffect, useState } from 'react'
import './fav.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utlis/apiUrls';
import Heart from "react-heart"
import { NavLink } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';

const FavProduct = () => {
    const userToken = useSelector(state => state.user.token);

    // console.log(userToken);
    console.log('----------------------11--------------------')
    const [products, setProducts] = useState([])
    // const [active, setActive] = useState(false)
    const [itemFavourite, setItemFavourite] = useState({})
    useEffect(() => {

        handleFavList()
    }, [])

    const handleFavList = async () => {
        let Api = `api/v1/favourite/items/`
        let FavURL = BASE_URL + Api
        try {
            const res = await axios.get(FavURL, {
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Token ${userToken}`
                }
            })
            console.log(res.data)
            setProducts(res.data)

        } catch (error) {
            console.log('error while loading favorite', error)
        }
    }

    const handleFav = async (id) => {
        console.log('click-id', id)

        let Api = `api/v1/favourite/items/`
        let AddFavURL = BASE_URL + Api

        axios.post(AddFavURL, { item_id: id }, {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Token ${userToken}`
            }
        }).then((result) => {
            console.log(result)

            // setProducts(result.data)
            if (result.data.message.includes('remove')) {
                let idata = itemFavourite

                idata[id] = true
                setItemFavourite(idata)
                handleFavList()
                toast.error(result.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "colored",
                });
            } else {
                let data = itemFavourite
                data[id] = true
                setItemFavourite(data)
                toast.success(result.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "colored",
                });


            }

        }).catch(error => {
            console.log(error)
        })

    }



    return (
        <div>
            <Header />
            <div className='container fav'>
                <ToastContainer />
                <div className='row g-2'>
                    <h1 className='text-center'>Favorite list</h1>
                    {products.map((product) => {
                        return (
                            <div key={product.id} className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                                <div className='box rounded border shadow-sm' >
                                    <div className="product ">
                                        <div className="text-center mb-1">
                                            <img src={product.images[0].image_url} alt='' className="images-class w-100" width={180} height={180} />
                                        </div>
                                        <div className='p-1'>
                                            <div className="about">
                                                <h6 className="text-muted text-wrap">{product.title.substring(0, 17)} ...</h6>
                                                <span className="">Rs {product.price}</span>
                                            </div>
                                            <div className="mt-1 px-2 d-flex justify-content-between align-items-center">
                                                <div className="">
                                                    <NavLink to={`/productDetails/${product.id}`} className="btn btn-outline-success btn-md" ><FaRegEye /></NavLink>
                                                </div>
                                                <div style={{ width: "25px" }}>
                                                    <Heart isActive={itemFavourite && product.id in itemFavourite ? itemFavourite[product.id] : product.is_favourite} onClick={() => handleFav(product.id)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default FavProduct