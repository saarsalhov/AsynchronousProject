import React, {useState, useEffect, useCallback} from 'react'
import Cost from './Cost'
import './Costs.css'

export default function Costs() {

    const minOffset = 0;
    const maxOffset = 10;
    const thisYear = (new Date()).getFullYear();


    const [data, setData] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [textMessage, setTextMessage] = useState(' ');
    const [totalSum, setTotalSum] = useState(' ');

    const fetchData = useCallback(async () => {
        const data = await fetch(`http://localhost:8080/costs/allMyCosts?email=${localStorage.getItem("email")}`);
        const json = await data.json();

        setData(json.data);
    }, [])

    const fetchDataFiltered = useCallback(async (filter) => {
        const data = await fetch(`http://localhost:8080/costs/reportByMonthAndYear?month=${filter.month}&year=${filter.year}&email=${filter.email}`);
        const json = await data.json();

        if (!json.message.data.length) {
            setTextMessage('No costs for this month & year')
            setTotalSum('')
        } else {
            setTextMessage(' ')

            setTotalSum('Total sum for this month & year: ' + (json.message.totalSum[0].total_sum.filter(function (el) {
                return el.coin === localStorage.getItem('coin')
            })[0].price) + ' ' + localStorage.getItem('coin'));
        }

        setData(json.message.data)

    }, [])

    const onYearChange = (evt) => {
        setSelectedYear(evt.target.value)
    };

    const onMonthChange = (evt) => {
        setSelectedMonth(evt.target.value)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const filters = {
            year: selectedYear,
            month: selectedMonth,
            email: localStorage.getItem("email"),
        };
        await fetchDataFiltered(filters);
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
        <div className="">

            <div className="costs">

                <div className="button-container">
                    <input className="button" type="submit" value="filter" onClick={handleSubmit}/>
                </div>
                <div className="select-month centered">
                    <select onChange={onMonthChange} value={selectedMonth}
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
                        onChange={onYearChange} value={selectedYear}
                        name="year" id="year" required>
                        <option value="">Choose year</option>
                        {options}
                    </select>
                </div>


            </div>

            <div className="centered">
                <br/>
                <b>{textMessage}</b><br/>
                <b>{totalSum}</b>
            </div>
            <div className="costs">
                {data ? data.map((cost) =>
                        <Cost
                            date={(new Date(cost.date).toDateString())}
                            category={cost.category}
                            description={cost.description}
                            price={cost.sum.filter(function (el) {
                                return el.coin === localStorage.getItem("coin")
                            })[0].price}
                            coin={localStorage.getItem("coin")}
                        />)
                    : null
                }
            </div>

        </div>
    )
}

