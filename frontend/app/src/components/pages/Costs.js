import React, {useState, useEffect, useCallback} from 'react'
import Cost from './Cost'
import image from '../images/receipt.png'
import './Costs.css'

export default function Costs() {
    const [data, setData] = useState('');

    const fetchData = useCallback(async () => {
        const data = await fetch(`http://localhost:4040/costs/allMyCosts?email=${localStorage.getItem("email")}`);
        const json = await data.json();

        setData(json.message);
    }, [])

    // the useEffect is only there to call `fetchData` at the right time
    useEffect(() => {
        fetchData()
            // make sure to catch any error
            .catch(console.error);
        ;
    }, [fetchData])

    return (
        <div className="costs">
            {   data ? data.map((cost) =>
                <Cost
                    date={cost.date}
                    category={cost.category}
                    description={cost.description}
                    price={cost.price}
                />)
                : null
            }

        </div>
    )
}

