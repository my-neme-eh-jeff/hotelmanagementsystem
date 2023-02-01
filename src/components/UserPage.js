import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default function UserPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({})
  const [hotelData, setHotelData] = useState([])
  const [query, setQuery] = useState("")

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

  }


  const sortByCity = (event) => {
    setQuery(event.target.value)
    console.log(query)
  }



  useEffect(() => {
    callUserPage()
    getData()
  }, [])
  //since our array dependency is null useeffect will onl runs once when the page gets rendered



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
          <ul className='listStyling'>
            {hotelData.map((hotels, index) => (
              (hotels.city == query || query=="") ?
                <li key={index} className="element">
                  <div className='individualDataBox'>
                    <div className='imageOfindividualDataBox'>
                      <Carousel variant='dark'>
                        {
                          hotels.url.map((image, index) => (
                            <Carousel.Item>
                              <img
                                key={index}
                                className='hotelImages'
                                src={image}>
                              </img>
                            </Carousel.Item>
                          ))
                        }
                      </Carousel>
                    </div>
                    <div className='titleindividualDataBox'>
                      <p className='titleee'>{hotels.title}</p>
                      <p className='description'>{hotels.description}</p>
                      <p className='hostName'> This hotel is owned by {hotels.username}  whom you can contact at{hotels.phoneNumber}</p>
                    </div>
                  </div>
                </li>
                :
                <>
                <div>No hotel availible in the city!</div>
                </>
            ))}
          </ul>
        }
      </div>
    </>
  )
}
