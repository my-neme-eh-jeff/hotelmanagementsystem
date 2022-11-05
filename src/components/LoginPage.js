import React from 'react'
import { useContext } from 'react'
import { roleContext } from '../Helpers/contexts'
import { useState } from 'react'

export default function SignupPage() {
  
    const {signedIn,setSignIn,haveAccount,createAccount} = useContext(roleContext)
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const dealingWithSignUp =()=>{
        haveAccount(false)
    }

    const usernameHandling = e =>{
        setUsername(e.target.value)
    }

    const passwordHandling = e =>{
        setPassword(e.target.value)
    }

    return (
    <div className='signUpPageContent'>
        <div className='heading'>
           <h1 className='welcome'>WELCOME!</h1>
           <h1 className='title'>
                <span>Login </span> 
                <span>to </span>
                <span>access </span>
                <span>the </span>
                <span>website </span>
            </h1>
        </div>
        <div className='form'>
            <div>
                <label className='formlabel forUsername'>
                    Username
                </label>
                <input 
                className='username textbox'
                value='username' 
                placeholder='Username' 
                onChange={(e)=>{usernameHandling(e); console.log(username)  }}>
                </input>
            </div>
            <div>
                <label className='formlabel forPassword' >
                    Password
                </label>
                <input 
                className='password textbox' 
                placeholder='password' 
                value='password' type="password" 
                onChange={(e)=>{passwordHandling(e)}} >
                </input>
            </div>
            <button className='loginButton'>
                Login
            </button>
            <p className='ifWeHaveAnAccount'>
                <button className='signupbutton' onClick={dealingWithSignUp}>Sign up?</button>
            </p>
        </div>
    </div>
  )
}
