import React from 'react'
import { Link } from 'react-router-dom';
import '../errorPage/PageNotFond.css'

const PageNotFond = () => {
  return (
    <>
      <div className='container-fluid errorPage bg-white d-flex justify-content-center align-items-center'>
        <div className='row'>
          <div className='col-md-6'>
            <div className="w-full mb-6"><img src="https://anasaraid.me/assets/404.gif" alt='img' className="h-36" /></div>
          </div>
          <div className='col-md-6'>
            <div className='mx-5 mt-5'>
              <h2>Oops! 4O4 error :  </h2>
              <p>Sorry, an unexpected error has occurred.</p>
              <Link to='/' className='text-success'>Back to Home Page</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PageNotFond
