import React, {useState} from 'react'
import "./AddCost.css"

async function uploadReceiptAPI(receipt) {
    console.log("before api signip")
    return fetch("http://localhost:4040/uploadReceipt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(receipt),
    }).then((res) => {
      if (res.ok) {
        console.log("receipt accept")
        return res.json();
      }
    });
  }

export default function AddCost() {

const [inputList, setInputList] = useState([{ name: "", color: "", price: "" }]);
const [text, setText] = useState();

const [storeName, setStoreName] = useState();
const [purchaseDate, setPurchaseDate] = useState();

const handleChangePurchaseDate = async (event) => {
    event.preventDefault();
    setPurchaseDate(event.target.value);
  };

const handleChangeStoreName = async (event) => {
    event.preventDefault();
    setStoreName(event.target.value);
  };
 
const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();
    var receipt = {
        date : purchaseDate,
        username: localStorage.getItem("email"),
        storeName: storeName,
        products:inputList,
    }
    const response = await uploadReceiptAPI(receipt);
    if (response){
        setText("receipt receieved")
        setInputList([{ name: "", color: "", price: "" }]);
        setPurchaseDate("");
        setStoreName("");
    }
    else{
        setPurchaseDate("");
        setStoreName("");
        setInputList([{ name: "", color: "", price: "" }]);
    }

}

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
 
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
 
  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { name: "", color: "", price: "" }]);
  };

  return (
  <div className="upload-receipt">
      <div className="upload-receipt-form">
          {text}
        <div className='store-name'>
            <label>Store Name </label>
            <input type="text"
            placeholder="Enter Store Name"
            value={storeName}
            onChange={handleChangeStoreName}
            required />
            </div>
            <div className='purchase-date'>
                <label>Date</label>
                <input type="date"
                placeholder="Enter purchase date"
                value={purchaseDate}
                onChange={handleChangePurchaseDate}
                required />
            </div>
      {inputList.map((x, i) => {
        return (
            <div >
                <input
                name="name"
                placeholder="Enter a clothing item type"
                value={x.item}
                onChange={e => handleInputChange(e, i)}
                />
                <input
                className="ml10"
                name="color"
                placeholder="Enter the color of the item"
                value={x.color}
                onChange={e => handleInputChange(e, i)}
                />
                <input
                className="ml10"
                type={'number'}
                name="price"
                placeholder="Enter the price of the item"
                value={x.price}
                onChange={e => handleInputChange(e, i)}
                />
                <div className="btn-box">
                {inputList.length !== 1 && <button
                className="minus"
                onClick={() => handleRemoveClick(i)}>-</button>}
                {inputList.length - 1 === i && <button className='button-17' onClick={handleAddClick}>+</button>}
                </div>
            </div>
        );
    })}
    <div className="button-container">
        <input type="submit" value="Send" onClick={handleSubmit} />
    </div>
    </div>
    </div>
  )
}
