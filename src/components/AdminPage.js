import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();

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

      console.log("responese object")
      console.log(res)
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
      callAdminPage()
  },[])
  //since our array dependency is null useeffect will onl runs once when the page gets rendered

  return (
    <div>AdminPage</div>
  )
}
