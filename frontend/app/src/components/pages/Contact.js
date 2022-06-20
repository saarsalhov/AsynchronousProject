import React from 'react'
import phoneLogo from '../images/phone.png'
import emailLogo from '../images/email.png'
import linkdinLogo from '../images/linkedin.png'

export default function Contact(props) {
    return (
        <div className="contact-card">
            <img src={props.img} alt=""/>
            <h3>{props.fullName}</h3>
            <div className="info-group">
                <img src={phoneLogo} alt=""/>
                <p>{props.phoneNumber}</p>
            </div>
            <div className="info-group">
                <img src={emailLogo} alt=""/>
                <p>{props.Email}</p>
            </div>
            <div className="info-group">
                <img src={linkdinLogo} alt=""/>
                <a href={props.LinkdIn}>{props.LinkdIn}</a>
            </div>
        </div>
    )
}
