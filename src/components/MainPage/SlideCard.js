import React, { useState, useEffect } from "react"
import Sdata from "./Sdata";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';


const SlideCard = () => {
  const [sd, setSd] = useState(Sdata)
  function name() {
    setSd(sd)
  }
  useEffect(() => {
    name()
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>
    },
  }
  return (
    <>
      <div className="">
        <Slider {...settings}>
          {sd.map((value) => {
            return (
              <div key={value?.id} id="carouselExampleDark" className="carousel carousel-dark slide sli" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active" data-bs-interval={10000}>
                    <img src={value.cover} alt='img' height='380px' className="d-block w-100"/>
                    {/* <div className="carousel-caption d-none d-md-block">
                      <h5>{value.title}</h5>
                      <p>{value.desc}.</p>
                    </div> */}
                  </div>
                </div>
              </div>
            )
          })}
        </Slider>
      </div>
    </>
  )
}

export default SlideCard
