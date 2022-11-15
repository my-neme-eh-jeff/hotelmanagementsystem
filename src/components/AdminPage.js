import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

export default function AdminPage() {
  const navigate = useNavigate();
  const [userData,setUserData] = useState({})

  const callAdminPage = async () =>{
    try{
      const res = await fetch("/AdminPage", {
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      })
      const data = await res.json()
      setUserData(data)

      if(res.status!==200){
        throw new Error
      }
      if(data.role!=="admin"){
        throw new Error
      }

    }catch(err){
      navigate("/")
      console.log(err)
    }
  }

  useEffect(()=>{
      callAdminPage()
  },[])
  //since our array dependency is null useeffect will onl runs once when the page gets rendered

  return (
    <>
    <div>AdminPage</div>
    <h1>welcome {userData.username}</h1>
    </>
  )
}
