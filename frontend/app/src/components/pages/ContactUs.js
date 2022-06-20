import React from 'react'
import Contact from './Contact'
import saarImage from '../images/saar.jpg'
import './ContactUs.css'

export default function ContactUs() {
  return (
    <div className='contacts'>
        <Contact 
        img= {saarImage} 
        fullName="Saar Salhov"
        phoneNumber="0522697948"
        Email="saarsalhov@gmail.com"
        LinkdIn="https://www.linkedin.com/in/saar-salhov/"
        />
    </div>
  )
}
