import './App.css';
import LoginPage from './components/LoginPage';
import React, { useState } from 'react';
import { roleContext } from './Helpers/contexts';
import  {BrowserRouter, Route, Routes} from "react-router-dom"
import SignupPage from './components/SignUpPage';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='*' element={<h1>ERROR 404 PAGE NOT FOUND</h1>}></Route>
        <Route path='/' element={<LoginPage/>}></Route>
        <Route path='/signup' element={<SignupPage/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
