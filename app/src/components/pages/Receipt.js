import React from "react"
import storeLogo from '../images/store.png'
import dollarLogo from '../images/dollar.png'

export default function Receipt(props) {
    return (
        <div className="receipt-card">
            <img src={props.img} alt=""/>
            <h3>{props.date}</h3>
            <div className="info-group">
                <img src={storeLogo} alt=""/>
                <p>{props.storeName}</p>
            </div>
            <div className="info-group">
                <img src={dollarLogo} alt=""/>
                <p>{props.total}</p>
            </div>
        </div>
    )
}
