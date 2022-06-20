import React, { useState } from "react";
import { Form } from "react-bootstrap";
import './SignUp.css'

const validEmailRegex = RegExp(
  // eslint-disable-next-line
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

async function createUserAPI(credentials) {
  console.log("before api signup")
  return fetch("http://localhost:8000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((res) => {
    if (res.ok) {
      console.log("signup succeeded")
      return "success";
    } 
    else {
      // if (res.status===401)
    //   {
    //     return "Password is too weak or too short";
    //   }
    //   else if (res.status===402)
    //   {
    //     return "Email is not valid";
    //   }
    //   else if(res.status===403)
    //   {
    //     return "The username already exists";
    //   }
      if (res.status===404)
      {
        return "The username allready exist";
      }
    }
  });
}

export default function SignUp() {
  const [userEmail, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userName, setUserName] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();


  // Errors
  const [errorEmail, setErrorEmail] = useState();
  const [errorPassword, setErrorPassword] = useState();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [text, setText] = useState();

  // handele the change first name input
  const handleChangeFirstName = async (event) => {
    event.preventDefault();
    setFirstName(event.target.value);
  };

  // handele the change last name input
  const handleChangeLastName = async (event) => {
    event.preventDefault();
    setLastName(event.target.value);
  };

  // handele the change user name input
  const handleChangeUserName = async (event) => {
    event.preventDefault();
    setUserName(event.target.value);
  };

  // handele the change email input
  const handleChangeEmail = async (event) => {
    event.preventDefault();
    if (!event.target.value) 
    {
      setErrorEmail("Email is not valid!");
    }
    if (!validEmailRegex.test(event.target.value))
      setErrorEmail("Email is not valid");
    else {
      setErrorEmail("");
    }
    setEmail(event.target.value);
  };

  // handele the change password input
  const handleChangePassword = async (event) => {
    event.preventDefault();
    if (event.target.value.length < 5)
      setErrorPassword("Password must be at least 5 characters long!");
    else {
      setErrorPassword("");
   }
    setPassword(event.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    var cred = {
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      email: userEmail.toLowerCase(),
      userName: userName,
      password:password,
    }
    if ( errorEmail || errorPassword) {
      setText("You can't submit!");
      setIsSubmitted(false);
    } else {
        const val = await createUserAPI(cred);
        if (val === "success") {
          setText("User created successfully");
          setEmail("");
          setPassword("");
          setFirstName("");
          setLastName("");
          setUserName("");
          setErrorEmail("");
          setErrorPassword("");
          setIsSubmitted(true);
        } else if (val==="Password is too weak or too short"){
          setText("Password is too weak or too short");
        }else if (val==="Email is not valid"){
          setText("The Email" + JSON.stringify(userEmail) + " is not valid");
          setIsSubmitted(false);
        }else if (val==="The username allready exist"){
          setText("The username " + JSON.stringify(userName) + " is already exists");
          setIsSubmitted(false);
        }else if (val==="The password is very common, change it"){
          setText("The password is very common, change it");
        }
        // setEmail("");
        // setPassword("");
        // setFirstName("");
        // setLastName("");
        // setUserName("");
        // setErrorEmail("");
        // setErrorPassword("");
      }
    
  };



    // JSX code for login form
const renderForm = (
  <div className="form">
    <form onSubmit={handleSubmit}>
      {text}
      <div className="input-container">
        <label>First name </label>
        <input type="text"
        value={firstName}
        placeholder="Enter first name"
        onChange={handleChangeFirstName}
        required />
      </div>
      <div className="input-container">
        <label>Last name </label>
        <input type="text"
        value={lastName}
        placeholder="Enter last name"
        onChange={handleChangeLastName}
        required />
      </div>
      <div className="input-container">
        <label>mail </label>
        <input type="text"
        value={userEmail}
        placeholder="Enter Email"
        required 
        onChange={handleChangeEmail}/>
        {errorEmail && <Form.Text className="error" >{errorEmail}</Form.Text>}
      </div>
      <div className="input-container">
        <label>Username </label>
        <input type="text"
        placeholder="Enter user name"
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
        required
         />
        {errorPassword && (
          <Form.Text className="error">{errorPassword}</Form.Text>
        )}
      </div>
      <div className="button-container">
        <input type="submit" value="Send"/>
      </div>
    </form>
  </div>
);
  

  return (
    <div className="SignUp">
      <div className="SignUp-form">
        <div className="title">Sign Up</div>
          {isSubmitted ? text : renderForm}
      </div>
    </div>
  )
}
