import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export default function HostPage() {
  const navigate = useNavigate();

  const callHostPage = async () =>{
    try{
      const res = await fetch("/HostPage", {
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"
      })

      const data = await res.json()

      if(res.status!==200){
        console.log("yoooooooo")
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
    <div>HostPage</div>
  )
}
