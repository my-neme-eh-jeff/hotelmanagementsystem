import React from 'react'

export default function SignupPage() {
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
                <input className='username textbox '  placeholder='Username' required>
                </input>
            </div>
            <div>
                <label className='formlabel forPassword'>
                    Password
                </label>
                <input className='password textbox' placeholder='Password' type="password" required>
                </input>
            </div>
            <p className='ifWeHaveAnAccount'>
                <a href='http://localhost:3000/signup'> Sign up</a>
            </p>
        </div>
    </div>
  )
}
