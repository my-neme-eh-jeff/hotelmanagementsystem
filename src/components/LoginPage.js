import React from "react";
import { useContext } from "react";
import { roleContext } from "../Helpers/contexts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const[user,setUser]=useState({username:"",password:""})
  const navigate = useNavigate();

  const dealingWithSignUpButton = () => {
    navigate("/signup")
  };
  
  const handleInputs = (e) =>{
    setUser({...user,[e.target.name]:e.target.value})
  } 

  const dealingWithLogin = () =>{

  }

  return (
    <div className="signUpPageContent">
      <div className="heading">
        <h1 className="welcome">WELCOME!</h1>
        <div className="">
          <h1 className="title animation1">Login to access the website</h1>
        </div>
      </div>
      <form className="form1" onSubmit={dealingWithLogin} method="POST">
        <div>
          <label className="formlabel forUsername" htmlFor="username textbox">
            Username
          </label>
          <input
            name="username"
            className="username textbox"
            placeholder="Username"
            type="text"
            onChange={handleInputs}
          ></input>
        </div>
        <div>
          <label className="formlabel forPassword" htmlFor="password textbox">
            Password
          </label>
          <input
            name="password"
            className="password textbox"
            placeholder="password"
            type="password"
            onChange={handleInputs}
          ></input>
        </div>
        <button className="loginButton">Login</button>
        <p className="ifWeHaveAnAccount">
          <button className="signupbutton" onClick={dealingWithSignUpButton}>
            Sign up?
          </button>
        </p>

      </form>
    </div>
  );
}
