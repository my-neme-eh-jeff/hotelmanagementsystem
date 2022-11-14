import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export default function UserPage() {
  const navigate = useNavigate();
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
      console.log(data)

      if(res.status!==200){
        console.log("yoooooooo")
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
      callUserPage()
  },[])
  //since our array dependency is null useeffect will onl runs once when the page gets rendered


  return (
    <div>UserPage</div>
  )
}
