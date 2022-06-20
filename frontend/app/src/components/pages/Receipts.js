import React, { useState, useEffect, useCallback } from 'react'
import Receipt from './Receipt'
import image from '../images/receipt.png'
import './Receipts.css'

export default function Receipts() {
  const [data, setData] = useState('');

  const fetchData = useCallback(async () => {
    const data = await fetch(`http://localhost:8000/getAllmyReceipts?email=${localStorage.getItem("email")}`);
    const json = await data.json();

    setData(json.message);
  }, [])
  
  // the useEffect is only there to call `fetchData` at the right time
  useEffect(() => {
    fetchData()
      // make sure to catch any error
      .catch(console.error);;
  }, [fetchData])

  return (
    <div className="receipts">
      {data?data.map( (receipt) =>
      <Receipt 
        img= {image} 
        date={receipt.date} 
        storeName={receipt.storeName} 
        total={receipt.products.reduce((total, currentValue) => total = total + currentValue.price,0)}/>): null
        }
    </div>    
  )
}
