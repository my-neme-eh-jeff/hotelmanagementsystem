import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

export default function UserPage() {
  const navigate = useNavigate();
  const [userData,setUserData] = useState({})

  const callUserPage = async () =>{
    try{
      const res = await fetch("/UserPage", {
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
      if(data.role!=="user"){
        throw new Error
      }


    }catch(err){
      navigate("/")
      console.log(err)
    }
  }

  useEffect(()=>{
      callUserPage()
  },[])
  //since our array dependency is null useeffect will onl runs once when the page gets rendered


  return (
    <>
    <div>UserPage</div>
    <h1>welcome {userData.username}</h1>
    </>
  )
}
