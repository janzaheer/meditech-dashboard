import React from "react"
import "./Home.css"
import SliderHome from "./Slider"

const Home = () => {
  return (
    <>
      <div className="container-fluid">
        <section className='home'>
            <SliderHome />
        </section>
      </div>

    </>
  )
}

export default Home
