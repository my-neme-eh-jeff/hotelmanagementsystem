import React from "react";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  let navigate = useNavigate()

  const [data, setData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    phonenumber: 0,
    role: "",
  });

  const handleInputs = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validateData = () => {
    return true
  };

  const dealingWithSignUp = async (event) => {
    if (validateData) {
      event.preventDefault();
      const { username, password, phonenumber, role } = data

      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password, phonenumber, role })
      })
      
      const responeInJSON = await response.json()

      console.log(response.status)
      if(response.status===201){
        console.log("User created successfully")
        navigate("/")
      }else{
        if(responeInJSON.error=="username is already taken"){
          console.log("nope")
        }        
      }
    };
  }
  

  return (
    <div>
      <div className="heading2">
        <div>
          <h1 className="title2">Please signup</h1>
          <form className="form" method="POST"  onSubmit={dealingWithSignUp}>

            <div className="parent">
            <label className="formlabel forUsername" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              className="username textbox"
              placeholder="Username"
              type="text"
              onChange={handleInputs}
            ></input>
            </div>

            <div className="parent">
            <label className="formlabel forPassword" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              className="password textbox"
              placeholder="Password"
              type="password"
              onChange={handleInputs}
            ></input>
            </div>

            <div className="parent">
            <label className="formlabel forPassword" htmlFor="confirmPassword">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              className="confirmPassword textbox"
              placeholder="Confirm Password"
              type="password"
              onChange={handleInputs}
            ></input>
            </div>

            <div className="parent">
            <label className="formlabel forPhoneNo" htmlFor="phonenumber">
              Phone number
            </label>
            <input
              id="phonenumber"
              name="phonenumber"
              className="phonenumber textbox"
              placeholder="Phone Number"
              type="number"
              onChange={handleInputs}
            ></input>
            </div>

            <div className="parent">
            <label className="formlabel forRole" htmlFor="role">
              Role
            </label>
            <input
              id="role"
              name="role"
              className="role textbox"
              placeholder="admin/user/host"
              type="text"
              onChange={handleInputs}
            ></input>
            </div>

            <button
              type="submit"
              className="loginButton"
              id="geegee"
            >
              Sign up
            </button>
            {/* <PhoneInput
            className="phoneno textbox"
            placeholder="Enter phone number"
             onChange={handleInputs}/> */}
          </form>
        </div>
      </div>
    </div>
  );
}
