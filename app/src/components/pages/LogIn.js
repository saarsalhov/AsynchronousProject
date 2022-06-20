import React, { useState } from "react";
import "./LogIn.css";

async function loginUserAPI(credentials) {
  console.log("before api signip")
  return fetch("http://localhost:8000/signIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((res) => {
    if (res.ok) {
      console.log("signin succeeded")
      return res.json();
    }
  });
}


export default function LogIn() {
  // React States
  const [text, setText] = useState();

  const [errorPassword, setErrorPassword] = useState();

  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleChangeUserName = async (event) => {
    event.preventDefault();
    setUserName(event.target.value);
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    if (event.target.value.length < 5)
      setErrorPassword("Password must be at least 5 characters long!");
    else {
      setErrorPassword("");
   }
    setPassword(event.target.value);
  };


  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();
    var cred = {
      bUsername: userName,
      bPassword:password,
    }
    if (errorPassword) {
      setText("You can't submit!");
    } else {
      const token = await loginUserAPI(cred);
      if (token) {
        setText("Successful logged in")
        localStorage.setItem("username", userName); 
        let date = Date.now();
        var formatter = new Intl.DateTimeFormat("en-us", {
          weekday: "long",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          fractionalSecondDigits: 3,
          hour12: true,
          timeZone: "Asia/Jerusalem",
        });
        let dateSecondUpdated = formatter.formatToParts(date);
        var thedate =
          dateSecondUpdated[6].value +
          "-" +
          dateSecondUpdated[2].value +
          "-" +
          dateSecondUpdated[4].value +
          ", " +
          dateSecondUpdated[8].value +
          ":" +
          dateSecondUpdated[10].value +
          " " +
          dateSecondUpdated[16].value;
        console.log("debug the date = ", thedate);
        console.log("debug date params = ", dateSecondUpdated);

      window.location.reload();
      //  return token?<Navigate to="/"/>:window.location.reload();
      } else {
        setText("You entered wrong credentials");
        setUserName("");
        setPassword("");
        setErrorPassword("");
      }
      }
  };


  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        {text}
        <div className="input-container">
          <label>Username </label>
          <input type="text"
          placeholder="Enter username"
          value={userName}
          onChange={handleChangeUserName}
          required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" 
          placeholder="··········"
          value={password}
          onChange={handleChangePassword}
          required />
        </div>
        <div className="button-container">
          <input type="submit" value="Send" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="LogIn">
      <div className="login-form">
        <div className="title">Sign In</div>
        {renderForm}
      </div>
    </div>
  );
}

