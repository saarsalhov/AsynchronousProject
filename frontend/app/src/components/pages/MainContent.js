import React from 'react'
import './MainContent.css'
import logo from '../images/logo.png'

export default function MainContent() {
  return (
    <div className="content">
      <h1>Welcome to RecieptIt</h1>
        <p>
          This is the place you can save all your receipts!
        </p>
        <img src={logo} className='main-content-logo' alt=''></img>
    </div>
  )
}
