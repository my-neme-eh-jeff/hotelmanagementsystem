import './App.css';
import LoginPage from './components/LoginPage';
import React, { useContext, useState } from 'react';
import UserPage from './components/UserPage';
import SignUpPage from './components/SignUpPage';
import AdminPage from './components/AdminPage';
import HostPage from './components/HostPage';


function App() {
  const[haveAccount,createAccount] = useState(true)
  const[role,setRole] = useState("")
  const[signedIn,setSignIn] = useState(false)
  return (
    <div className="App">
      {signedIn===false?
      (haveAccount==false?<SignUpPage/>:<LoginPage/>):
      role=="admin"?<AdminPage/>:
      (role=="User"? <UserPage/>: <HostPage/>)
      }

    </div>

  );
}

export default App;
