import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import format from 'date-fns/format'
import { ToastContainer, toast,Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AddListingPage() {

  const navigate = useNavigate();
  const [errorForFile, setErrorForFile] = useState(" ")
  const [numberOfFilesSelected, setNumberOfFilesSelected] = useState(0)
  const [url, setUrl] = useState("");
  const imageUrls = []
  const [username, setUserName] = useState("")

  const [data, setData] = useState({
    title: "",
    description: "",
    city: ""
  });

  const [initialDateSelected, setInitialDateSelected] = useState(new Date())
  const [finallDateSelected, setFinallDateSelected] = useState(new Date(+new Date() + 86400000))

  const handleInputs = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const clearErrors = () => {
    setErrorForFile(" ")
  }


  const dealingWithAddListing = async (event) => {
    event.preventDefault();
    if (errorForFile == " " || errorForFile == "Valid file types are jpg/png") {
      return;
    }
    if (initialDateSelected.getTime() > finallDateSelected.getTime()) {
      alert("Please enter valid dates")
      return;
    }

    var form = document.getElementsByClassName("abcd")
    var imageFiles = document.getElementById("image")

    for (const file of imageFiles.files) {
      var formData = new FormData();
      formData.append("file", file)
      formData.append("upload_preset", process.env.REACT_APP_upload_preset)

      const url = "https://api.cloudinary.com/v1_1/" + process.env.REACT_APP_cloud_name + "/image/upload"
      const resp = await fetch(url,
        {
          method: "POST",
          body: formData
        })

      if (resp.status === 200) {
        const respInJSON = await resp.json()
        const url = respInJSON.secure_url
        imageUrls.push(url)
      } else {
        alert("There was an error in uploading the iamge please try again!")
        return;
      }
    }
    var id = format(initialDateSelected, 'dd/MM/yyyy')
    var fd = format(finallDateSelected, 'dd/MM/yyyy')
    var dataa = { ...data, "username": username, "initialDate": id, "finalDate": fd, "url": imageUrls }
    try {
      imageUrls.forEach((url) => {
        console.log(url)
      })
      const resp = await toast.promise(
        fetch("/uploadingImages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(dataa)
        }), {
        pending: {
          render: "please wait",
          position: toast.POSITION.TOP_CENTER,
          pauseOnFocusLoss: false,
          falsecloseOnClick: true,
          pauseOnHover: true,
          draggable: true,
          autoClose: 3000,
          transition: Zoom
        },
        success: {
          render: "added listing!",
          position: toast.POSITION.TOP_CENTER,
          pauseOnFocusLoss: false,
          falsecloseOnClick: true,
          pauseOnHover: true,
          draggable: true,
          autoClose: 3000,
          transition: Zoom
        },
        error: {
          render: "oh no", position: toast.POSITION.TOP_CENTER,
          pauseOnFocusLoss: false,
          falsecloseOnClick: true,
          pauseOnHover: true,
          draggable: true,
          autoClose: 3000,
          transition: Zoom
        }
      }
      )
      console.log(resp)
      const respInJSON = await resp.json()
      console.log(respInJSON)

    } catch (error) {
      console.log(error)
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
      setUserName(data.username)
    } catch (err) {
      navigate("/")
      console.log(err)
    }
  }

  const validateFileType = (event) => {

    for (var i = 0; i < event.target.files.length; i++) {
      var filename = (event.target.files[i].name);
      var extensionName = filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename
      if (extensionName != "jpg" && extensionName != "png") {
        setErrorForFile("Valid file types are jpg/png")
        break;
      } else {
        setErrorForFile(event.target.files.length + " files selected")
      }
    }
  }

  const validateDate = (date) => {
    if (date.getTime() < initialDateSelected.getTime()) {

    } else {
      setFinallDateSelected(date)
    }
  }

  useEffect(() => {
    callHostPage()
  }, [])


  return (
    <>
      <ToastContainer />
      <button className='backButton' onClick={()=>navigate("/host")} >Menu</button>

      <form className="form abcd" method="POST" onSubmit={dealingWithAddListing} encType="multipart/form-data">
        <div className="parent">
          <label className="formlabel forTitle" htmlFor="title">
            Title
          </label>
          <input
            id='title'
            name="title"
            className="titleOfHotel textbox"
            placeholder="Title"
            type="text"
            onChange={handleInputs}
          ></input>
        </div>

        <div className="parent" id='divvv'>
          <label className="formlabel forDescription" htmlFor="description">
            Description
          </label>
          <input
            id='description'
            name="description"
            className="descriptionOfHotel textbox"
            placeholder="Description"
            type="text"
            onChange={handleInputs}
          ></input>
        </div>
        <div className="parent" id='divvv'>
          <label className="formlabel forcity" htmlFor="city">
            City
          </label>
          <input
            id='city'
            name="city"
            className="cityOfHotel textbox"
            placeholder="City"
            type="text"
            onChange={handleInputs}
          ></input>
        </div>

        <div className='parent'>
          <label htmlFor='image' id='vohvalalabel'> Upload image(s) </label>
          <input
            onChange={validateFileType}
            type="file"
            accept='image/png,image/jpeg'
            multiple
            id='image'
            name='image'
          ></input>
          <span className="Error" dangerouslySetInnerHTML={{ __html: errorForFile }}></span>
        </div>
        <br></br>
        <br></br>

        <label id='lolop' className="formlabel forDates" htmlFor="initialDateSelected">
          Initial date of Availibility
        </label>
        <DatePicker
          selected={initialDateSelected}
          name='initialDateSelected'
          id='initialDateSelected'
          onChange={date => setInitialDateSelected(date)}
          dateFormat='dd/MM/yyyy'
          minDate={new Date()}>
        </DatePicker>

        <label id='lolopp' className="formlabel forDates" htmlFor="initialDateSelected">
          Final date of Availibility
        </label>
        <DatePicker
          selected={finallDateSelected}
          name='finalDateSelected'
          id='finalDateSelected'
          onChange={(date) => { validateDate(date) }}
          dateFormat='dd/MM/yyyy'
          minDate={new Date()}>
        </DatePicker>

        <button
          type="submit"
          className="loginButton"
          id="geegee"
        >
          Sign up
        </button>
      </form>
    </>
  )
}
