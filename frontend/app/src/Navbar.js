import React from 'react'
import './Navbar.css';


export default function NavBar() {
    return (
        <>
                <div className="topnav">
                    <img src="./mylogo.png" className='nav-logo' alt=''/>
                    <a className="active" href="#home">Home</a>
                    {/*GUEST*/}
                    <a href="#signin">Sign In</a>
                    <a href="#signup">Sign Up</a>
                    {/*GUEST*/}
                    {/*logged in*/}
                    <a href="#addcost">Add cost</a>
                    {/*logged in*/}
                </div>
        </>

    )
}

