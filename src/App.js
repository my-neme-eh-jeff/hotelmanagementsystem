import './App.css';
import LoginPage from './components/LoginPage';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignupPage from './components/SignUpPage';
import AdminPage from "./components/AdminPage"
import HostPage from "./components/HostPage"
import UserPage from "./components/UserPage"
import AddListingPage from './components/AddListingPage';
import EditListingPage from './components/EditListingPage';
import DisplayListing from './components/DisplayListing';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='*' element={<h1>ERROR 404 PAGE NOT FOUND</h1>}></Route>
          <Route exact path='/' element={<LoginPage />}></Route>
          <Route exact path='/signup' element={<SignupPage />}></Route>
          <Route exact path='/admin' element={<AdminPage />}></Route>
          <Route exact path='/host' element={<HostPage />}></Route>
          <Route exact path='/user' element={<UserPage />}></Route>
          <Route exact path='/host/add/' element={<AddListingPage />}></Route>
          <Route exact path='/host/display/' element={<DisplayListing />}></Route>
          <Route exact path='/host/edit/' element={<EditListingPage />}></Route>          
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
