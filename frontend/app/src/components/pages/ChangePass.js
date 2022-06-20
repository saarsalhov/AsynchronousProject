import React, { useState } from "react";
import "./ChangePass.css";

async function ChangePassAPI(credentials) {
  console.log("before api signip")
  return fetch("http://localhost:4040/changePassword", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((res) => {
    if (res.ok) {
      console.log("change password succeed")
      return "success";
    }
    else if(res.status===400){
        return "Your old password is incorrect";
    }
  });
}


export default function LogIn() {
  // React States
  const [text, setText] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [errorOldPassword, setErrorOldPassword] = useState();
  const [errorNewPassword, setErrorNewPassword] = useState();

  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();


  const handleChangeOldPassword = async (event) => {
    event.preventDefault();
    if (event.target.value.length < 5)
      setErrorOldPassword("Old password must be at least 5 characters long!");
    else {
      setErrorOldPassword("");
   }
    setOldPassword(event.target.value);
  };

  
  const handleChangeNewPassword = async (event) => {
    event.preventDefault();
    if (event.target.value.length < 5)
        setErrorNewPassword("New password must be at least 5 characters long!");
    else {
        setErrorNewPassword("");
   }
    setNewPassword(event.target.value);
  };


  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();
    var cred = {
      bUsername: localStorage.getItem("email"),
      bOldPass:oldPassword,
      bNewPass:newPassword,
    }
    if (errorOldPassword || errorNewPassword) {
      setText("You can't submit!");
      setIsSubmitted(false);
    } else {
        const response = await ChangePassAPI(cred);
        if (response === "success") {
            setText("Passwored changed successfuly")
            setOldPassword("");
            setNewPassword("");
            setErrorNewPassword("");
            setErrorOldPassword("");
            setIsSubmitted(true);
        } else {
            setIsSubmitted(false);
            setText("Your old password is incorrect");
            setOldPassword("");
            setNewPassword("");
            setErrorNewPassword("");
            setErrorOldPassword("");
        }
        }
  };


  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        {text}
        <div className="input-container">
          <label>Old password </label>
          <input type="password" 
          placeholder="··········"
          value={oldPassword}
          onChange={handleChangeOldPassword}
          required />
        </div>
        <div className="input-container">
          <label>New Password </label>
          <input type="password" 
          placeholder="··········"
          value={newPassword}
          onChange={handleChangeNewPassword}
          required />
        </div>

        <div className="button-container">
          <input type="submit" value="Send" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="changePass">
      <div className="changePass-form">
        <div className="title">Change Password</div>
        {isSubmitted ? text : renderForm}
      </div>
    </div>
  );
}

