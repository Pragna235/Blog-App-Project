import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <div className='bg-dark text-light d-flex justify-content-around p-5'>
      <address>
        <p className='lead'>Prasad V Potluri Siddhartha Institute of Technology</p>
        <p className='lead'>Kanuru,Vijayawada-520 007, Andhra Pradesh,India</p>
      </address>
      <div>
        <p className='lead'>principal@pvpsiddhartha.ac.in</p>
        <p className='lead'>0866-2581699, 0866-2583037, 0866-2585681, 0866-2585682</p>
      </div>
    </div>
  )
}

export default Footer