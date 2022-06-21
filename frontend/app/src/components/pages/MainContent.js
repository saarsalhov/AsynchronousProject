import React from 'react'
import './MainContent.css'
import logo from '../images/logo.png'

export default function MainContent() {
  return (
    <div className="content">
      <h1>Welcome to FINCONO</h1>
        <p>
          This is the place you can see all your costs!
        </p>
        <img src={logo} className='main-content-logo' alt=''></img>
    </div>
  )
}
