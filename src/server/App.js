const express = require('express')
const app = express();
const dotenv=require('dotenv')
const morgan = require('morgan')

dotenv.config({path:'./db/config.env'})
const User = require("../server/db/userSchema")
const jwt = require("jsonwebtoken")
var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(morgan('tiny'))
app.use(express.json())
//you need to use this if the data youre sending is an object as it tells the server this 
require('../server/db/dbConnect')
app.use(require("./routes"))


app.listen((process.env.port),()=>{
    console.log(`server is listening`)
})

