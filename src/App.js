import './App.css';
import LoginPage from './components/LoginPage';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignupPage from './components/SignUpPage';
import AdminPage from "./components/AdminPage"
import HostPage from "./components/HostPage"
import UserPage from "./components/UserPage"

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<h1>ERROR 404 PAGE NOT FOUND</h1>}></Route>
          <Route path='/' element={<LoginPage />}></Route>
          <Route path='/signup' element={<SignupPage />}></Route>
          <Route path='/admin' element={<AdminPage />}></Route>
          <Route path='/host' element={<HostPage />}></Route>
          <Route path='/user' element={<UserPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
