import React, {useState} from 'react'
import "./AddCost.css"

async function addCostAPI(cost) {
    console.log("before api signip")
    return fetch("http://34.125.153.219:8080/costs/addCostItem", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(cost),
    }).then((res) => {
        if (res.ok) {
            console.log("cost accept")
            return res.json();
        }
    });
}

export default function AddCost() {

    const [text, setText] = useState();

    const [description, setDescription] = useState();
    const [purchaseDate, setPurchaseDate] = useState();
    const [purchaseSum, setPurchaseSum] = useState();
    const [coin, setCoin] = useState();
    const [category, setCategory] = useState();

    const handleChangePurchaseDate = async (event) => {
        event.preventDefault();
        setPurchaseDate(event.target.value);
    };

    const handleChangeDescription = async (event) => {
        event.preventDefault();
        setDescription(event.target.value);
    };

    const handleChangeSum = async (event) => {
        event.preventDefault();
        setPurchaseSum(event.target.value);
    };

    const handleChangeCoin = async (event) => {
        event.preventDefault();
        setCoin(event.target.value);
    };

    const handleChangeCategory = async (event) => {
        event.preventDefault();
        setCategory(event.target.value);
    };

    const handleSubmit = async (event) => {
        //Prevent page reload
        event.preventDefault();
        var cost = {
            date: purchaseDate,
            email_address: localStorage.getItem("email"),
            description: description,
            category: category,
            price: purchaseSum,
            coin: coin,
        }
        const response = await addCostAPI(cost);
        if (response) {
            setText("Cost added")
            setPurchaseDate("");
            setDescription("");
            setCategory("")
            setCoin("")
            setPurchaseSum("")
        }

    }

    return (
        <div className="add-cost">
            <h1>ADD COST</h1>

            <div className="add-cost-form">
                {text}

                <div className="select-category centered">
                <select onChange={handleChangeCategory} value={category} name="category" id="category" required>
                    <option value="">Choose category</option>
                    <option value="food">Food</option>
                    <option value="home">Home</option>
                    <option value="fashion">Fashion</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="insurance">Insurance</option>
                    <option value="medicine">Medicine</option>
                    <option value="other">Other</option>
                </select>
                </div>

                <div className="description centered">
                    <input type="text"
                           placeholder="Enter description"
                           value={description}
                           onChange={handleChangeDescription}
                           required/>
                </div>

                <div className="description centered">
                    <input type="number"
                           placeholder="Enter sum"
                           value={purchaseSum}
                           onChange={handleChangeSum}
                           required/>
                </div>

                <div className="select-category centered">
                    <select onChange={handleChangeCoin} value={coin} name="coin" id="coin">
                        <option value="">Choose coin</option>
                        <option value="ils">ILS ₪</option>
                        <option value="usd">USD $</option>
                        <option value="eur">EUR €</option>
                        <option value="gbp">GBP £</option>
                    </select>
                </div>

                <div className='purchase-date centered'>
                    <input type="date"
                           placeholder="Enter purchase date"
                           value={purchaseDate}
                           onChange={handleChangePurchaseDate}
                           required/>
                </div>

                <div className="button-container">
                    <input className="button" type="submit" value="Send" onClick={handleSubmit}/>
                </div>
            </div>
        </div>
    )
}
