import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';

function EditListingPage() {
    const [hotelData, setHotelData] = useState([])
    const [username, setUserName] = useState("")
    const navigate = useNavigate();

    const callHostPage = async () => {
        try {
            const res = await fetch("/HostPage", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
            })
            const data = await res.json()
            if (res.status !== 200) {
                throw new Error
            }
            if (data.role !== "host") {
                throw new Error
            }
            setUserName(data.username)
        } catch (err) {
            navigate("/")
            console.log(err)
        }

        try {
            const res = await fetch("/getHotelData/Host", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body:username
            })
            setHotelData(await res.json())

        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        callHostPage()
    }, [])


    return (
        <div>
            {
          <ul className='listStyling'>
            {hotelData.map((hotels, index) => (
              
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
            ))}
          </ul>
        }
        </div>
    )
}

export default EditListingPage