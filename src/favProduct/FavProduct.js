import React, { useEffect, useState } from 'react'
import './fav.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL, FAV_ENDPOINT } from '../utlis/apiUrls';
import Heart from "react-heart"
import { NavLink } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import ScrollToTop from 'react-scroll-to-top';

const FavProduct = () => {
    const userToken = useSelector(state => state.user.token);
    const [products, setProducts] = useState([])
    const [itemFavourite, setItemFavourite] = useState({})

    useEffect(() => {

        handleFavList()
    }, [])

    const handleFavList = async () => {
        let FavURL = BASE_URL + FAV_ENDPOINT
        try {
            const res = await axios.get(FavURL, {
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Token ${userToken}`
                }
            })
            console.log('handleFavList', res.data)
            setProducts(res.data)

        } catch (error) {
            console.log('error while loading favorite', error)
        }
    }

    const handleFav = async (id) => {
        console.log('click-id', id)
        let AddFavURL = BASE_URL + FAV_ENDPOINT
        axios.post(AddFavURL, { item_id: id }, {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Token ${userToken}`
            }
        }).then((result) => {
            console.log('handleFav', result)
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

    const handleBadge = (seller) =>{
        if (seller == null) {
            return <span className="badge text-bg-success notify-badge">cosmedicos mall</span>
        } else {
            return ''
        }
    }

    return (
        <div>
            <Header />
            <div className='container fav'>
                <ToastContainer />
                <div className='row g-2'>
                    <h1 className='text-center text-success'>Favorite list</h1>
                    {products.map((product) => {
                        return (
                            <div key={product.id} className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                                <div className='bg-white border rounded productShadow' >
                                    <div className=" ">
                                        <div className="text-center mb-1 itemImage">
                                            <NavLink to={`/productDetails/${product.id}`} className="" >
                                                {handleBadge(product.seller)}
                                                <img src={product.images[0].image_url} alt='' className="images-class w-100" width={180} height={180} />
                                            </NavLink>
                                        </div>
                                        <div className='p-1'>
                                            <div className="about">
                                                <h6 className="text-muted text-wrap">{product.title.substring(0, 15)}</h6>
                                                <div className="px-2 d-flex justify-content-between align-items-center">
                                                <span className="">Rs {product.price}</span>
                                                    <div style={{ width: "20px" }}>
                                                        <Heart isActive={itemFavourite && product.id in itemFavourite ? itemFavourite[product.id] : product.is_favourite} onClick={() => handleFav(product.id)} />
                                                    </div>
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
            <ScrollToTop smooth />
        </div>
    )
}

export default FavProduct