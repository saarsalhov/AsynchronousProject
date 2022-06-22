import React, { useState } from "react";
import { Form } from "react-bootstrap";
import './SignUp.css'

const validEmailRegex = RegExp(
    // eslint-disable-next-line
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

async function createUserAPI(credentials) {
  console.log("before api signup")
  return fetch("http://localhost:4040/users/signup", {
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
  // const [userName, setUserName] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [gender, setGender] = useState();


  // Errors
  const [errorEmail, setErrorEmail] = useState();
  const [errorPassword, setErrorPassword] = useState();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [text, setText] = useState();

  const handleChangeFirstName = async (event) => {
    event.preventDefault();
    setFirstName(event.target.value);
  };

  const handleChangeLastName = async (event) => {
    event.preventDefault();
    setLastName(event.target.value);
  };

  const handleChangeGender = async (event) => {
    event.preventDefault();
    setGender(event.target.value);
  };

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
      password:password,
      gender: gender,

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
        // setUserName("");
        setErrorEmail("");
        setErrorPassword("");
        setIsSubmitted(true);
      } else if (val==="Password is too weak or too short"){
        setText("Password is too weak or too short");
      }else if (val==="Email is not valid"){
        setText("The Email" + JSON.stringify(userEmail) + " is not valid");
        setIsSubmitted(false);
      }else if (val==="user already exist"){
        setText("The email " + JSON.stringify(userEmail) + " is already exists");
        setIsSubmitted(false);
      }else if (val==="The password is very common, change it"){
        setText("The password is very common, change it");
      }
    }

  };



  // JSX code for login form
  const renderForm = (
      <div className="form">
        <form onSubmit={handleSubmit}>
          <p>{text}</p>
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
            <label>Email </label>
            <input type="text"
                   value={userEmail}
                   placeholder="Enter Email"
                   required
                   onChange={handleChangeEmail}/>
            {errorEmail && <Form.Text className="error" >{errorEmail}</Form.Text>}
          </div>
          <div className="centered">
            <label>Gender</label>
            <select
                value={gender}
                onChange={handleChangeGender}
                required >
              <option value="">Choose gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>

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
        <h1>Sign Up</h1>
        <div className="SignUp-form">
          {isSubmitted ? text : renderForm}
        </div>
      </div>
  )
}
