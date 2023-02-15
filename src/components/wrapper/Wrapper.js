import React from "react"
import "./style.css"

const Wrapper = () => {
  const data = [
    {
      id:1,
      cover: <i className='fa-solid fa-truck-fast'></i>,
      title: "Worldwide Delivery",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
      id:2,
      cover: <i className='fa-solid fa-id-card'></i>,
      title: "Safe Payment",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
      id:3,
      cover: <i className='fa-solid fa-shield'></i>,
      title: "Shop With Confidence ",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
      id:4,
      cover: <i className='fa-solid fa-headset'></i>,
      title: "24/7 Support ",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
  ]
  return (
    <>
      <section className="wrapper background">
        <div className="container">
          <div className="row">
            {data.map((val) => {
              return (
                <div key={val.id} className="col-md-6 col-lg-3 ">
                  <div className="card border border-success shadow-sm m-1 d-flex align-items-center justify-content-center"
                  >
                    <div className='img mt-4'>
                      <i>{val.cover} </i>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{val.title}</h5>
                      <p className="text-muted">{val.decs}.</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default Wrapper
