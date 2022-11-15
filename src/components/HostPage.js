import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

export default function HostPage() {
  const navigate = useNavigate();
  const [userData,setUserData] = useState({})

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


  const callHostPage = async () =>{
    try{
      const res = await fetch("/HostPage", {
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include"
      })

      const data = await res.json()
      setUserData(data)

      if(res.status!==200){
        throw new Error
      }
      if(data.role!=="host"){
        throw new Error
      }


    }catch(err){
      navigate("/")
      console.log(err)
    }
  }

  useEffect(()=>{
      callHostPage()
  },[])
  //since our array dependency is null useeffect will onl runs once when the page gets rendered


  return (
    <>
    <div>HostPage</div>
    <h1>welcome {userData.username}</h1>
    <button onClick={dealingWithLogout} >logout</button>
    </>
  )
}
