import React from 'react'
import { Link } from 'react-router-dom';
import '../errorPage/PageNotFond.css'

const PageNotFond = () => {
  return (
    <div>
        <div className="not-fond">
                <h2>Oops! 4O4 error :  </h2> 
      <p>Sorry, an unexpected error has occurred.</p>
        <Link to='/'>Back to Home Page</Link>
            </div>
    </div>
  )
}

export default PageNotFond