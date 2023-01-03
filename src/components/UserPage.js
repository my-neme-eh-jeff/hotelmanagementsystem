import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

export default function UserPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({})
  const [hotelData, setHotelData] = useState([])

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


  const callUserPage = async () => {
    try {
      const res = await fetch("/UserPage", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })

      const data = await res.json()
      setUserData(data)

      if (res.status !== 200) {
        throw new Error
      }
      if (data.role !== "user") {
        throw new Error
      }


    } catch (err) {
      navigate("/")
      console.log(err)
    }
  }

  const getData = async () => {
    const res = await fetch("/getHotelData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    setHotelData(await res.json())
    hotelData.map((hotels) => {
      console.log(hotels.url)
    })
  }


  const sortByCity = (event) => {
    var city = event.target.value

  }



  useEffect(() => {
    callUserPage()
    getData()
  }, [])
  //since our array dependency is null useeffect will onl runs once when the page gets rendered
  const dataInDiv = () => {

  }


  return (
    <>
      <h1 className='titleforhostpage'>Welcome {userData.username}</h1>
      <button className='logoutButton' onClick={dealingWithLogout} >logout</button>
      <div className='parent yyy'>
        <label htmlFor='city' id="cityLabel">Enter city to query by</label>
        <input
          id="city"
          name="city"
          placeholder="Sort by"
          type="text"
          onChange={sortByCity}
        ></input>
      </div>
      <div className='mainContentForUserPage'>
        {
          <ul>
            {hotelData.map((hotels, index) => (
              <li key={index} className="element">
                <div className='individualDataBox'>
                  <div className='imageOfindividualDataBox'>
                    <img url={hotels.url[0]}></img>

                  </div>
                  <div className='titleindividualDataBox'>
                    <p className='titleOfHotel'>{hotels.title}</p>
                    <p className='description'>{hotels.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        }
      </div>
    </>
  )
}
