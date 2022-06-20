import { Outlet, Link  } from "react-router-dom";
import homeLogo from '../images/logoWithNameNoBG.png'
import React from 'react'
import './NavBar.css'

const MenuList = () => {

  const onLogout = async (event) => {
    
    localStorage.removeItem("username");
    
    window.location.reload();
  };

  const username = localStorage.getItem("username");
  return (
    !username? (
      <>
      <nav>
      <Link to="/"><img src={homeLogo} className='nav-logo' alt="" /></Link>
        <ul className="nav-items">
          <li>
            <Link to="/ContactUs">Conatct us</Link>
          </li>
          <li>
            <Link to="/SignUp">Register</Link>
          </li>
          <li>
            <Link to="/LogIn">Sign-in</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
    ):
    (
      <>
      <nav>
      <Link to="/"><img src={homeLogo} className='nav-logo' alt="" /></Link>
        <ul className="nav-items">
        <li className="user">
              Hello {username}
          </li>
          <li onClick={onLogout} className="logout">
            <Link to="/">Log-Out</Link>
          </li>
          <li>
            <Link to="/ContactUs">Conatct us</Link>
          </li>
          <li>
            <Link to="/Receipts">Receipts</Link>
          </li>
          <li>
            <Link to="/UploadReceipt">Upload Receipt</Link>
          </li>
          <li>
            <Link to="/ChangePass">Change Password</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
    )
  )
};

export default MenuList;