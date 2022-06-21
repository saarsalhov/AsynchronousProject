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
        <Contact
            img= {"https://media-exp1.licdn.com/dms/image/C4D03AQEpiXRGEObLhA/profile-displayphoto-shrink_800_800/0/1651768101428?e=1661385600&v=beta&t=fI2uy6YGhtQVL7llUaWBYXvSaeD_ma3x9VydKPAfisU"}
            fullName="Liz Mizrahi"
            phoneNumber="0503818811"
            Email="lizmizrahi.lm@gmail.com"
            LinkdIn="https://www.linkedin.com/in/liz-mizrahi/"
        />
    </div>

  )
}
