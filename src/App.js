import './App.css';
import LoginPage from './components/LoginPage';
import React, { useState } from 'react';
import UserPage from './components/UserPage';
import SignUpPage from './components/SignUpPage';
import AdminPage from './components/AdminPage';
import HostPage from './components/HostPage';
import { roleContext } from './Helpers/contexts';


function App() {
  const[haveAccount,createAccount] = useState(true)
  const[role,setRole] = useState("")
  const[signedIn,setSignIn] = useState(false)
  
  return (
    <div className="App">

      <roleContext.Provider 
      value = {{signedIn,setSignIn,role,roleContext,signedIn,setSignIn}}>
      {signedIn===false?
      (haveAccount===false?<SignUpPage/>:<LoginPage/>):
      role==="admin"?<AdminPage/>:
      (role==="User"? <UserPage/>: <HostPage/>)
      } 

      </roleContext.Provider>

    </div>

  );
}

export default App;
