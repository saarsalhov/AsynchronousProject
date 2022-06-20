import React from 'react'
import './NoPage.css'

export default function NoPage() {
  return (
    <div className="wrapper">
        <h1>404</h1>
        <p>
        This page could not be found
        </p>
        <img src="https://i.imgur.com/qIufhof.png" className='error-logo' alt=''></img>
    </div>
  )
}
