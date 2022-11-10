import React from "react";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";

export default function SignupPage() {
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

  const validateData = () => {};

  const dealingWithSignUp = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className="heading2">
        <div>
          <h1 className="title2">Please signup</h1>
          <form className="form">
            
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

            <button
              className="loginButton"
              id="geegee"
              onSubmit={dealingWithSignUp}
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
