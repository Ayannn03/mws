import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
const Navbar = () => {
  return (
    <div className='nav'>
      <div  className='nav-bar'>
      <p><Link to = '/'> Home</Link></p>
      <p><Link to = '/about'>About</Link> </p>
      <p> <Link to = '/dash'>Contact</Link></p>
       
      </div>
    </div>
  )
}

export default Navbar