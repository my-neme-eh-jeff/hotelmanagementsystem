import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { createContext } from "react";

export default function HostPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({})

  const dealingWithLogout = async () => {
    try {
      const res = await fetch("/Logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        //even without credentials how does it work??
        credentials: "include"
      })
      if (res.status === 200) {
        navigate("/")
      }

    } catch (err) {
      console.log(err)
    }
  }


  const callHostPage = async () => {
    try {
      const res = await fetch("/HostPage", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })

      const data = await res.json()

      if (res.status !== 200) {
        throw new Error
      }
      if (data.role !== "host") {
        throw new Error
      }
      setUserData(data)


    } catch (err) {
      navigate("/")
      console.log(err)
    }
  }

  

  useEffect(() => {
    callHostPage()
  }, [])
  //since our array dependency is null useeffect will onl runs once when the page gets rendered

  const changePage= (operation) => {
    var url = "/host/"+operation
    navigate(url)
  }

  return (
    <>
      <h1 className='titleforhostpage'>Welcome {userData.username}</h1>
      <button className='logoutButton' onClick={dealingWithLogout} >logout</button>
      <div className='mainContentForHostPage'>
        <div>
          <button className='huge-button' onClick={()=>changePage("display")}>Display all listings</button>
        </div>
        <div >
          <button className='huge-button' onClick={()=>changePage("edit")}>Edit a Listing</button>
        </div>
        <div>
          <button className='huge-button' onClick={()=>changePage("add")}>Add New listing</button>
        </div>
        <div>
          <button className='huge-button' onClick={()=>changePage("delete")}>Remove a listing</button>
        </div>
      </div>

    </>
  )
}
