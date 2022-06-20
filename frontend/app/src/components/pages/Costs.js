import React, {useState, useEffect, useCallback} from 'react'
import Cost from './Cost'
import './Costs.css'

export default function Costs() {

    const minOffset = 0;
    const maxOffset = 10;
    const thisYear = (new Date()).getFullYear();

    const [data, setData] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const fetchData = useCallback(async () => {
        const data = await fetch(`http://localhost:4040/costs/allMyCosts?email=${localStorage.getItem("email")}`);
        const json = await data.json();

        setData(json.data);
    }, [])
    const fetchDataFiltered = useCallback(async () => {
        const data = await fetch(`http://localhost:4040/costs/allMyCosts?email=${localStorage.getItem("email")}`);
        const json = await data.json();

        setData(json.data);
    }, [])

    const onHandleChange = (evt) => {
        setSelectedDate(evt.target.value)
    };

    const handleSubmit = async (event) => {

        // change submit FILTER ***********

        // event.preventDefault();
        // var cost = {
        //     date: purchaseDate,
        //     email_address: localStorage.getItem("email"),
        //     description: description,
        //     category: category,
        //     price: purchaseSum,
        //     coin: coin,
        // }
        // const response = await addCostAPI(cost);
        // if (response) {
        //     setText("Cost added")
        //     setPurchaseDate("");
        //     setDescription("");
        //     setCategory("")
        //     setCoin("")
        //     setPurchaseSum("")
        // }
    }

    // the useEffect is only there to call `fetchData` at the right time
    useEffect(() => {
        fetchData()
            // make sure to catch any error
            .catch(console.error);
        ;
    }, [fetchData])

    const options = [];

      for (let i = minOffset; i <= maxOffset; i++) {
          const year = thisYear - i;
          options.push(<option value={year}>{year}</option>);

      }
    return (
        <div className="costs">



            <div className="select-month centered">
                <select
                    // onChange={handleChangeCategory} value={category}
                    name="month" id="month" required>
                    <option value="">Choose month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
            </div>

            <div className="select-year centered">
                <select
                    onChange={onHandleChange} value={selectedDate}
                    name="year" id="year" required>
                    <option value="">Choose year</option>
                    {options}
                </select>
            </div>

            <div className="button-container">
                <input className="button" type="submit" value="סנן" onClick={handleSubmit}/>
            </div>

            <div>
            {   data ? data.map((cost) =>
                <Cost
                    date={(new Date(cost.date).toDateString())}
                    category={cost.category}
                    description={cost.description}
                    price={cost.sum[0].price}
                    coin={cost.sum[0].coin}
                />)
                : null
            }
            </div>
        </div>
    )
}

