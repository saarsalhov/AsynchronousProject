import React from "react"

export default function Cost(props) {
    return (
        <div className="receipt-card">
            <h3>{props.date}</h3>
            <div className="info-group">
                <p><b>category: </b>{props.category}</p>
            </div>
            <div className="info-group">
                <p><b>description: </b>{props.description}</p>
            </div>
            <div className="info-group">
                <p><b>price: </b>{props.price}</p>
            </div>
            <div className="info-group">
                <p><b>coin:</b> {props.coin}</p>
            </div>

        </div>
    )
}
