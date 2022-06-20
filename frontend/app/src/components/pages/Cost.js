import React from "react"

export default function Cost(props) {
    return (
        <div className="receipt-card">

            <h3>{props.date}</h3>
            <div className="info-group">
                <p>{props.category}</p>
            </div>
            <div className="info-group">
                <p>{props.description}</p>
            </div>
            <div className="info-group">
                <p>{props.price}</p>
            </div>
            <div className="info-group">
                <p>{props.coin}</p>
            </div>

        </div>
    )
}
