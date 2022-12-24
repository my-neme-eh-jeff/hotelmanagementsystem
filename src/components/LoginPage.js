import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"

export default function SignupPage() {
  const [user, setUser] = useState({ username: "", password: "" })
  const navigate = useNavigate();
  const [errorForUsername, setErrorForUsername] = useState("")
  const [errorForPassword, setErrorForPassword] = useState("")


  const handleCallbackResponse = async (response) => {
    var decodedUserObject = jwt_decode(response.credential)
    const res = await fetch("/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(decodedUserObject)
    })

    const responeInJSON = await res.json()
    console.log(responeInJSON)
    if (res.status === 200) {
      if (responeInJSON.role === 'admin') {
        navigate("/admin")
      } else if (responeInJSON.role === 'host') {
        navigate("/host")
      } else {
        navigate("/user")
      }
    } else {
      if (responeInJSON.message === "signup") {
        alert("Please signup first")
        navigate("/signup")
      } else {
        alert("could not verify email id")
      }
    }

  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "366366904605-l8lu5ma88flp9k0e3fr5ueq2173vhurr.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    )
  }, [])

  const dealingWithSignUpButton = () => {
    navigate("/signup")
  };

  const validateData = () => {
    var validate = true;
    if ((user.password === "")) {
      validate = false
      setErrorForPassword("field is required")
    }
    if (user.username === "") {
      validate = false
      setErrorForUsername("field is required")
    }

    return validate
  };


  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const clearErrors = () => {
    setErrorForUsername(" ")
    setErrorForPassword(" ")
  }


  const dealingWithLogin = async (e) => {
    e.preventDefault();
    clearErrors()

    if (validateData()) {
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
    
      const responeInJSON = await response.json()
      if (response.status === 200) {
        if (responeInJSON.role === 'admin') {
          navigate("/admin")
        } else if (responeInJSON.role === 'host') {
          navigate("/host")
        } else {
          navigate("/user")
        }
      } else {
        alert("Invalid credentials lol")
      }
    }
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
        <div className="parent">
          <label className="formlabel forUsername" htmlFor="username textbox">
            Username/Email id
          </label> <span className="Error" dangerouslySetInnerHTML={{ __html: errorForUsername }}></span>
          <input
            name="username"
            className="username textbox"
            placeholder="Username / Email"
            type="text"
            onChange={handleInputs}
          ></input>
        </div>
        <div className="parent">
          <label className="formlabel forPassword" htmlFor="password textbox">
            Password
          </label> <span className="Error" dangerouslySetInnerHTML={{ __html: errorForPassword }}></span>
          <input
            name="password"
            className="password textbox"
            placeholder="password"
            type="password"
            onChange={handleInputs}
          ></input>
        </div>
        <button className="loginButton" type="submit">
          Login
        </button>
        <div id="signInDiv">

        </div>
        <p className="ifWeHaveAnAccount">
          <button className="signupbutton" type="submit" onClick={dealingWithSignUpButton}>
            Sign up?
          </button>
        </p>

      </form>
    </div>
  );
}
