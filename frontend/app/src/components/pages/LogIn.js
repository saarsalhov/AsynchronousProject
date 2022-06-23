import React, {useEffect, useState} from "react";
import "./LogIn.css";

async function loginUserAPI(credentials) {
    console.log("before api signip")
    return fetch("http://34.125.153.219:8080/users/signin", {
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

    useEffect(() => {
        localStorage.setItem("coin", "usd" );
            // make sure to catch any error
        ;
    }, [])

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
            email_address: userName,
            password: password
        }
        if (errorPassword) {
            setText("You can't submit!");
        } else {
            const token = await loginUserAPI(cred);
            if (token) {
                console.log(token);
                setText("Successful logged in")
                localStorage.setItem("email", userName);
                localStorage.setItem("name", token.first_name)
                window.location.reload();
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
                <p>{text}</p>
                <div className="input-container">
                    <label>Email </label>
                    <input type="text"
                           placeholder="Enter username"
                           value={userName}
                           onChange={handleChangeUserName}
                           required/>
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password"
                           placeholder="··········"
                           value={password}
                           onChange={handleChangePassword}
                           required/>
                </div>
                <div className="button-container">
                    <input type="submit" value="Send"/>
                </div>
            </form>
        </div>
    );

    return (
        <div className="LogIn">
            <h1>Sign In</h1>
            <div className="login-form">
                {renderForm}
            </div>
        </div>
    );
}

