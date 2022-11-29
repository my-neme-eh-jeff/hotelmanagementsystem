import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from 'validator';
const { passwordStrength } = require('check-password-strength')


export default function SignupPage() {
  let navigate = useNavigate()
  const [errorForUsername, setErrorForUsername] = useState("")
  const [errorForPassword, setErrorForPassword] = useState("")
  const [errorForPhoneNumber, setErrorForPhoneNumber] = useState("")
  const [errorForRole,setErrorForRole] = useState("")
  const [errorForEmail,setErrorForEmail] = useState("")


  const [data, setData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    phonenumber: 0,
    role: "",
    email:"",
  });

  const handleInputs = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  const validateData = () => {
    var validate = true;
    
    if (data.phonenumber.toString().length!==10) {
      validate=false
      setErrorForPhoneNumber("Phone number must be 10 digit")
    }
    if(data.role!=="admin" && data.role!=="host" && data.role!=="user"){
      validate=false
      setErrorForRole("Please enter a valid role")
    }
    if(passwordStrength(data.password).value=="Too weak"){
      validate=false
      setErrorForPassword("Please enter a stronger password")
    }
    var specialChars =/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
    if(specialChars.test(data.username)){
      validate=false
      setErrorForUsername("Name cannot have special characters")
    }
    if (data.password !== data.confirmPassword) {
      validate = false
      setErrorForPassword("Passwords do not match")
    }
    if((data.password==="") && (data.confirmPassword==="")){
      validate=false
      setErrorForPassword("This field is required")
    }
    if(data.username===""){
      validate=false
      setErrorForUsername("This field is required")
    }
    if(data.role===""){     
      validate=false
      setErrorForRole("This field is required")
    }
    if(data.phonenumber===0 || data.phonenumber==="" ){
      validate=false
      setErrorForPhoneNumber("This field is required")
    }
    if(validator.isEmail(data.email)===false){
      console.log("galat email!")
      setErrorForEmail("Invalid email id")
    }

    return validate
  };

  const clearErrors = () => {
    setErrorForUsername(" ")
    setErrorForPassword(" ")
    setErrorForPhoneNumber(" ")
    setErrorForRole(" ")
    setErrorForEmail(" ")
  }

  const dealingWithSignUp = async (event) => {
    event.preventDefault();
    clearErrors()
    if (validateData()) {
      console.log(data)
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const responeInJSON = await response.json()
      console.log("99")

      if (response.status === 201) {
        navigate("/")
      } else {
        if (responeInJSON.error == "username is already taken") {
          setErrorForUsername(responeInJSON.error)
        }
        if(responeInJSON.error== "account exists for the email"){
          setErrorForEmail(responeInJSON.error)
        }
      }
    }
  }


  return (
    <div>
      <div className="heading2">
        <div>
          <h1 className="title2">Please signup</h1>
          <form className="form" method="POST" onSubmit={dealingWithSignUp}>

            <div className="parent">
              <label className="formlabel forUsername" htmlFor="username">
                Username
              </label> <span className="Error"  dangerouslySetInnerHTML={{ __html: errorForUsername }}></span>
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
              <label className="formlabel foremail" htmlFor="email">
                Email id
              </label> <span className="Error"  dangerouslySetInnerHTML={{ __html: errorForEmail }}></span>
              <input
                id="email"
                name="email"
                className="email textbox"
                placeholder="Email id"
                type="text"
                onChange={handleInputs}
              ></input>
            </div>

            <div className="parent">
              <label className="formlabel forPassword" htmlFor="password">
                Password
              </label> <span className="Error"  dangerouslySetInnerHTML={{ __html: errorForPassword }}></span>
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
              </label> <span className="Error"  dangerouslySetInnerHTML={{ __html: errorForPassword }}></span>
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
              </label> <span className="Error"  dangerouslySetInnerHTML={{ __html: errorForPhoneNumber }}></span>
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
              </label> <span className="Error"  dangerouslySetInnerHTML={{ __html: errorForRole }}></span>
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
          </form>
        </div>
      </div>
    </div>
  );
}
